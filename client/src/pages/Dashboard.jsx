import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar.jsx';
import Footer from '../components/Footer.jsx';

const Dashboard = () => {
  const [smsText, setSmsText] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleParse = async (e) => {
    e.preventDefault();
    setError('');
    setParsedData(null);
    
    if (!smsText.trim()) {
      setError('Please enter an SMS message');
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Replace with your actual backend API endpoint
      const response = await fetch('http://localhost:8080/api/parse-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ smsText }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse SMS');
      }

      const data = await response.json();
      setParsedData(data);
    } catch (err) {
      console.error('Error parsing SMS:', err);
      setError('Failed to parse SMS. Please try again.');
    } finally {
      setLoading(false);
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
      <DashboardNavbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Transaction Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Add your bank SMS messages to track transactions
          </p>
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
                disabled={loading}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Parsing...' : 'Parse SMS'}
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
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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
        {transactions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Transactions ({transactions.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transactions.map((transaction, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Merchant</label>
                      <p className="text-lg font-semibold text-gray-900">{transaction.merchant || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Amount</label>
                      <p className="text-xl font-bold text-primary">
                        ₹{transaction.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-secondary text-primary">
                        {transaction.category || 'N/A'}
                      </span>
                    </div>

                    {transaction.date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                        <p className="text-base font-semibold text-gray-900">{transaction.date}</p>
                      </div>
                    )}

                    {transaction.type && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Type</label>
                        <p className="text-base font-semibold text-gray-900">{transaction.type}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {transactions.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No transactions yet. Add your first SMS message above!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
