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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Transactions ({transactions.length})
      </h2>
      <div className="flex flex-col gap-6">
        {transactions.map((transaction, index) => (
          <div key={transaction.id || index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
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
  );
};

export default TransactionCards;
