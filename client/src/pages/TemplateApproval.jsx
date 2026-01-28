import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const TemplateApproval = () => {
  const navigate = useNavigate();
  const { token } = useUser();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      setError('Failed to load pending patterns. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (template) => {
    // Navigate to SMSParser with pattern and message data
    navigate('/sms-parser', {
      state: {
        pattern: template.regexPattern,
        sampleMsg: template.message,
        patternId: template.id
      }
    });
  };

  // Only pending patterns are displayed
  const filteredTemplates = templates.filter(t => t.status === 'PENDING');

  const getStatusBadge = (status) => {
    const statusStyles = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      APPROVED: 'bg-green-100 text-green-800 border-green-300',
      REJECTED: 'bg-red-100 text-red-800 border-red-300'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || statusStyles.PENDING}`}>
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading pending patterns...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Checker</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {filteredTemplates.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No pending patterns found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-primary">
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
                  <div className="bg-white rounded-md p-4 border border-gray-300">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Sample Message
                    </label>
                    <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {template.message}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 border border-gray-300">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Regex Pattern
                    </label>
                    <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                      <code className="text-xs text-gray-800 font-mono leading-relaxed break-all">
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
        <div className="mt-8 bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="bg-white rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {filteredTemplates.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Pending Patterns</p>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default TemplateApproval;
