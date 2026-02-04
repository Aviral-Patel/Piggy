import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';
import axios from 'axios';

// Helper components defined outside SMSParser so they aren't recreated on each render (fixes input losing focus when typing)
const FieldGroup = ({ title, children, cols = 2 }) => {
  const gridColsClass = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5'
  }[cols] || 'md:grid-cols-2';

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm dark:shadow-gray-950/30 border border-gray-100 dark:border-gray-700">
      {title && (
        <h3 className="text-lg font-semibold text-primary dark:text-secondary mb-4 pb-2 border-b-2 border-secondary dark:border-gray-600">
          {title}
        </h3>
      )}
      <div className={`grid grid-cols-1 ${gridColsClass} gap-4`}>
        {children}
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text', placeholder = '', className = '', disabled = false }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${disabled ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed' : 'bg-white dark:bg-gray-700'} ${className}`}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, className = '', disabled = false }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${disabled ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed' : 'bg-white dark:bg-gray-700'} text-gray-900 dark:text-gray-100 ${className}`}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, name, value, onChange, rows = 4, className = '', highlight = false, placeholder = '', disabled = false }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      className={`px-4 py-2 border ${highlight ? 'border-tertiary border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none ${disabled ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed' : 'bg-white dark:bg-gray-700'} ${className}`}
    />
  </div>
);

const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary focus:ring-2 bg-white dark:bg-gray-700"
    />
    <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
  </div>
);

