-- Insert patterns with bank_address and bank_name as direct fields
-- Patterns for SBI Bank
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, merchant_type, category, status) VALUES
('BZ-SBIINB', 'State Bank of India', 'A/C\s+(?<accountNumber>\w+).*?(?<type>debited|credited)\s+by\s+(?<amount>[\d.]+).*?on date\s+(?<date>\d{1,2}\w{3}\d{2}).*?trf to\s+(?<merchant>[A-Z][A-Z\s]+?)(?=\s+Refno).*?Refno\s+(?<refNumber>\d+).*?(?<bankName>\w+)$',
 'Dear UPI user A/C X6292 debited by 120.00 on date 14Jan26 trf to RAKESH L H Refno 871684140146 If not u? call-1800111109 for other services-18001234-SBI',
 'UPI', 'Transfer', 'APPROVED'),
('BZ-SBIINB', 'State Bank of India', 'A/c\s+(?<accountNumber>\w+)\s+is (?<type>credited|debited) with\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{2}/\d{2}/\d{2}).*?UPI Ref\s+(?<refNumber>\d+)',
 'Dear Customer, your A/c X1234 is credited with INR 500.50 on 09/01/26. UPI Ref 667788.',
 'UPI', 'Transfer', 'APPROVED');

-- Patterns for HDFC Bank
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, merchant_type, category, status) VALUES
('VM-HDFCBK', 'HDFC Bank', 'A/c\s+(?<accountNumber>\w+)\s+(?<type>debited|credited)\s+for\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?via UPI to\s+(?<merchant>[A-Z]+).*?Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2}).*?Ref No:\s+(?<refNumber>\d+)',
 'Your A/c XX1234 debited for INR 250.00 on 10-Jan-26 via UPI to SWIGGY. Avl Bal: INR 5,000.00. Ref No: 123456789.',
 'UPI', 'Expense', 'APPROVED'),
('VM-HDFCBK', 'HDFC Bank', 'Credit Card\s+(?<accountNumber>\w+)\s+has been (?<type>spent|paid) for\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+at\s+(?<merchant>[A-Z]+)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Curr O/S:\s+INR\s+(?<balance>[\d,]+\.\d{2})',
 'Your HDFC Bank Credit Card XX4401 has been spent for INR 1,200.00 at AMAZON on 12-Jan-26. Curr O/S: INR 5,400.00.',
 'Credit Card', 'Expense', 'APPROVED');

-- Patterns for ICICI Bank
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, merchant_type, category, status) VALUES
('AX-ICICIB', 'ICICI Bank', 'Acct\s+(?<accountNumber>\w+)\s+(?<type>credited|debited)\s+with\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>[\w\-]+).*?Total Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2})',
 'Dear Customer, your Acct XX101 credited with INR 50,000.00 on 01-Jan-26. Info: NEFT-Salary. Total Avl Bal: INR 62,000.00.',
 'NEFT', 'Income', 'APPROVED'),
('AX-ICICIB', 'ICICI Bank', 'A/c\s+(?<accountNumber>\w+)\s+(?<type>debited|credited)\s+for\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>[\w\s]+)',
 'Your A/c XX5678 debited for INR 10,000.00 on 08-Jan-26. Info: CASH WDL.',
 'Cash', 'Withdrawal', 'APPROVED');

-- Patterns for Axis Bank
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, merchant_type, category, status) VALUES
('JD-AXISBK', 'Axis Bank', 'A/c\s+(?<accountNumber>\w+)\s+is (?<type>debited|credited) for\s+Rs\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{4}-\d{2}-\d{2})\s+by\s+(?<merchant>\w+).*?Available Bal:\s+Rs\s+(?<balance>[\d,]+\.\d{2})',
 'Your A/c X9901 is debited for Rs 500.00 on 2026-01-05 by ATM. Available Bal: Rs 2,300.00.',
 'ATM', 'Withdrawal', 'APPROVED'),
('JD-AXISBK', 'Axis Bank', 'A/c\s+(?<accountNumber>\w+)\s+has a Low Balance of\s+INR\s+(?<amount>[\d,]+\.\d{2})',
 'Your A/c XX5678 has a Low Balance of INR 450.00. Please top up to avoid charges.',
 NULL, 'Alert', 'APPROVED');

-- Patterns for Kotak Bank
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, merchant_type, category, status) VALUES
('KM-KOTAKB', 'Kotak Bank', 'Transaction of\s+Rs\.\s+(?<amount>[\d,]+\.\d{2})\s+on\s+.*?Debit Card\s+(?<accountNumber>\w+)\s+at\s+(?<merchant>[A-Z]+)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})',
 'Transaction of Rs. 299.00 on Kotak Bank Debit Card XX9123 at NETFLIX on 11-Jan-26.',
 'Debit Card', 'Expense', 'APPROVED');

-- Patterns for Generic Banks
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, merchant_type, category, status) VALUES
('GENERIC', 'Generic Bank', 'Card ending\s+(?<accountNumber>\d+).*?Total Amt Due:\s+INR\s+(?<amount>[\d,]+\.\d{2}).*?Due Date:\s+(?<date>\d{1,2}-\w{3}-\d{4})',
 'Statement for Card ending 1002. Total Amt Due: INR 12,450.00. Due Date: 25-Jan-2026.',
 'Credit Card', 'Statement', 'APPROVED'),
('GENERIC', 'Generic Bank', 'Bill Payment of\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+successful for\s+(?<merchant>[\w\s]+?)\s+via\s+Acct\s+(?<accountNumber>\w+).*?Ref:\s+(?<refNumber>\d+)',
 'Bill Payment of INR 1,540.00 successful for Electricity Bill via Acct XX101. Ref: 992211.',
 'Bill Payment', 'Utility', 'APPROVED');
