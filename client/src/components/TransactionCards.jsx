import React, { useState, useMemo } from 'react';

// Import category icons
import foodIcon from '../assets/food.png';
import shoppingIcon from '../assets/shopping.png';
import transportIcon from '../assets/transport.png';
import entertainmentIcon from '../assets/entertainment.png';
import utilityIcon from '../assets/utility.png';
import othersIcon from '../assets/others.png';

// Category color mapping - export for use in charts
export const CATEGORY_COLORS = {
  // Food & Dining
  'Food': '#f97316',           // Orange
  'Dining': '#f97316',
  'Groceries': '#f97316',
  // Shopping
  'Shopping': '#ec4899',       // Pink
  'Retail': '#ec4899',
  // Transportation
  'Transportation': '#3b82f6', // Blue
  'Travel': '#3b82f6',
  'Fuel': '#3b82f6',
  // Utilities
  'Utilities': '#eab308',      // Yellow
  'Bills': '#eab308',
  // Entertainment
  'Entertainment': '#8b5cf6',  // Purple
  'Subscription': '#8b5cf6',
  // Others (default)
  'Healthcare': '#6b7280',     // Gray
  'Medical': '#6b7280',
  'Education': '#6b7280',
  'Transfer': '#6b7280',
  'UPI': '#6b7280',
  'Investment': '#6b7280',
  'Insurance': '#6b7280',
  'ATM': '#6b7280',
  'Uncategorized': '#6b7280',
};

// Get category icon image based on category name
const getCategoryIcon = (category) => {
  const categoryLower = category?.toLowerCase() || '';
  
  if (categoryLower.includes('food') || categoryLower.includes('dining') || categoryLower.includes('groceries')) {
    return foodIcon;
  }
  if (categoryLower.includes('shopping') || categoryLower.includes('retail')) {
    return shoppingIcon;
  }
  if (categoryLower.includes('transport') || categoryLower.includes('travel') || categoryLower.includes('fuel')) {
    return transportIcon;
  }
  if (categoryLower.includes('entertainment') || categoryLower.includes('subscription')) {
    return entertainmentIcon;
  }
  if (categoryLower.includes('utilit') || categoryLower.includes('bill')) {
    return utilityIcon;
  }
  return othersIcon;
};

// Get background color for category
const getCategoryBgColor = (category) => {
  const categoryLower = category?.toLowerCase() || '';
  
  if (categoryLower.includes('food') || categoryLower.includes('dining') || categoryLower.includes('groceries')) {
    return 'bg-orange-100 dark:bg-orange-900/30';
  }
  if (categoryLower.includes('shopping') || categoryLower.includes('retail')) {
    return 'bg-pink-100 dark:bg-pink-900/30';
  }
  if (categoryLower.includes('transport') || categoryLower.includes('travel') || categoryLower.includes('fuel')) {
    return 'bg-blue-100 dark:bg-blue-900/30';
  }
  if (categoryLower.includes('entertainment') || categoryLower.includes('subscription')) {
    return 'bg-purple-100 dark:bg-purple-900/30';
  }
  if (categoryLower.includes('utilit') || categoryLower.includes('bill')) {
    return 'bg-yellow-100 dark:bg-yellow-900/30';
  }
  return 'bg-gray-100 dark:bg-gray-700';
};

// Credit icon (same for all credit transactions)
const CreditIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

// Alert/Reminder icon
const AlertIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

// Get icon for a transaction based on type and category
const getTransactionIcon = (transaction) => {
  const typeLower = transaction.type?.toLowerCase() || '';
  const category = transaction.category || 'Uncategorized';
  
  if (typeLower.includes('alert') || typeLower.includes('reminder')) {
    return { 
      icon: AlertIcon, 
      bgColor: 'bg-orange-100 dark:bg-orange-900/30', 
      iconColor: 'text-orange-600 dark:text-orange-400',
      isImage: false 
    };
  }
  
  if (typeLower.includes('credit')) {
    return { 
      icon: CreditIcon, 
      bgColor: 'bg-green-100 dark:bg-green-900/30', 
      iconColor: 'text-tertiary',
      isImage: false 
    };
  }
  
  // For debit transactions, get category-specific PNG icon
  const iconImage = getCategoryIcon(category);
  const bgColor = getCategoryBgColor(category);
  return { icon: iconImage, bgColor, iconColor: '', isImage: true };
};

const TransactionCards = ({ transactions }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const closeModal = () => setExpandedId(null);

  // Filter transactions based on active filter
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const typeLower = transaction.type?.toLowerCase() || '';
      
      switch (activeFilter) {
        case 'debit':
          return typeLower.includes('debit');
        case 'credit':
          return typeLower.includes('credit');
        case 'alert':
          return typeLower.includes('alert') || typeLower.includes('reminder');
        case 'all':
        default:
          return true;
      }
    });
  }, [transactions, activeFilter]);

  const expandedTransaction = filteredTransactions.find(
    (t, i) => (t.id ?? `txn-${i}`) === expandedId
  );

  // Filter buttons configuration
  const filterButtons = [
    { id: 'all', label: 'All', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    )},
    { id: 'debit', label: 'Debit', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    )},
    { id: 'credit', label: 'Credit', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    )},
    { id: 'alert', label: 'Alerts', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )},
  ];

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-12 text-center border border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No transactions yet. Add your first SMS message above!</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Transactions ({filteredTransactions.length})
      </h2>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterButtons.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === filter.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 p-8 text-center border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No {activeFilter} transactions found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredTransactions.map((transaction, index) => {
            const cardId = transaction.id ?? `txn-${index}`;
            const typeLower = transaction.type?.toLowerCase() ?? '';
            const isCredit = typeLower.includes('credit');
            const isDebit = typeLower.includes('debit');
            const isAlert = typeLower.includes('alert');
            const isReminder = typeLower.includes('reminder');
            const { icon, bgColor, iconColor, isImage } = getTransactionIcon(transaction);

            return (
              <button
                key={cardId}
                type="button"
                onClick={() => setExpandedId(cardId)}
                className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/30 hover:shadow-lg dark:hover:shadow-gray-950/50 transition-shadow border border-gray-200 dark:border-gray-700 cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Transaction Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${bgColor} ${iconColor} flex items-center justify-center`}>
                      {isImage ? (
                        <img src={icon} alt="category" className="w-6 h-6 object-contain" />
                      ) : (
                        icon
                      )}
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                        {transaction.merchant || 'Unknown Merchant'}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>{transaction.type || 'Transaction'}</span>
                        <span>•</span>
                        <span>{transaction.date || new Date().toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    
                    {/* Amount / Badge */}
                    <div className="text-right flex-shrink-0">
                      {isAlert || isReminder ? (
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${isAlert ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                          {transaction.type}
                        </span>
                      ) : (
                        <p className={`text-lg font-bold ${isCredit ? 'text-tertiary' : isDebit ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {isCredit ? '+' : isDebit ? '-' : ''}₹{transaction.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

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
                const { icon, bgColor, iconColor, isImage } = getTransactionIcon(t);

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
                    {/* Header with Icon */}
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-full ${bgColor} ${iconColor} flex items-center justify-center`}>
                        {isImage ? (
                          <img src={icon} alt="category" className="w-8 h-8 object-contain" />
                        ) : (
                          <div className="w-7 h-7">{icon}</div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{str(t.merchant)}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{str(t.category)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        {detailRow('ID', num(t.id) >= 0 ? String(num(t.id)) : '-1')}
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
