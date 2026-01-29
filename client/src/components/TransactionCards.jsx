import React, { useState } from 'react';

const TransactionCards = ({ transactions }) => {
  const [expandedId, setExpandedId] = useState(null);

  const closeModal = () => setExpandedId(null);
  const expandedTransaction = transactions.find(
    (t, i) => (t.id ?? `txn-${i}`) === expandedId
  );

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
        {transactions.map((transaction, index) => {
          const cardId = transaction.id ?? `txn-${index}`;
          const typeLower = transaction.type?.toLowerCase() ?? '';
          const isCredit = typeLower.includes('credit');
          const isDebit = typeLower.includes('debit');
          const isAlert = typeLower.includes('alert');
          const isReminder = typeLower.includes('reminder');

          return (
            <button
              key={cardId}
              type="button"
              onClick={() => setExpandedId(cardId)}
              className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 hover:shadow-lg dark:hover:shadow-gray-950/50 transition-shadow border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
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
                    {isAlert || isReminder ? (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${isAlert ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                        {transaction.type}
                      </span>
                    ) : (
                      <p className={`text-2xl font-bold ${isCredit ? 'text-tertiary' : isDebit ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {isCredit ? '+' : isDebit ? '-' : ''}₹{transaction.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{transaction.date || new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal overlay: blurred backdrop + centered detail */}
      {expandedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="transaction-detail-title"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-gray-950/50 border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-xl z-10">
              <h2 id="transaction-detail-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Transaction Details
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {(() => {
                const t = expandedTransaction;
                const typeLower = (t.type && typeof t.type === 'string' ? t.type : t.type?.toString?.() ?? '').toLowerCase();
                const isCredit = typeLower.includes('credit');
                const isDebit = typeLower.includes('debit');
                const isAlert = typeLower.includes('alert');
                const isReminder = typeLower.includes('reminder');

                // Display helpers: -1 for numeric, "unknown" for string when missing
                const str = (v) => (v != null && String(v).trim() !== '') ? String(v) : 'unknown';
                const num = (v) => (v != null && v !== '') ? (typeof v === 'number' ? v : Number(v)) : -1;
                const fmtDate = (v) => {
                  if (v == null || v === '') return 'unknown';
                  try {
                    const d = typeof v === 'string' ? new Date(v) : new Date(v);
                    return isNaN(d.getTime()) ? 'unknown' : d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
                  } catch {
                    return 'unknown';
                  }
                };
                const amountVal = t.amount != null && t.amount !== '' ? Number(t.amount) : null;
                const balanceVal = t.balance != null && t.balance !== '' ? Number(t.balance) : null;
                const showAmount = amountVal != null && !Number.isNaN(amountVal)
                  ? amountVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : '-1';
                const hasBalance = balanceVal != null && !Number.isNaN(balanceVal);
                const showBalance = hasBalance
                  ? '₹' + balanceVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 'Cannot fetch';

                const detailRow = (label, value) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</p>
                  </div>
                );

                return (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        {detailRow('ID', num(t.id) >= 0 ? String(num(t.id)) : '-1')}
                        {detailRow('Merchant', str(t.merchant))}
                        {!isAlert && !isReminder && (
                          <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Amount</label>
                            <p className={`text-xl font-bold ${isCredit ? 'text-tertiary' : isDebit ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                              {amountVal != null && !Number.isNaN(amountVal) ? (isCredit ? '+' : isDebit ? '-' : '') + '₹' + showAmount : '₹' + showAmount}
                            </p>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Type</label>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            isCredit ? 'bg-secondary text-primary dark:bg-gray-700 dark:text-secondary' : 
                            isDebit ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 
                            isAlert ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 
                            isReminder ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                            'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}>
                            {str(t.type)}
                          </span>
                        </div>
                        {detailRow('Date', fmtDate(t.date))}
                        {!isAlert && !isReminder && detailRow('Balance', showBalance)}
                      </div>

                      <div className="space-y-3">
                        {detailRow('Bank Name', str(t.bankName))}
                        {detailRow('Bank Address', str(t.bankAddress))}
                        {detailRow('Account Number', str(t.accountNumber))}
                        {detailRow('Category', str(t.category))}
                        {detailRow('Ref Number', str(t.refNumber))}
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">SMS Message</label>
                      <p className="text-sm text-gray-700 dark:text-gray-300 break-words">{str(t.smsMessage)}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCards;
