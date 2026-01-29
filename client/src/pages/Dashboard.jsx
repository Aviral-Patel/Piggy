import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import TransactionCards, { CATEGORY_COLORS } from '../components/TransactionCards.jsx';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  
const { user, token, loading, isAuthenticated, updateUser } = useUser();
const [smsText, setSmsText] = useState('');

// Static fallback list with all available bank addresses
const defaultBankAddresses = [
  { id: 'BZ-SBIINB', address: 'BZ-SBIINB', bankName: 'State Bank of India' },
  { id: 'SBIINB', address: 'SBIINB', bankName: 'State Bank of India' },
  { id: 'CBSSBI', address: 'CBSSBI', bankName: 'State Bank of India CBS' },
  { id: 'SBIBNK', address: 'SBIBNK', bankName: 'State Bank of India' },
  { id: 'SBICRD', address: 'SBICRD', bankName: 'SBI Credit Card' },
  { id: 'VM-HDFCBK', address: 'VM-HDFCBK', bankName: 'HDFC Bank' },
  { id: 'HDFCBK', address: 'HDFCBK', bankName: 'HDFC Bank' },
  { id: 'AX-ICICIB', address: 'AX-ICICIB', bankName: 'ICICI Bank' },
  { id: 'ICICIT', address: 'ICICIT', bankName: 'ICICI Bank' },
  { id: 'JD-AXISBK', address: 'JD-AXISBK', bankName: 'Axis Bank' },
  { id: 'AXISBK', address: 'AXISBK', bankName: 'Axis Bank' },
  { id: 'KM-KOTAKB', address: 'KM-KOTAKB', bankName: 'Kotak Bank' },
  { id: 'KOTAKB', address: 'KOTAKB', bankName: 'Kotak Bank' },
  { id: 'PNBSMS', address: 'PNBSMS', bankName: 'Punjab National Bank' },
  { id: 'TATAMF', address: 'TATAMF', bankName: 'Tata Mutual Fund' },
  { id: 'FEDBNK', address: 'FEDBNK', bankName: 'Federal Bank' },
  { id: 'AUBANK', address: 'AUBANK', bankName: 'AU Small Finance Bank' },
  { id: 'INDUSB', address: 'INDUSB', bankName: 'IndusInd Bank' },
  { id: 'UJJIVN', address: 'UJJIVN', bankName: 'Ujjivan Small Finance Bank' },
  { id: 'JANABK', address: 'JANABK', bankName: 'Jana Small Finance Bank' },
  { id: 'SCBANK', address: 'SCBANK', bankName: 'Standard Chartered Bank' },
  { id: 'IDFCFB', address: 'IDFCFB', bankName: 'IDFC First Bank' },
  { id: 'CanBnk', address: 'CanBnk', bankName: 'Canara Bank' },
  { id: 'MAHABK', address: 'MAHABK', bankName: 'Maharashtra Bank' },
  { id: 'OneCrd', address: 'OneCrd', bankName: 'OneCard' },
  { id: 'TRCRED', address: 'TRCRED', bankName: 'Tru Credit' },
  { id: 'BRNCHI', address: 'BRNCHI', bankName: 'Branch International' },
  { id: 'GENERIC', address: 'GENERIC', bankName: 'Generic Bank' },
];

