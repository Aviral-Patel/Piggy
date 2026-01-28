import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import TransactionCards from '../components/TransactionCards.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  
const { user, token, loading, isAuthenticated, updateUser } = useUser();
const [smsText, setSmsText] = useState('');
const [transactions, setTransactions] = useState([]);
const [parsedData, setParsedData] = useState(null);
const [error, setError] = useState('');
const [parseLoading, setParseLoading] = useState(false);  // ADD THIS NEW STATE
const [fetchingTransactions, setFetchingTransactions] = useState(true);
  
  // Fetch user role if missing
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!loading && isAuthenticated() && token && (!user?.role || user.role === 'undefined')) {
        try {
          const response = await axios.get('http://localhost:8080/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Update user with role
          updateUser({
            ...user,
            role: response.data.role,
          });
        } catch (err) {
          console.error('Error fetching user role:', err);
        }
      }
    };
    fetchUserRole();
  }, [loading, isAuthenticated, token, user, updateUser]);

  useEffect(() => {
    // WAIT for UserContext to finish loading
    if (!loading && !isAuthenticated()) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);  // ADD 'loading' to dependency array

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setFetchingTransactions(false);
      }
    };
  
    // ONLY fetch if context has finished loading AND user is authenticated
    if (!loading && isAuthenticated()) {
      fetchTransactions();
    } else if (!loading) {
      // Context loaded but not authenticated
      setFetchingTransactions(false);
    }
  }, [loading, isAuthenticated, token, navigate]);

  if (loading || fetchingTransactions) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-600">Loading your transactions...</p>
        </div>
      </div>
    );
  }
  
  const handleParse = async (e) => {
    e.preventDefault();
    setError('');
    setParsedData(null);
    
    if (!smsText.trim()) {
      setError('Please enter an SMS message');
      return;
    }
  
    setParseLoading(true);  // CHANGE: Use parseLoading instead of loading
    
    try {
      const response = await axios.post(
        'http://localhost:8080/api/transactions/parse',
        { sms: smsText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',  // ADD THIS - explicitly set content type
          },
        }
      );
      
      console.log('Parse response:', response.data);  // ADD THIS - for debugging
      setParsedData(response.data);
    } catch (err) {
      console.error('Error parsing SMS:', err);
      console.error('Error response:', err.response);  // ADD THIS - for debugging
      setError(err.response?.data?.message || 'Failed to parse SMS. Please try again.');
    } finally {
      setParseLoading(false);  // CHANGE: Use parseLoading instead of loading
    }
  };

  const handleAddTransaction = () => {
    if (parsedData) {
      setTransactions([...transactions, parsedData]);
      setParsedData(null);
      setSmsText('');
      setError('');
    }
  };

  const handleClear = () => {
    setSmsText('');
    setParsedData(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Welcome, {user?.username}!
          </h1>
          <p className="text-lg text-gray-600">
            Add your bank SMS messages to track transactions
          </p>
          
          {/* Role-based navigation buttons */}
          {user?.role?.toLowerCase() === 'maker' && (
            <div className="mt-6">
              <Link
                to="/sms-parser"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300"
              >
                Go to SMS Parser
              </Link>
            </div>
          )}
          
          {user?.role?.toLowerCase() === 'checker' && (
            <div className="mt-6">
              <Link
                to="/template-approval"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300"
              >
                Go to Template Approval
              </Link>
            </div>
          )}
        </div>

        {/* SMS Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleParse}>
            <label htmlFor="sms-input" className="block text-sm font-medium text-gray-700 mb-2">
              Bank SMS Message
            </label>
            <textarea
              id="sms-input"
              rows="6"
              value={smsText}
              onChange={(e) => setSmsText(e.target.value)}
              placeholder="Paste your SMS here...&#10;Example: Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789 - HDFC Bank"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary resize-none"
            />
            
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}

            <div className="mt-4 flex gap-4">
              <button
                type="submit"
                disabled={parseLoading}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {parseLoading ? 'Parsing...' : 'Parse SMS'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Parsed Data Preview */}
        {parsedData && (
         <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Parsed Transaction</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Merchant</label>
                  <p className="text-lg font-semibold text-gray-900">{parsedData.merchant || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Amount</label>
                  <p className="text-xl font-bold text-primary">
                    ₹{parsedData.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-secondary text-primary">
                    {parsedData.category || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {parsedData.type && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Transaction Type</label>
                    <p className="text-lg font-semibold text-gray-900">{parsedData.type}</p>
                  </div>
                )}
                
                {parsedData.date && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                    <p className="text-lg font-semibold text-gray-900">{parsedData.date}</p>
                  </div>
                )}
                
                {parsedData.bank && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Bank</label>
                    <p className="text-lg font-semibold text-gray-900">{parsedData.bank}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddTransaction}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300"
              >
                Add Transaction
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Transactions Cards */}
        <TransactionCards transactions={transactions} />
      </div>

     
    </div>
  );
};

export default Dashboard;
