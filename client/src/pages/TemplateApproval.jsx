import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar.jsx';
import Footer from '../components/Footer.jsx';

const TemplateApproval = () => {
  // Sample data - in real app, this would come from API
  const [templates, setTemplates] = useState([
    {
      id: 1,
      bankName: 'ICICI Bank',
      transactionType: 'Debit Transaction',
      smsMessage: 'dear customer, icici bank acct xx624 debited with rs 1,500.00 on 08-sep-23 and account linked to mobile number xx2022 credited, imps:325116062689. call 18002662 for dispute or sms block 624 to 9215676766.',
      regexPattern: '(?s)\\s*.*?(?:Acct Your\\s+aVc\\s+no\\.)\\s*([xX0-9]+)\\s*(?:is)?\\s+debited\\s+(?:with | for|by)\\s+(?:Rs\\.? | INR)?(?:\\s*)([0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)\\s+on\\s+(\\d{2}-[A-z0-9]{2,3}-\\d{2,4})(?:\\W+\\d{1,2}:\\d{1,2}:\\d{1,2})?)\\s*(?:and|to| & | by)\\s*(?:(?:Acct|a\\/c)\\s*([a-z0-9]+) |account\\s+linked\\s+to\\s+mobile\\s+number\\s+[A-z0-9]+)\\s*(?:credited)?\\s*.*?IMPS\\W*(?:Ref\\s*no)?\\s*([0-9]+).*',
      status: 'pending',
      requestedBy: 'Maker User 1',
      requestedDate: '2024-01-15'
    },
    {
      id: 2,
      bankName: 'HDFC Bank',
      transactionType: 'Credit Transaction',
      smsMessage: 'Dear Customer, Your A/c XX284 credited with INR 3,000.00 on 16-Apr-20 by Acct XX165. IMPS: 010710592992. Call 18002662 for dispute.',
      regexPattern: '(?s).*?(?:A/c|Account|Acct)\\s*([xX0-9]+)\\s+credited\\s+(?:with|by)\\s+(?:INR|Rs\\.?)\\s*([0-9]+(?:\\.[0-9]+)?)\\s+on\\s+(\\d{2}-[A-z]{3}-\\d{2,4}).*?IMPS\\s*:?\\s*([0-9]+).*',
      status: 'pending',
      requestedBy: 'Maker User 2',
      requestedDate: '2024-01-16'
    },
    {
      id: 3,
      bankName: 'SBI Bank',
      transactionType: 'Balance Inquiry',
      smsMessage: 'Your SBI A/c XX4677 balance is Rs. 21,132.00 as on 18-11-2023 18:30:02. For queries call 18004253800.',
      regexPattern: '(?s).*?(?:A/c|Account)\\s*([xX0-9]+)\\s+balance\\s+is\\s+(?:Rs\\.?|INR)\\s*([0-9,]+(?:\\.[0-9]+)?)\\s+as\\s+on\\s+(\\d{2}-\\d{2}-\\d{4})\\s+(\\d{2}:\\d{2}:\\d{2}).*',
      status: 'pending',
      requestedBy: 'Maker User 3',
      requestedDate: '2024-01-17'
    },
    {
      id: 4,
      bankName: 'Axis Bank',
      transactionType: 'Debit Transaction',
      smsMessage: 'Dear Customer, your a/c no. xxxxxxxx4677 is debited by rs. 21132.00 on 18-11-2023 18:30:02 by a/c linked to mobile xxxxx347195. (imps ref no 230961492748)',
      regexPattern: '(?s).*?(?:a/c|account)\\s+no\\.\\s+([xX0-9]+)\\s+is\\s+debited\\s+by\\s+(?:rs\\.?|INR)\\s*([0-9,]+(?:\\.[0-9]+)?)\\s+on\\s+(\\d{2}-\\d{2}-\\d{4})\\s+(\\d{2}:\\d{2}:\\d{2}).*?imps\\s+ref\\s+no\\s+([0-9]+).*',
      status: 'pending',
      requestedBy: 'Maker User 1',
      requestedDate: '2024-01-18'
    },
    {
      id: 5,
      bankName: 'Kotak Mahindra Bank',
      transactionType: 'Credit Transaction',
      smsMessage: 'Your Kotak A/c XX312 credited with rs 425.00 on 08-Jul-22 and account linked to mobile number xx7362. Ref: KOTAK123456',
      regexPattern: '(?s).*?(?:A/c|Account)\\s*([xX0-9]+)\\s+credited\\s+with\\s+(?:rs|INR)\\s*([0-9]+(?:\\.[0-9]+)?)\\s+on\\s+(\\d{2}-[A-z]{3}-\\d{2}).*?Ref:\\s*([A-Z0-9]+).*',
      status: 'pending',
      requestedBy: 'Maker User 2',
      requestedDate: '2024-01-19'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved, rejected

  const handleApprove = (id) => {
    setTemplates(prev => prev.map(template =>
      template.id === id ? { ...template, status: 'approved' } : template
    ));
    // In real app, this would make an API call
    console.log(`Template ${id} approved`);
  };

  const handleReject = (id) => {
    setTemplates(prev => prev.map(template =>
      template.id === id ? { ...template, status: 'rejected' } : template
    ));
    // In real app, this would make an API call
    console.log(`Template ${id} rejected`);
  };

  const filteredTemplates = filterStatus === 'all'
    ? templates
    : templates.filter(t => t.status === filterStatus);

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || statusStyles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Regex Template Approval</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-md font-semibold transition ${filterStatus === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-md font-semibold transition ${filterStatus === 'pending'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-4 py-2 rounded-md font-semibold transition ${filterStatus === 'approved'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-4 py-2 rounded-md font-semibold transition ${filterStatus === 'rejected'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No templates found with the selected filter.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-primary">
                        Template #{template.id}
                      </h3>
                      {getStatusBadge(template.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Bank Name</label>
                        <p className="text-base text-gray-900 font-semibold mt-1">{template.bankName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Transaction Type</label>
                        <p className="text-base text-gray-900 font-semibold mt-1">{template.transactionType}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-600">Requested By</label>
                        <p className="text-sm text-gray-700 mt-1">{template.requestedBy} • {template.requestedDate}</p>
                      </div>
                    </div>
                  </div>
                  {template.status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleApprove(template.id)}
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-tertiary transition duration-300 font-semibold whitespace-nowrap"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(template.id)}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 font-semibold whitespace-nowrap"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-md p-4 border border-gray-300">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      SMS Message
                    </label>
                    <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {template.smsMessage}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 border border-gray-300">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Regex Pattern
                    </label>
                    <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                      <code className="text-xs text-gray-800 font-mono leading-relaxed break-all">
                        {template.regexPattern}
                      </code>
                    </div>
                  </div>
                </div>

                {template.status !== 'pending' && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-sm text-gray-600">
                      {template.status === 'approved' ? '✓' : '✗'} This template was {template.status} by Administrator
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-primary">{templates.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Templates</p>
            </div>
            <div className="bg-white rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {templates.filter(t => t.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Pending</p>
            </div>
            <div className="bg-white rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {templates.filter(t => t.status === 'approved').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Approved</p>
            </div>
            <div className="bg-white rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-red-600">
                {templates.filter(t => t.status === 'rejected').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Rejected</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TemplateApproval;
