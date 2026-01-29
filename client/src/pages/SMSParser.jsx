import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
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
    category: passedData.category || '',

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
      setMatchResult({ success: false, message: 'Please enter a regex pattern' });
      return;
    }

    if (!message.trim()) {
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
    } catch (error) {
      setMatchResult({
        success: false,
        message: error.response?.data?.message || 'Failed to test regex pattern. Please try again.'
      });
    } finally {
      setMatching(false);
    }
  };

  const handleSendToApprove = async () => {
    // Validate required fields
    if (!formData.bankAddress.trim()) {
      setError('Bank Address is required');
      return;
    }
    if (!formData.bankName.trim()) {
      setError('Bank Name is required');
      return;
    }
    if (!formData.regexPattern.trim()) {
      setError('Regex Pattern is required');
      return;
    }
    if (!formData.message.trim()) {
      setError('Sample Message is required');
      return;
    }

    // Check if match was successful
    if (!matchResult || !matchResult.success) {
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
        regexPattern: formData.regexPattern,
        message: formData.message,
        category: formData.category || null,
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

      // Clear form after successful save
      setTimeout(() => {
        setFormData({
          bankAddress: '',
          bankName: '',
          merchantName: '',
          msgType: '',
          category: '',
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
      setError(err.response?.data?.message || 'Failed to save pattern. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    if (!patternId) {
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

      // Navigate back to template approval page after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/template-approval';
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve pattern. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!patternId) {
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

      // Navigate back to template approval page after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/template-approval';
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject pattern. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-secondary">SMS Message Template Information</h1>
          {userRole === 'checker' && patternId && (
            <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-semibold border border-yellow-300 dark:border-yellow-700">
              Review Mode - Pattern #{patternId}
            </span>
          )}
        </div>

        {/* General Information */}
        <FieldGroup title="General Information" cols={3}>
          <InputField label="Bank Address" name="bankAddress" value={formData.bankAddress} onChange={handleInputChange} disabled={userRole === 'checker'} />
          <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleInputChange} disabled={userRole === 'checker'} />
          <InputField label="Merchant Name" name="merchantName" value={formData.merchantName} onChange={handleInputChange} disabled={userRole === 'checker'} />
        </FieldGroup>

        {/* Transaction Details */}
        <FieldGroup title="Transaction Details" cols={2}>
          <SelectField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            options={['', 'CREDITED', 'DEBITED', 'OTHERS']}
            disabled={userRole === 'checker'}
          />
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={['', 'FOOD', 'SHOPPING', 'ENTERTAINMENT', 'TRANSPORT', 'UTILITIES', 'OTHERS']}
            disabled={userRole === 'checker'}
          />
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
                    category: '',
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
