import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar.jsx';
import Footer from '../components/Footer.jsx';

const SMSParser = () => {
  // Sample data - in real app, this would come from props or API
  const [formData, setFormData] = useState({
    // General Information
    address: 'ICICIB',
    bankName: 'ICICI',
    merchantName: '',
    processedTxnCount: '237981806',
    lastTxnDate: '09/11/2023',

    // Message Type
    msgType: 'Debit Transaction',
    msgSubtype: 'Expense',
    txnType: 'Regular',
    paymentType: 'IMPS',
    accountType: 'Bank',
    templateType: 'Processed',

    // Features
    multipleAccounts: false,
    temporarilyDeprecated: false,
    serverProcessed: false,
    process: false,
    ignoreMsg: false,

    // Pattern and Sample
    pattern: '(?s)\\s*.*?(?:Acct Your\\s+aVc\\s+no\\.)\\s*([xX0-9]+)\\s*(?:is)?\\s+debited\\s+(?:with | for|by)\\s+(?:Rs\\.? | INR)?(?:\\s*)([0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)\\s+on\\s+(\\d{2}-[A-z0-9]{2,3}-\\d{2,4})(?:\\W+\\d{1,2}:\\d{1,2}:\\d{1,2})?)\\s*(?:and|to| & | by)\\s*(?:(?:Acct|a\\/c)\\s*([a-z0-9]+) |account\\s+linked\\s+to\\s+mobile\\s+number\\s+[A-z0-9]+)\\s*(?:credited)?\\s*.*?IMPS\\W*(?:Ref\\s*no)?\\s*([0-9]+).*',
    sampleMsg: 'dear customer, icici bank acct xx624 debited with rs 1,500.00 on 08-sep-23 and account linked to mobile number xx2022 credited, imps:325116062689. call 18002662 for dispute or sms block 624 to 9215676766.',

    // Date Format
    dateFormat: 'dd-MMM-yyyy HH:mm:s',
    alternateDateFormat: '',
    processingWeight: '100',
    minAppVersion: 'Any Version',
    tag: 'test',

    // Transaction Data
    bankAcId: '1',
    amount: '2',
    amountNegative: false,
    date: '3',
    merchant: '4',
    txnNote: '5',
    balance: '-1',
    balanceNegative: false,
    location: '-1',

    // Additional Details
    arrears: '-1',
    outstanding: '-1',
    availLimit: '-1',
    creditLimit: '-1',
    generalPaymentType: '-1',
    city: '-1',

    // Biller Details
    billerAcId: '-1',
    billId: '-1',
    billDate: '-1',
    billPeriod: '-1',
    dueDate: '-1',
    minAmtDue: '-1',
    totAmtDue: '-1',

    // FD Details
    principalAmount: '-1',
    frequency: '-1',
    maturityDate: '-1',
    maturityAmount: '-1',
    rateOfInterest: '-1',

    // MF Details
    mfNav: '-1',
    mfUnits: '-1',
    mfArn: '-1',
    mfBalUnits: '-1',
    mfSchemeBal: '-1',

    // Order Details
    amountPaid: '-1',
    offerAmount: '-1',
    minPurchaseAmt: '-1',

    // Editor Comments and Processed Result
    onDemand: false,
    parentTemplateId: '',
    editorComments: 'Acct XX284 debited with INR 3,000.00 on 16-Apr-20 & Acct XX165 credited. IMPS: 010710592992. Call 18002662 for dispute or SMS BLOCK 284 to 9215676766\ndear customer, your a/c no. xxxxxxxx4677 is debited by rs. 21132.00 on 18-11-2023 18:30:02 by a/c linked to mobile xxxxx347195. (imps ref no 230961492748)\ndear customer, icici bank acct xx312 debited with rs 425.00 on 08-Jul-22 and account linked to mobile number xx7362',
    processedResult: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const FieldGroup = ({ title, children, cols = 2 }) => {
    const gridColsClass = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      5: 'md:grid-cols-5'
    }[cols] || 'md:grid-cols-2';

    return (
      <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm">
        {title && (
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b-2 border-secondary">
            {title}
          </h3>
        )}
        <div className={`grid grid-cols-1 ${gridColsClass} gap-4`}>
          {children}
        </div>
      </div>
    );
  };

  const InputField = ({ label, name, value, onChange, type = 'text', placeholder = '', className = '' }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${className}`}
      />
    </div>
  );

  const SelectField = ({ label, name, value, onChange, options, className = '' }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white ${className}`}
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  const TextAreaField = ({ label, name, value, onChange, rows = 4, className = '', highlight = false }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`px-4 py-2 border ${highlight ? 'border-tertiary border-2' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none ${className}`}
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
        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
      />
      <label className="ml-2 text-sm font-medium text-gray-700">{label}</label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">SMS Message Template Information</h1>

        {/* General Information */}
        <FieldGroup title="General Information" cols={3}>
          <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} />
          <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleInputChange} />
          <InputField label="Merchant Name" name="merchantName" value={formData.merchantName} onChange={handleInputChange} />
          <InputField label="Processed Txn Count" name="processedTxnCount" value={formData.processedTxnCount} onChange={handleInputChange} />
          <InputField label="Last Txn Date" name="lastTxnDate" value={formData.lastTxnDate} onChange={handleInputChange} />
        </FieldGroup>

        {/* Message Type */}
        <FieldGroup title="Message Type & Transaction Details" cols={3}>
          <SelectField
            label="Msg Type"
            name="msgType"
            value={formData.msgType}
            onChange={handleInputChange}
            options={['Debit Transaction', 'Credit Transaction', 'Balance Inquiry', 'Other']}
          />
          <SelectField
            label="Msg Subtype"
            name="msgSubtype"
            value={formData.msgSubtype}
            onChange={handleInputChange}
            options={['Expense', 'Income', 'Transfer', 'Other']}
          />
          <SelectField
            label="Txn Type"
            name="txnType"
            value={formData.txnType}
            onChange={handleInputChange}
            options={['Regular', 'Recurring', 'One-time']}
          />
          <SelectField
            label="Payment Type"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleInputChange}
            options={['IMPS', 'NEFT', 'RTGS', 'UPI', 'Card', 'Other']}
          />
          <SelectField
            label="Account Type"
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            options={['Bank', 'Wallet', 'Credit Card', 'Other']}
          />
          <SelectField
            label="Template Type"
            name="templateType"
            value={formData.templateType}
            onChange={handleInputChange}
            options={['Processed', 'Pending', 'Deprecated']}
          />
        </FieldGroup>

        {/* Features */}
        <FieldGroup title="Features" cols={5}>
          <CheckboxField label="Multiple Accounts" name="multipleAccounts" checked={formData.multipleAccounts} onChange={handleInputChange} />
          <CheckboxField label="Temporarily Deprecated" name="temporarilyDeprecated" checked={formData.temporarilyDeprecated} onChange={handleInputChange} />
          <CheckboxField label="Server Processed" name="serverProcessed" checked={formData.serverProcessed} onChange={handleInputChange} />
          <CheckboxField label="Process" name="process" checked={formData.process} onChange={handleInputChange} />
          <CheckboxField label="Ignore Msg" name="ignoreMsg" checked={formData.ignoreMsg} onChange={handleInputChange} />
        </FieldGroup>

        {/* Pattern and Sample Message */}
        <FieldGroup title="Pattern & Sample Message" cols={1}>
          <TextAreaField
            label="Pattern"
            name="pattern"
            value={formData.pattern}
            onChange={handleInputChange}
            rows={4}
            className="font-mono text-sm"
          />
          <TextAreaField
            label="Sample Msg"
            name="sampleMsg"
            value={formData.sampleMsg}
            onChange={handleInputChange}
            rows={4}
            highlight={true}
          />
        </FieldGroup>

        {/* Date Format */}
        <FieldGroup title="Date Format & Versioning" cols={3}>
          <InputField label="Date Format" name="dateFormat" value={formData.dateFormat} onChange={handleInputChange} />
          <InputField label="Alternate Date Format" name="alternateDateFormat" value={formData.alternateDateFormat} onChange={handleInputChange} />
          <InputField label="Processing Weight" name="processingWeight" value={formData.processingWeight} onChange={handleInputChange} />
          <SelectField
            label="Min App Version"
            name="minAppVersion"
            value={formData.minAppVersion}
            onChange={handleInputChange}
            options={['Any Version', '1.0.0', '1.1.0', '2.0.0']}
          />
          <InputField label="Tag" name="tag" value={formData.tag} onChange={handleInputChange} />
        </FieldGroup>

        {/* Transaction Data Fields */}
        <FieldGroup title="Transaction Data Fields" cols={4}>
          <InputField label="Bank A/C Id" name="bankAcId" value={formData.bankAcId} onChange={handleInputChange} className="w-full" />
          <div>
            <InputField label="Amount" name="amount" value={formData.amount} onChange={handleInputChange} className="w-full" />
            <CheckboxField label="Negative" name="amountNegative" checked={formData.amountNegative} onChange={handleInputChange} />
          </div>
          <InputField label="Date" name="date" value={formData.date} onChange={handleInputChange} className="w-full" />
          <InputField label="Merchant" name="merchant" value={formData.merchant} onChange={handleInputChange} className="w-full" />
          <InputField label="Txn Note" name="txnNote" value={formData.txnNote} onChange={handleInputChange} className="w-full" />
          <div>
            <InputField label="Balance" name="balance" value={formData.balance} onChange={handleInputChange} className="w-full" />
            <CheckboxField label="Negative" name="balanceNegative" checked={formData.balanceNegative} onChange={handleInputChange} />
          </div>
          <InputField label="Location" name="location" value={formData.location} onChange={handleInputChange} className="w-full" />
        </FieldGroup>

        {/* General Details */}
        <FieldGroup title="General Details" cols={3}>
          <InputField label="Arrears" name="arrears" value={formData.arrears} onChange={handleInputChange} />
          <InputField label="Outstanding" name="outstanding" value={formData.outstanding} onChange={handleInputChange} />
          <InputField label="Avail Limit" name="availLimit" value={formData.availLimit} onChange={handleInputChange} />
          <InputField label="Credit Limit" name="creditLimit" value={formData.creditLimit} onChange={handleInputChange} />
          <InputField label="Payment Type" name="generalPaymentType" value={formData.generalPaymentType} onChange={handleInputChange} />
          <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} />
        </FieldGroup>

        {/* Biller Details */}
        <FieldGroup title="Biller Details" cols={4}>
          <InputField label="Biller A/C Id" name="billerAcId" value={formData.billerAcId} onChange={handleInputChange} />
          <InputField label="Bill Id" name="billId" value={formData.billId} onChange={handleInputChange} />
          <InputField label="Bill Date" name="billDate" value={formData.billDate} onChange={handleInputChange} />
          <InputField label="Bill Period" name="billPeriod" value={formData.billPeriod} onChange={handleInputChange} />
          <InputField label="Due Date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} />
          <InputField label="Min Amt Due" name="minAmtDue" value={formData.minAmtDue} onChange={handleInputChange} />
          <InputField label="Tot Amt Due" name="totAmtDue" value={formData.totAmtDue} onChange={handleInputChange} />
        </FieldGroup>

        {/* FD Details */}
        <FieldGroup title="FD Details" cols={3}>
          <InputField label="Principal Amount" name="principalAmount" value={formData.principalAmount} onChange={handleInputChange} />
          <InputField label="Frequency" name="frequency" value={formData.frequency} onChange={handleInputChange} />
          <InputField label="Maturity Date" name="maturityDate" value={formData.maturityDate} onChange={handleInputChange} />
          <InputField label="Maturity Amount" name="maturityAmount" value={formData.maturityAmount} onChange={handleInputChange} />
          <InputField label="Rate Of Interest" name="rateOfInterest" value={formData.rateOfInterest} onChange={handleInputChange} />
        </FieldGroup>

        {/* MF Details */}
        <FieldGroup title="MF Details" cols={3}>
          <InputField label="MF Nav" name="mfNav" value={formData.mfNav} onChange={handleInputChange} />
          <InputField label="MF Units" name="mfUnits" value={formData.mfUnits} onChange={handleInputChange} />
          <InputField label="MF ARN" name="mfArn" value={formData.mfArn} onChange={handleInputChange} />
          <InputField label="MF Bal Units" name="mfBalUnits" value={formData.mfBalUnits} onChange={handleInputChange} />
          <InputField label="MF Scheme Bal" name="mfSchemeBal" value={formData.mfSchemeBal} onChange={handleInputChange} />
        </FieldGroup>

        {/* Order Details */}
        <FieldGroup title="Order Details" cols={3}>
          <InputField label="Amount Paid" name="amountPaid" value={formData.amountPaid} onChange={handleInputChange} />
          <InputField label="Offer Amount" name="offerAmount" value={formData.offerAmount} onChange={handleInputChange} />
          <InputField label="Min Purchase Amt" name="minPurchaseAmt" value={formData.minPurchaseAmt} onChange={handleInputChange} />
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

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-end mt-6">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SMSParser;
