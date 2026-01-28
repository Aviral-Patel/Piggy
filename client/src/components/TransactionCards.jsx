import React from 'react';

const TransactionCards = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">No transactions yet. Add your first SMS message above!</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Transactions ({transactions.length})
      </h2>
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id || index} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            {/* Main Transaction Info */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {transaction.merchant || 'Unknown Merchant'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {transaction.type || 'Transaction'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ₹{transaction.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
                  </p>
                </div>
              </div>
              
              {/* Date Display */}
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{transaction.date || new Date().toLocaleDateString('en-IN')}</span>
              </div>
            </div>

            {/* SMS Message */}
            {transaction.smsMessage && (
              <div className="px-5 pb-5">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-2">SMS Message</p>
                  <p className="text-sm text-gray-700 break-words leading-relaxed">
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
