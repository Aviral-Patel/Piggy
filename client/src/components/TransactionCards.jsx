import React from 'react';

const TransactionCards = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-12 text-center border border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No transactions yet. Add your first SMS message above!</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Transactions ({transactions.length})
      </h2>
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id || index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 hover:shadow-lg dark:hover:shadow-gray-950/50 transition-shadow border border-gray-200 dark:border-gray-700"
          >
            {/* Main Transaction Info */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {transaction.merchant || 'Unknown Merchant'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {transaction.type || 'Transaction'}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${transaction.type?.toLowerCase().includes('credit') ? 'text-tertiary' : 'text-red-500 dark:text-red-400'}`}>
                    {transaction.type?.toLowerCase().includes('credit') ? '+' : '-'}₹{transaction.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
                  </p>
                </div>
              </div>
              
              {/* Date Display */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{transaction.date || new Date().toLocaleDateString('en-IN')}</span>
              </div>
            </div>

            {/* SMS Message */}
            {transaction.smsMessage && (
              <div className="px-5 pb-5">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">SMS Message</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 break-words leading-relaxed">
                    {transaction.smsMessage}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionCards;
