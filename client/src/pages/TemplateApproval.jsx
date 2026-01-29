import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const TemplateApproval = () => {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Double-check role access at component level
  const userRole = user?.role?.toLowerCase();
  if (!user || userRole !== 'checker') {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    fetchPendingPatterns();
  }, []);

  const fetchPendingPatterns = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/patterns/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Only show pending patterns
      const pendingPatterns = response.data.filter(p => p.status === 'PENDING');
      setTemplates(pendingPatterns);
    } catch (err) {
      console.error('Error fetching pending patterns:', err);
      const errorMessage = err.response?.data?.message || 'Failed to load pending patterns. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (template) => {
    // Navigate to SMSParser with all pattern data
    navigate('/sms-parser', {
      state: {
        id: template.id,
        patternId: template.id,
        bankAddress: template.bankAddress,
        bankName: template.bankName,
        regexPattern: template.regexPattern,
        pattern: template.regexPattern,
        message: template.message,
        sampleMsg: template.message,
        category: template.category,
        status: template.status
      }
    });
  };

  // Only pending patterns are displayed
  const filteredTemplates = templates.filter(t => t.status === 'PENDING');

  const getStatusBadge = (status) => {
    const statusStyles = {
      PENDING: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700',
      APPROVED: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700',
      REJECTED: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || statusStyles.PENDING}`}>
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading pending patterns...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-secondary">Checker</h1>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {filteredTemplates.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No pending patterns found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:shadow-gray-950/30 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-950/50 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-primary dark:text-secondary">
                        Pattern #{template.id}
                      </h3>
                      {getStatusBadge(template.status)}
                    </div>
                  </div>
                  {template.status === 'PENDING' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleCheck(template)}
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold whitespace-nowrap"
                      >
                        Check
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white dark:bg-gray-700 rounded-md p-4 border border-gray-300 dark:border-gray-600">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Sample Message
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-600 rounded p-3 max-h-32 overflow-y-auto">
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {template.message}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-md p-4 border border-gray-300 dark:border-gray-600">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Regex Pattern
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-600 rounded p-3 max-h-32 overflow-y-auto">
                      <code className="text-xs text-gray-800 dark:text-gray-200 font-mono leading-relaxed break-all">
                        {template.regexPattern}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 bg-secondary dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-primary dark:text-secondary mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="bg-white dark:bg-gray-700 rounded-md p-4 text-center border border-gray-200 dark:border-gray-600">
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {filteredTemplates.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pending Patterns</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TemplateApproval;