const [bankAddress, setBankAddress] = useState('');
const [bankAddresses, setBankAddresses] = useState(defaultBankAddresses);
const [transactions, setTransactions] = useState([]);
const [parsedData, setParsedData] = useState(null);
const [error, setError] = useState('');
const [parseLoading, setParseLoading] = useState(false);
const [fetchingTransactions, setFetchingTransactions] = useState(true);
const [bulkParsedData, setBulkParsedData] = useState([]);
const [bulkParseLoading, setBulkParseLoading] = useState(false);
const [bulkParseProgress, setBulkParseProgress] = useState({ current: 0, total: 0 });

  // Chart colors matching the category icons
  const CHART_COLORS = {
    income: '#1FAB77',    // tertiary - green for income
    expense: '#ef4444',   // red for expense
  };

  // Get color for a category based on icon colors
  const getCategoryChartColor = (categoryName) => {
    const categoryLower = categoryName?.toLowerCase() || '';
    
    if (categoryLower.includes('food') || categoryLower.includes('dining') || categoryLower.includes('groceries')) {
      return '#f97316'; // Orange - Food
    }
    if (categoryLower.includes('shopping') || categoryLower.includes('retail')) {
      return '#ec4899'; // Pink - Shopping
    }
    if (categoryLower.includes('transport') || categoryLower.includes('travel') || categoryLower.includes('fuel')) {
      return '#3b82f6'; // Blue - Transport
    }
    if (categoryLower.includes('entertainment') || categoryLower.includes('subscription')) {
      return '#8b5cf6'; // Purple - Entertainment
    }
    if (categoryLower.includes('utilit') || categoryLower.includes('bill')) {
      return '#eab308'; // Yellow - Utilities
    }
    return '#6b7280'; // Gray - Others
  };

  // Compute chart data from transactions
  const chartData = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryExpenses = {};

    transactions.forEach(transaction => {
      const typeLower = transaction.type?.toLowerCase() || '';
      const amount = Number(transaction.amount) || 0;
      const category = transaction.category || 'Uncategorized';

      // Skip alerts and reminders for financial calculations
      if (typeLower.includes('alert') || typeLower.includes('reminder')) {
        return;
      }

      if (typeLower.includes('credit')) {
        totalIncome += amount;
      } else if (typeLower.includes('debit')) {
        totalExpense += amount;
        // Track category-wise expenses
        categoryExpenses[category] = (categoryExpenses[category] || 0) + amount;
      }
    });

    // Income vs Expense pie chart data
    const incomeVsExpense = [
      { name: 'Income', value: totalIncome },
      { name: 'Expense', value: totalExpense },
    ].filter(item => item.value > 0);

    // Category-wise expense pie chart data
    const categoryData = Object.entries(categoryExpenses)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      incomeVsExpense,
      categoryData,
      totalIncome,
      totalExpense,
    };
  }, [transactions]);

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ₹{data.value?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend renderer
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-3 mt-2">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center gap-1.5">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };
  
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
    const fetchBankAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/patterns/bank-addresses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Transform the response to match the expected format
        const transformedData = response.data.map(item => ({
          id: item.address, // Use address as id since we don't have separate id
          address: item.address,
          bankName: item.bankName
        }));
        // Update bank addresses with API data if available, otherwise keep default
        if (transformedData.length > 0) {
          setBankAddresses(transformedData);
        }
      } catch (err) {
        console.error('Error fetching bank addresses:', err);
        toast.error('Failed to load bank addresses. Using default list.');
      }
    };

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
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error('Failed to load transactions. Please try again.');
        }
      } finally {
        setFetchingTransactions(false);
      }
    };
  
    // ONLY fetch if context has finished loading AND user is authenticated
    if (!loading && isAuthenticated()) {
      fetchBankAddresses();
      fetchTransactions();
    } else if (!loading) {
      // Context loaded but not authenticated
      setFetchingTransactions(false);
    }
  }, [loading, isAuthenticated, token, navigate]);

  if (loading || fetchingTransactions) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading your transactions...</p>
        </div>
      </div>
    );
  }
  
  const handleParse = async (e) => {
    e.preventDefault();
    setError('');
    setParsedData(null);
    
    if (!smsText.trim()) {
      toast.warning('Please enter an SMS message');
      return;
    }
  
    setParseLoading(true);
    
    try {
      const response = await axios.post(
        'http://localhost:8080/api/transactions/parse',
        { sms: smsText, bankAddress: bankAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('Parse response:', response.data);
      const transactionWithSms = {
        ...response.data,
        smsMessage: smsText
      };
      setParsedData(transactionWithSms);
      
      // Automatically add transaction to the list
      setTransactions([transactionWithSms, ...transactions]);
      
      toast.success('Transaction parsed and added successfully!');
      
      // Clear form after successful parse
      setTimeout(() => {
        setSmsText('');
        setParsedData(null);
      }, 2000);
    } catch (err) {
      console.error('Error parsing SMS:', err);
      console.error('Error response:', err.response);
      const errorMessage = err.response?.data?.message || 'Failed to parse SMS. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setParseLoading(false);
    }
  };

  const handleClear = () => {
    setSmsText('');
    setParsedData(null);
    setError('');
  };

  const handleJsonFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.json')) {
      toast.error('Please upload a valid JSON file');
      return;
    }

    try {
      const fileContent = await file.text();
      const jsonData = JSON.parse(fileContent);

      // Validate JSON structure
      if (!Array.isArray(jsonData)) {
        toast.error('JSON file must contain an array of messages');
        return;
      }

      // Validate each message has required fields
      const isValid = jsonData.every(item => item.address && item.message);
      if (!isValid) {
        toast.error('Each message must have "address" and "message" fields');
        return;
      }

      // Process all messages
      setBulkParseLoading(true);
      setBulkParsedData([]);
      setBulkParseProgress({ current: 0, total: jsonData.length });
      setError('');

      const parsedTransactions = [];
      const failedMessages = [];

      for (let i = 0; i < jsonData.length; i++) {
        const { address, message } = jsonData[i];
        
        try {
          const response = await axios.post(
            'http://localhost:8080/api/transactions/parse',
            { sms: message, bankAddress: address },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          
          const transactionWithSms = {
            ...response.data,
            smsMessage: message
          };
          parsedTransactions.push(transactionWithSms);
          
          setBulkParseProgress({ current: i + 1, total: jsonData.length });
        } catch (err) {
          console.error(`Error parsing message ${i + 1}:`, err);
          failedMessages.push({
            index: i + 1,
            address,
            message: message.substring(0, 50) + '...',
            error: err.response?.data?.message || 'Failed to parse'
          });
        }
      }

      // Update transactions list with successfully parsed transactions
      if (parsedTransactions.length > 0) {
        setBulkParsedData(parsedTransactions);
        setTransactions([...parsedTransactions, ...transactions]);
        toast.success(`Successfully parsed ${parsedTransactions.length} out of ${jsonData.length} messages!`);
      }

      // Show warning for failed messages
      if (failedMessages.length > 0) {
        console.warn('Failed messages:', failedMessages);
        toast.warning(`${failedMessages.length} message(s) failed to parse. Check console for details.`);
      }

      // Clear the file input
      event.target.value = '';

    } catch (err) {
      console.error('Error reading JSON file:', err);
      if (err instanceof SyntaxError) {
        toast.error('Invalid JSON format. Please check your file.');
      } else {
        toast.error('Failed to process file. Please try again.');
      }
    } finally {
      setBulkParseLoading(false);
      setBulkParseProgress({ current: 0, total: 0 });
      
      // Auto-clear bulk parsed data after 5 seconds
      setTimeout(() => {
        setBulkParsedData([]);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            Welcome, {user?.username}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
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

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms and Transactions */}
          <div className="space-y-6">

            {/* SMS Input Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-6 border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleParse}>
                <div className="mb-4">
                  <label htmlFor="bank-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bank Address / SMS ID
                  </label>
                  <input
                    id="bank-address"
                    type="text"
                    value={bankAddress}
                    onChange={(e) => setBankAddress(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <label htmlFor="sms-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bank SMS Message
                </label>
                <textarea
                  id="sms-input"
                  rows="5"
                  value={smsText}
                  onChange={(e) => setSmsText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary focus:border-primary resize-none"
                />
                
                {error && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
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
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* Bulk JSON Upload Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Bulk Upload (JSON)
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Upload a JSON file with multiple SMS messages.
              </p>
              
              <div className="flex items-center gap-4">
                <label htmlFor="json-upload" className="flex-1">
                  <input
                    id="json-upload"
                    type="file"
                    accept=".json"
                    onChange={handleJsonFileUpload}
                    disabled={bulkParseLoading}
                    className="block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </label>
              </div>

              {bulkParseLoading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Processing messages...
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {bulkParseProgress.current} / {bulkParseProgress.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${(bulkParseProgress.current / bulkParseProgress.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Bulk Parsed Data Preview */}
            {bulkParsedData.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-6 border-2 border-green-500 dark:border-tertiary">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ✓ {bulkParsedData.length} Transactions Added Successfully!
                  </h2>
                </div>
                
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {bulkParsedData.map((transaction, index) => {
                    const typeLower = transaction.type?.toLowerCase() || '';
                    const isAlert = typeLower.includes('alert');
                    const isReminder = typeLower.includes('reminder');
                    
                    return (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{transaction.merchant || 'N/A'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{transaction.smsMessage}</p>
                          </div>
                          {!isAlert && !isReminder && (
                            <p className="text-sm font-bold text-primary ml-2">
                              ₹{transaction.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Parsed Data Preview */}
            {parsedData && (() => {
              const typeLower = parsedData.type?.toLowerCase() || '';
              const isAlert = typeLower.includes('alert');
              const isReminder = typeLower.includes('reminder');
              
              return (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-6 border-2 border-green-500 dark:border-tertiary">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      ✓ {isAlert || isReminder ? 'Alert/Reminder' : 'Transaction'} Added!
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Merchant</label>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{parsedData.merchant || 'N/A'}</p>
                    </div>
                    
                    {!isAlert && !isReminder && (
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Amount</label>
                        <p className="text-lg font-bold text-primary">
                          ₹{parsedData.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Type</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        isAlert ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 
                        isReminder ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                        'bg-secondary text-primary dark:bg-gray-700 dark:text-secondary'
                      }`}>
                        {parsedData.type || 'N/A'}
                      </span>
                    </div>

                    {parsedData.date && (
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Date</label>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{parsedData.date}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-700 dark:text-gray-300 break-words">{parsedData.smsMessage}</p>
                  </div>
                </div>
              );
            })()}

            {/* Transactions Cards */}
            <TransactionCards transactions={transactions} />
          </div>

          {/* Right Column - Charts */}
          <div className="space-y-6">
            {/* Income vs Expense Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Income vs Expense
              </h2>
              {chartData.incomeVsExpense.length > 0 ? (
                <>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.incomeVsExpense}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          labelLine={false}
                        >
                          {chartData.incomeVsExpense.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.name === 'Income' ? CHART_COLORS.income : CHART_COLORS.expense}
                              stroke="transparent"
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderCustomLegend} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                      <p className="text-lg font-bold text-tertiary">
                        +₹{chartData.totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Expense</p>
                      <p className="text-lg font-bold text-red-500 dark:text-red-400">
                        -₹{chartData.totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No transaction data yet.<br />
                    Add SMS messages to see your income vs expense breakdown.
                  </p>
                </div>
              )}
            </div>

            {/* Category-wise Expense Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Expense by Category
              </h2>
              {chartData.categoryData.length > 0 ? (
                <>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          labelLine={false}
                        >
                          {chartData.categoryData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={getCategoryChartColor(entry.name)}
                              stroke="transparent"
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderCustomLegend} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Category List */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {chartData.categoryData.map((category, index) => (
                        <div key={category.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-3 h-3 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: getCategoryChartColor(category.name) }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                              {category.name}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            ₹{category.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No expense data yet.<br />
                    Add debit transactions to see category breakdown.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