const SMSParser = () => {
  const location = useLocation();
  const passedData = location.state || {};
  const { user, token, loading } = useUser();

  // All hooks must run before any conditional return (Rules of Hooks)
  const [formData, setFormData] = useState({
    // General Information
    bankAddress: passedData.bankAddress || '',
    bankName: passedData.bankName || '',
    merchantName: passedData.merchantName || '',

    // Transaction Details
    type: passedData.type || '',
    // Category removed - now auto-detected via Gemini API when parsing messages

    // Pattern and Sample
    regexPattern: passedData.regexPattern || passedData.pattern || '',
    message: passedData.message || passedData.sampleMsg || '',

    // Editor Comments and Processed Result
    onDemand: false,
    parentTemplateId: '',
    editorComments: 'Acct XX284 debited with INR 3,000.00 on 16-Apr-20 & Acct XX165 credited. IMPS: 010710592992. Call 18002662 for dispute or SMS BLOCK 284 to 9215676766\ndear customer, your a/c no. xxxxxxxx4677 is debited by rs. 21132.00 on 18-11-2023 18:30:02 by a/c linked to mobile xxxxx347195. (imps ref no 230961492748)\ndear customer, icici bank acct xx312 debited with rs 425.00 on 08-Jul-22 and account linked to mobile number xx7362',
    processedResult: ''
  });

  const [matchResult, setMatchResult] = useState(null);
  const [matching, setMatching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [patternId, setPatternId] = useState(passedData.patternId || passedData.id || null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Pending messages state
  const [pendingMessages, setPendingMessages] = useState([]);
  const [showPendingMessages, setShowPendingMessages] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [loadingPending, setLoadingPending] = useState(false);

  // Fetch pending messages count on mount
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/unparsed-messages/pending/count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Pending messages count:', response.data.count);
        setPendingCount(response.data.count);
      } catch (err) {
        console.error('Error fetching pending count:', err);
        console.error('Error details:', err.response || err.message);
      }
    };

    if (token && user?.role?.toLowerCase() === 'maker') {
      console.log('Fetching pending messages count for maker...');
      fetchPendingCount();
    }
  }, [token, user]);

  // Role check and redirect after all hooks (avoid conditional hook calls)
  const userRole = user?.role?.toLowerCase();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }
  if (!user || (userRole !== 'maker' && userRole !== 'checker')) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear match result when fields change
    if (name === 'regexPattern' || name === 'message') {
      setMatchResult(null);
    }
  };

  const handleMatch = async () => {
    const { regexPattern, message } = formData;

    if (!regexPattern.trim()) {
      toast.warning('Please enter a regex pattern');
      setMatchResult({ success: false, message: 'Please enter a regex pattern' });
      return;
    }

    if (!message.trim()) {
      toast.warning('Please enter a sample message');
      setMatchResult({ success: false, message: 'Please enter a sample message' });
      return;
    }

    setMatching(true);
    setMatchResult(null);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/patterns/test-match',
        {
          regexPattern: regexPattern,
          sampleMessage: message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMatchResult({
        success: response.data.success,
        message: response.data.message,
        matchedText: response.data.matchedText
      });
      
      if (response.data.success) {
        toast.success('Pattern matched successfully!');
      } else {
        toast.error('Pattern does not match');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to test regex pattern. Please try again.';
      setMatchResult({
        success: false,
        message: errorMessage
      });
      toast.error(errorMessage);
    } finally {
      setMatching(false);
    }
  };

  const handleSendToApprove = async () => {
    // Validate required fields
    if (!formData.bankAddress.trim()) {
      toast.warning('Bank Address is required');
      setError('Bank Address is required');
      return;
    }
    if (!formData.bankName.trim()) {
      toast.warning('Bank Name is required');
      setError('Bank Name is required');
      return;
    }
    if (!formData.regexPattern.trim()) {
      toast.warning('Regex Pattern is required');
      setError('Regex Pattern is required');
      return;
    }
    if (!formData.message.trim()) {
      toast.warning('Sample Message is required');
      setError('Sample Message is required');
      return;
    }

    // Check if match was successful
    if (!matchResult || !matchResult.success) {
      toast.warning('Please test the regex pattern first and ensure it matches successfully');
      setError('Please test the regex pattern first and ensure it matches successfully');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const patternData = {
        bankAddress: formData.bankAddress,
        bankName: formData.bankName,
        merchantName: formData.merchantName || null,
        type: formData.type || null,
        regexPattern: formData.regexPattern,
        message: formData.message,
        // Category removed - now auto-detected via Gemini API when parsing messages
        status: 'PENDING'
      };

      const response = await axios.post(
        'http://localhost:8080/api/patterns',
        patternData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Pattern sent for approval successfully!');
      setPatternId(response.data.id);
      toast.success('Pattern sent for approval successfully!');

      // Clear form after successful save
      setTimeout(() => {
        setFormData({
          bankAddress: '',
          bankName: '',
          merchantName: '',
          msgType: '',
          regexPattern: '',
          message: '',
          onDemand: false,
          parentTemplateId: '',
          editorComments: '',
          processedResult: ''
        });
        setMatchResult(null);
        setPatternId(null);
        setSuccess('');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to save pattern. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    if (!patternId) {
      toast.error('Pattern ID is missing');
      setError('Pattern ID is missing');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await axios.put(
        `http://localhost:8080/api/patterns/${patternId}/status`,
        { status: 'APPROVED' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Pattern approved successfully!');
      toast.success('Pattern approved successfully!');

      // Navigate back to template approval page after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/template-approval';
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to approve pattern. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!patternId) {
      toast.error('Pattern ID is missing');
      setError('Pattern ID is missing');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await axios.put(
        `http://localhost:8080/api/patterns/${patternId}/status`,
        { status: 'REJECTED' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Pattern rejected successfully!');
      toast.info('Pattern rejected');

      // Navigate back to template approval page after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/template-approval';
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reject pattern. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const fetchPendingMessages = async () => {
    if (pendingCount === 0) {
      toast.info('No pending messages to display');
      return;
    }
    
    setLoadingPending(true);
    try {
      const response = await axios.get('http://localhost:8080/api/unparsed-messages/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched pending messages:', response.data);
      setPendingMessages(response.data);
      setShowPendingMessages(true);
    } catch (err) {
      console.error('Error fetching pending messages:', err);
      toast.error('Failed to load pending messages. Is the backend running?');
    } finally {
      setLoadingPending(false);
    }
  };

  const handleSelectPendingMessage = async (message) => {
    // Auto-fill the form with the pending message
    setFormData(prev => ({
      ...prev,
      bankAddress: message.bankAddress,
      message: message.smsMessage
    }));
    
    // Mark as processed
    try {
      await axios.put(
        `http://localhost:8080/api/unparsed-messages/${message.id}/mark-processed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update the pending count
      setPendingCount(prev => Math.max(0, prev - 1));
      
      // Remove from pending list
      setPendingMessages(prev => prev.filter(m => m.id !== message.id));
      
      toast.success('Message loaded! Now create a pattern for it.');
      setShowPendingMessages(false);
    } catch (err) {
      console.error('Error marking message as processed:', err);
      toast.error('Failed to mark message as processed');
    }
  };

  const handleDeletePendingMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:8080/api/unparsed-messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update the pending count
      setPendingCount(prev => Math.max(0, prev - 1));
      
      // Remove from pending list
      setPendingMessages(prev => prev.filter(m => m.id !== messageId));
      
      toast.success('Message deleted successfully');
    } catch (err) {
      console.error('Error deleting message:', err);
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-secondary">SMS Message Template Information</h1>
          <div className="flex items-center gap-4">
            {/* Pending Messages Button */}
            {userRole === 'maker' && (
              <button
                onClick={fetchPendingMessages}
                disabled={pendingCount === 0}
                className={`relative inline-flex items-center px-4 py-2 rounded-full font-semibold transition duration-300 ${
                  pendingCount > 0
                    ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pending Messages
                {pendingCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-orange-100 bg-orange-700 rounded-full">
                    {pendingCount}
                  </span>
                )}
                {pendingCount === 0 && (
                  <span className="ml-2 text-xs">(0)</span>
                )}
              </button>
            )}
            {userRole === 'checker' && patternId && (
              <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
                Review Mode - Pattern #{patternId}
              </span>
            )}
          </div>
        </div>

        {/* Pending Messages Modal */}
        {showPendingMessages && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Pending SMS Messages ({pendingMessages.length})
                </h2>
                <button
                  onClick={() => setShowPendingMessages(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {loadingPending ? (
                  <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
                ) : pendingMessages.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-400">No pending messages</p>
                ) : (
                  <div className="space-y-4">
                    {pendingMessages.map((message) => (
                      <div
                        key={message.id}
                        className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-secondary transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                                {message.bankAddress}
                              </span>
                              {message.user && (
                                <span className="inline-block px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                  Submitted by: {message.user.username}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(message.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSelectPendingMessage(message)}
                              className="px-3 py-1 bg-primary hover:bg-tertiary text-white rounded-md text-sm font-semibold transition"
                            >
                              Use This
                            </button>
                            <button
                              onClick={() => handleDeletePendingMessage(message.id)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-semibold transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                            {message.smsMessage}
                          </p>
                        </div>
                        {message.errorMessage && (
                          <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                            <p className="text-xs text-red-600 dark:text-red-400">
                              Error: {message.errorMessage}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* General Information */}
        <FieldGroup title="General Information" cols={3}>
          <InputField label="Bank Address" name="bankAddress" value={formData.bankAddress} onChange={handleInputChange} disabled={userRole === 'checker'} />
          <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleInputChange} disabled={userRole === 'checker'} />
          <InputField label="Merchant Name" name="merchantName" value={formData.merchantName} onChange={handleInputChange} disabled={userRole === 'checker'} />
        </FieldGroup>

        {/* Transaction Details */}
        <FieldGroup title="Transaction Details" cols={1}>
          <SelectField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            options={['', 'CREDITED', 'DEBITED', 'ALERT', 'REMINDER']}
            disabled={userRole === 'checker'}
          />
          {/* Category removed - now auto-detected via Gemini API when parsing messages */}
        </FieldGroup>

        {/* Pattern and Sample Message */}
        <FieldGroup title="Pattern & Sample Message" cols={1}>
          <TextAreaField
            label="Regex Pattern"
            name="regexPattern"
            value={formData.regexPattern}
            onChange={handleInputChange}
            rows={4}
            className="font-mono text-sm"
            placeholder="Put your regex pattern"
            disabled={userRole === 'checker'}
          />
          <TextAreaField
            label="Sample Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            highlight={true}
            placeholder="Put your SMS message"
            disabled={userRole === 'checker'}
          />
          {matchResult && (
            <div className={`mt-4 p-4 rounded-md ${matchResult.success
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              }`}>
              <p className="font-medium">{matchResult.message}</p>
              {matchResult.matchedText && (
                <p className="mt-2 text-sm font-mono bg-white dark:bg-gray-700 p-2 rounded border border-green-300 dark:border-green-700 text-gray-900 dark:text-gray-100">
                  Matched: {matchResult.matchedText.substring(0, 100)}{matchResult.matchedText.length > 100 ? '...' : ''}
                </p>
              )}
            </div>
          )}
        </FieldGroup>

        {/* Editor Comments and Processed Result
        <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm">
          <div className="mb-4">
            <CheckboxField label="On Demand" name="onDemand" checked={formData.onDemand} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <InputField label="Parent Template Id" name="parentTemplateId" value={formData.parentTemplateId} onChange={handleInputChange} className="max-w-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextAreaField
              label="Editor Comments"
              name="editorComments"
              value={formData.editorComments}
              onChange={handleInputChange}
              rows={8}
              className="w-full"
            />
            <TextAreaField
              label="Processed Result"
              name="processedResult"
              value={formData.processedResult}
              onChange={handleInputChange}
              rows={8}
              className="w-full"
            />
          </div>
        </div> */}

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-end mt-6">
          {userRole === 'checker' ? (
            <>
              <button
                onClick={handleMatch}
                disabled={matching}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {matching ? 'Matching...' : 'Match'}
              </button>
              <button
                onClick={handleApprove}
                disabled={saving}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Processing...' : 'Approve'}
              </button>
              <button
                onClick={handleReject}
                disabled={saving}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={() => window.location.href = '/template-approval'}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 font-semibold"
              >
                Cancel
              </button>
            </>
          ) : userRole === 'maker' ? (
            <>
              <button
                onClick={handleMatch}
                disabled={matching}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {matching ? 'Matching...' : 'Match'}
              </button>
              <button
                onClick={handleSendToApprove}
                disabled={saving || !matchResult || !matchResult.success}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Send to Approve'}
              </button>
              <button
                onClick={() => {
                  setFormData({
                    bankAddress: '',
                    bankName: '',
                    merchantName: '',
                    msgType: '',
                    regexPattern: '',
                    message: '',
                    onDemand: false,
                    parentTemplateId: '',
                    editorComments: '',
                    processedResult: ''
                  });
                  setMatchResult(null);
                  setError('');
                  setSuccess('');
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold">
                Match
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold">
                Save
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold">
                Test
              </button>
              <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 font-semibold">
                Delete
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold">
                Reprocess
              </button>
              <button className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 font-semibold">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SMSParser;
