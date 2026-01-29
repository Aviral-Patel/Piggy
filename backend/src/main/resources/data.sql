-- Insert patterns with bank_address and bank_name as direct fields
-- =============================================
-- Patterns for State Bank of India (SBI)
-- =============================================

-- SBI - FOOD patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\s+(?<accountNumber>\w+).*?(?<type>debited|spent|withdrawn)\s+by\s+(?<amount>[\d.]+).*?on date\s+(?<date>\d{1,2}\w{3}\d{2}).*?trf to\s+(?<merchant>ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY)(?:\s+[A-Z\s]*?)?(?=\s+Refno).*?Refno\s+(?<refNumber>\d+)',
     'Dear UPI user A/C X6292 debited by 350.00 on date 14Jan26 trf to SWIGGY Refno 871684140146 If not u? call-1800111109-SBI',
     'FOOD', 'APPROVED');

-- SBI - ENTERTAINMENT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\s+(?<accountNumber>\w+).*?(?<type>debited|spent|withdrawn)\s+by\s+(?<amount>[\d.]+).*?on date\s+(?<date>\d{1,2}\w{3}\d{2}).*?trf to\s+(?<merchant>NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV)(?:\s+[A-Z\s]*?)?(?=\s+Refno).*?Refno\s+(?<refNumber>\d+)',
     'Dear UPI user A/C X6292 debited by 199.00 on date 15Jan26 trf to NETFLIX Refno 871684140147 If not u? call-1800111109-SBI',
     'ENTERTAINMENT', 'APPROVED');

-- SBI - SHOPPING patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\s+(?<accountNumber>\w+).*?(?<type>debited|spent|withdrawn)\s+by\s+(?<amount>[\d.]+).*?on date\s+(?<date>\d{1,2}\w{3}\d{2}).*?trf to\s+(?<merchant>AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA)(?:\s+[A-Z\s]*?)?(?=\s+Refno).*?Refno\s+(?<refNumber>\d+)',
     'Dear UPI user A/C X6292 debited by 1500.00 on date 16Jan26 trf to AMAZON Refno 871684140148 If not u? call-1800111109-SBI',
     'SHOPPING', 'APPROVED');

-- SBI - TRANSPORT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\s+(?<accountNumber>\w+).*?(?<type>debited|spent|withdrawn)\s+by\s+(?<amount>[\d.]+).*?on date\s+(?<date>\d{1,2}\w{3}\d{2}).*?trf to\s+(?<merchant>UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC)(?:\s+[A-Z\s]*?)?(?=\s+Refno).*?Refno\s+(?<refNumber>\d+)',
     'Dear UPI user A/C X6292 debited by 250.00 on date 17Jan26 trf to UBER Refno 871684140149 If not u? call-1800111109-SBI',
     'TRANSPORT', 'APPROVED');

-- SBI - UTILITIES patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\s+(?<accountNumber>\w+).*?(?<type>debited|spent|withdrawn)\s+by\s+(?<amount>[\d.]+).*?on date\s+(?<date>\d{1,2}\w{3}\d{2}).*?trf to\s+(?<merchant>ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI)(?:\s+[A-Z\s]*?)?(?=\s+Refno).*?Refno\s+(?<refNumber>\d+)',
     'Dear UPI user A/C X6292 debited by 800.00 on date 18Jan26 trf to ELECTRICITY Refno 871684140150 If not u? call-1800111109-SBI',
     'UTILITIES', 'APPROVED');

-- SBI - OTHERS (DEBIT - fallback for non-specific merchants)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\s+(?<accountNumber>\w+).*?(?<type>debited|spent|withdrawn)\s+by\s+(?<amount>[\d.]+).*?on date\s+(?<date>\d{1,2}\w{3}\d{2}).*?trf to\s+(?<merchant>[A-Z][A-Z\s]+?)(?=\s+Refno).*?Refno\s+(?<refNumber>\d+)',
     'Dear UPI user A/C X6292 debited by 120.00 on date 14Jan26 trf to RAKESH L H Refno 871684140146 If not u? call-1800111109 for other services-18001234-SBI',
     'OTHERS', 'APPROVED');

-- SBI - Generic DEBIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+is\s+(?<type>debited|withdrawn|spent)\s+with\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{2}/\d{2}/\d{2}).*?UPI Ref\s+(?<refNumber>\d+)',
     'Dear Customer, your A/c X1234 is debited with INR 500.50 on 09/01/26. UPI Ref 667788.',
     'OTHERS', 'APPROVED');

-- SBI - Generic CREDIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+is\s+(?<type>credited|received)\s+with\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{2}/\d{2}/\d{2}).*?(?:from\s+(?<merchant>[\w\s]+).*?)?UPI Ref\s+(?<refNumber>\d+)',
     'Dear Customer, your A/c X1234 is credited with INR 500.50 on 09/01/26. UPI Ref 667788.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for HDFC Bank
-- =============================================

-- HDFC - FOOD patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+(?:is\s+)?(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-?\w{3}-?\d{2})(?:\s+via\s+UPI)?\s+(?:to|at)\s+(?<merchant>ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY)(?:\.\s+|\s+)(?:Avl Bal|Available Bal):\s+(?:INR|Rs\.?)\s+(?<balance>[\d,]+\.\d{2})(?:\.\s+|\s+)Ref(?:\s+No)?:\s+(?<refNumber>\d+)',
     'Alert: Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789',
     'FOOD', 'APPROVED');

-- HDFC - ENTERTAINMENT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+(?:is\s+)?(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-?\w{3}-?\d{2})(?:\s+via\s+UPI)?\s+(?:to|at)\s+(?<merchant>NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV)(?:\.\s+|\s+)(?:Avl Bal|Available Bal):\s+(?:INR|Rs\.?)\s+(?<balance>[\d,]+\.\d{2})(?:\.\s+|\s+)Ref(?:\s+No)?:\s+(?<refNumber>\d+)',
     'Alert: Your A/c XX5678 debited for INR 499.00 on 10-Jan-26 via UPI to NETFLIX. Avl Bal: INR 13,721.50. Ref No: 60123456791',
     'ENTERTAINMENT', 'APPROVED');

-- HDFC - SHOPPING patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+(?:is\s+)?(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-?\w{3}-?\d{2})(?:\s+via\s+UPI)?\s+(?:to|at)\s+(?<merchant>AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA)(?:\.\s+|\s+)(?:Avl Bal|Available Bal):\s+(?:INR|Rs\.?)\s+(?<balance>[\d,]+\.\d{2})(?:\.\s+|\s+)Ref(?:\s+No)?:\s+(?<refNumber>\d+)',
     'Alert: Your A/c XX5678 debited for INR 3,200.00 on 11-Jan-26 via UPI to AMAZON. Avl Bal: INR 10,521.50. Ref No: 60123456793',
     'SHOPPING', 'APPROVED');

-- HDFC - TRANSPORT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+(?:is\s+)?(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-?\w{3}-?\d{2})(?:\s+via\s+UPI)?\s+(?:to|at)\s+(?<merchant>UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC)(?:\.\s+|\s+)(?:Avl Bal|Available Bal):\s+(?:INR|Rs\.?)\s+(?<balance>[\d,]+\.\d{2})(?:\.\s+|\s+)Ref(?:\s+No)?:\s+(?<refNumber>\d+)',
     'Alert: Your A/c XX5678 debited for INR 450.00 on 12-Jan-26 via UPI to UBER. Avl Bal: INR 10,071.50. Ref No: 60123456794',
     'TRANSPORT', 'APPROVED');

-- HDFC - UTILITIES patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+(?:is\s+)?(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-?\w{3}-?\d{2})(?:\s+via\s+UPI)?\s+(?:to|at)\s+(?<merchant>ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI)(?:\.\s+|\s+)(?:Avl Bal|Available Bal):\s+(?:INR|Rs\.?)\s+(?<balance>[\d,]+\.\d{2})(?:\.\s+|\s+)Ref(?:\s+No)?:\s+(?<refNumber>\d+)',
     'Alert: Your A/c XX5678 debited for INR 999.00 on 13-Jan-26 via UPI to AIRTEL. Avl Bal: INR 9,072.50. Ref No: 60123456795',
     'UTILITIES', 'APPROVED');

-- HDFC - OTHERS (DEBIT - fallback)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+(?:is\s+)?(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-?\w{3}-?\d{2})(?:\s+via\s+UPI)?\s+(?:to|at)\s+(?<merchant>[A-Z][A-Z\s]+?)(?:\.\s+|\s+)(?:Avl Bal|Available Bal):\s+(?:INR|Rs\.?)\s+(?<balance>[\d,]+\.\d{2})(?:\.\s+|\s+)Ref(?:\s+No)?:\s+(?<refNumber>\d+)',
     'Alert: Your A/c XX5678 debited for INR 300.00 on 10-Jan-26 via UPI to UNKNOWN MERCHANT. Avl Bal: INR 13,421.50. Ref No: 60123456792',
     'OTHERS', 'APPROVED');

-- HDFC - CREDIT pattern (Generic)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\s+(?<accountNumber>\w+)\s+(?:is\s+)?(?<type>credited|received)\s+(?:with|by)\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-?\w{3}-?\d{2})(?:\s+via\s+UPI)?(?:\s+from\s+(?<merchant>[A-Z][A-Z\s]+?))?(?:\.\s+|\s+)(?:Avl Bal|Available Bal):\s+(?:INR|Rs\.?)\s+(?<balance>[\d,]+\.\d{2})(?:\.\s+|\s+)Ref(?:\s+No)?:\s+(?<refNumber>\d+)',
     'Alert: Your A/c XX5678 credited with INR 5,000.00 on 14-Jan-26 via UPI from SALARY ACCOUNT. Avl Bal: INR 18,421.50. Ref No: 60123456796',
     'OTHERS', 'APPROVED');

-- HDFC - Credit Card SHOPPING patterns (spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     'Credit Card\s+(?<accountNumber>\w+)\s+has been (?<type>spent|used|charged)\s+for\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+at\s+(?<merchant>AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Curr O/S:\s+INR\s+(?<balance>[\d,]+\.\d{2})',
     'Your HDFC Bank Credit Card XX4401 has been spent for INR 1,200.00 at AMAZON on 12-Jan-26. Curr O/S: INR 5,400.00.',
     'SHOPPING', 'APPROVED');

-- HDFC - Credit Card OTHERS patterns (spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     'Credit Card\s+(?<accountNumber>\w+)\s+has been (?<type>spent|used|charged)\s+for\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+at\s+(?<merchant>[A-Z\s]+)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Curr O/S:\s+INR\s+(?<balance>[\d,]+\.\d{2})',
     'Your HDFC Bank Credit Card XX4401 has been spent for INR 850.00 at SOME STORE on 13-Jan-26. Curr O/S: INR 6,250.00.',
     'OTHERS', 'APPROVED');

-- HDFC - Credit Card payment patterns (paid)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     'Credit Card\s+(?<accountNumber>\w+)\s+(?<type>paid|payment received)\s+(?:of|for)\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Curr O/S:\s+INR\s+(?<balance>[\d,]+\.\d{2})',
     'Your HDFC Bank Credit Card XX4401 paid for INR 5,000.00 on 14-Jan-26. Curr O/S: INR 1,250.00.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for ICICI Bank
-- =============================================

-- ICICI - FOOD patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\s+(?<accountNumber>\w+)\s+(?<type>debited|withdrawn|spent)\s+(?:with|for)\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY).*?(?:Total Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 425.00 on 15-Jan-26. Info: UPI-SWIGGY. Total Avl Bal: INR 12,575.00.',
     'FOOD', 'APPROVED');

-- ICICI - ENTERTAINMENT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\s+(?<accountNumber>\w+)\s+(?<type>debited|withdrawn|spent)\s+(?:with|for)\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV).*?(?:Total Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 199.00 on 16-Jan-26. Info: UPI-NETFLIX. Total Avl Bal: INR 12,376.00.',
     'ENTERTAINMENT', 'APPROVED');

-- ICICI - SHOPPING patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\s+(?<accountNumber>\w+)\s+(?<type>debited|withdrawn|spent)\s+(?:with|for)\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA).*?(?:Total Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 2,350.00 on 17-Jan-26. Info: UPI-AMAZON. Total Avl Bal: INR 10,026.00.',
     'SHOPPING', 'APPROVED');

-- ICICI - TRANSPORT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\s+(?<accountNumber>\w+)\s+(?<type>debited|withdrawn|spent)\s+(?:with|for)\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC).*?(?:Total Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 325.00 on 18-Jan-26. Info: UPI-UBER. Total Avl Bal: INR 9,701.00.',
     'TRANSPORT', 'APPROVED');

-- ICICI - UTILITIES patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\s+(?<accountNumber>\w+)\s+(?<type>debited|withdrawn|spent)\s+(?:with|for)\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI).*?(?:Total Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 1,200.00 on 19-Jan-26. Info: BBPS-ELECTRICITY. Total Avl Bal: INR 8,501.00.',
     'UTILITIES', 'APPROVED');

-- ICICI - OTHERS (DEBIT - fallback)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\s+(?<accountNumber>\w+)\s+(?<type>debited|withdrawn|spent)\s+(?:with|for)\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>[\w\-\s]+).*?(?:Total Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 5,000.00 on 20-Jan-26. Info: ATM-CASH WDL. Total Avl Bal: INR 3,501.00.',
     'OTHERS', 'APPROVED');

-- ICICI - CREDIT pattern (Generic)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\s+(?<accountNumber>\w+)\s+(?<type>credited|received)\s+(?:with|for)\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>[\w\-\s]+).*?(?:Total Avl Bal:\s+INR\s+(?<balance>[\d,]+\.\d{2}))?',
     'Dear Customer, your Acct XX101 credited with INR 50,000.00 on 01-Jan-26. Info: NEFT-Salary. Total Avl Bal: INR 62,000.00.',
     'OTHERS', 'APPROVED');

-- ICICI - Simple DEBIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+(?<type>debited|withdrawn|spent)\s+for\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>[\w\s]+)',
     'Your A/c XX5678 debited for INR 10,000.00 on 08-Jan-26. Info: CASH WDL.',
     'OTHERS', 'APPROVED');

-- ICICI - Simple CREDIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+(?<type>credited|received)\s+for\s+INR\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2}).*?Info:\s+(?<merchant>[\w\s]+)',
     'Your A/c XX5678 credited for INR 25,000.00 on 08-Jan-26. Info: SALARY TRANSFER.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Axis Bank
-- =============================================

-- Axis - FOOD patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+is\s+(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{4}-\d{2}-\d{2}|\d{1,2}-\w{3}-\d{2})\s+(?:via|by|to)\s+(?<merchant>ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY).*?(?:Available Bal:\s+Rs\.?\s+(?<balance>[\d,]+\.\d{2}))?',
     'Your A/c X9901 is debited for Rs 550.00 on 2026-01-10 via SWIGGY. Available Bal: Rs 8,450.00.',
     'FOOD', 'APPROVED');

-- Axis - ENTERTAINMENT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+is\s+(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{4}-\d{2}-\d{2}|\d{1,2}-\w{3}-\d{2})\s+(?:via|by|to)\s+(?<merchant>NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV).*?(?:Available Bal:\s+Rs\.?\s+(?<balance>[\d,]+\.\d{2}))?',
     'Your A/c X9901 is debited for Rs 649.00 on 2026-01-11 via SPOTIFY. Available Bal: Rs 7,801.00.',
     'ENTERTAINMENT', 'APPROVED');

-- Axis - SHOPPING patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+is\s+(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{4}-\d{2}-\d{2}|\d{1,2}-\w{3}-\d{2})\s+(?:via|by|to)\s+(?<merchant>AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA).*?(?:Available Bal:\s+Rs\.?\s+(?<balance>[\d,]+\.\d{2}))?',
     'Your A/c X9901 is debited for Rs 1,850.00 on 2026-01-12 via AMAZON. Available Bal: Rs 5,951.00.',
     'SHOPPING', 'APPROVED');

-- Axis - TRANSPORT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+is\s+(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{4}-\d{2}-\d{2}|\d{1,2}-\w{3}-\d{2})\s+(?:via|by|to)\s+(?<merchant>UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC).*?(?:Available Bal:\s+Rs\.?\s+(?<balance>[\d,]+\.\d{2}))?',
     'Your A/c X9901 is debited for Rs 275.00 on 2026-01-13 via UBER. Available Bal: Rs 5,676.00.',
     'TRANSPORT', 'APPROVED');

-- Axis - UTILITIES patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+is\s+(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{4}-\d{2}-\d{2}|\d{1,2}-\w{3}-\d{2})\s+(?:via|by|to)\s+(?<merchant>ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI).*?(?:Available Bal:\s+Rs\.?\s+(?<balance>[\d,]+\.\d{2}))?',
     'Your A/c X9901 is debited for Rs 899.00 on 2026-01-14 to JIO. Available Bal: Rs 4,777.00.',
     'UTILITIES', 'APPROVED');

-- Axis - OTHERS (DEBIT - fallback)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+is\s+(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{4}-\d{2}-\d{2}|\d{1,2}-\w{3}-\d{2})\s+(?:via|by|to)\s+(?<merchant>[\w\s]+?)(?:\.\s+|\s+)?(?:Available Bal:\s+Rs\.?\s+(?<balance>[\d,]+\.\d{2}))?',
     'Your A/c X9901 is debited for Rs 500.00 on 2026-01-05 by ATM. Available Bal: Rs 2,300.00.',
     'OTHERS', 'APPROVED');

-- Axis - CREDIT pattern (Generic)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+is\s+(?<type>credited|received)\s+(?:for|by|with)\s+Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{4}-\d{2}-\d{2}|\d{1,2}-\w{3}-\d{2})(?:\s+(?:via|by|from)\s+(?<merchant>[\w\s]+?))?(?:\.\s+|\s+)?(?:Available Bal:\s+Rs\.?\s+(?<balance>[\d,]+\.\d{2}))?',
     'Your A/c X9901 is credited for Rs 30,000.00 on 2026-01-15 via NEFT. Available Bal: Rs 34,777.00.',
     'OTHERS', 'APPROVED');

-- Axis - Low balance alert
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\s+(?<accountNumber>\w+)\s+has a Low Balance of\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})',
     'Your A/c XX5678 has a Low Balance of INR 450.00. Please top up to avoid charges.',
     NULL, 'APPROVED');

-- =============================================
-- Patterns for Kotak Bank
-- =============================================

-- Kotak - FOOD patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\s+of\s+Rs\.\s+(?<amount>[\d,]+\.\d{2})\s+on\s+.*?(?:Debit|Credit)\s+Card\s+(?<accountNumber>\w+)\s+at\s+(?<merchant>ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})',
     'Transaction of Rs. 475.00 on Kotak Bank Debit Card XX9123 at SWIGGY on 15-Jan-26.',
     'FOOD', 'APPROVED');

-- Kotak - ENTERTAINMENT patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\s+of\s+Rs\.\s+(?<amount>[\d,]+\.\d{2})\s+on\s+.*?(?:Debit|Credit)\s+Card\s+(?<accountNumber>\w+)\s+at\s+(?<merchant>NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})',
     'Transaction of Rs. 299.00 on Kotak Bank Debit Card XX9123 at NETFLIX on 11-Jan-26.',
     'ENTERTAINMENT', 'APPROVED');

-- Kotak - SHOPPING patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\s+of\s+Rs\.\s+(?<amount>[\d,]+\.\d{2})\s+on\s+.*?(?:Debit|Credit)\s+Card\s+(?<accountNumber>\w+)\s+at\s+(?<merchant>AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})',
     'Transaction of Rs. 2,599.00 on Kotak Bank Credit Card XX9124 at AMAZON on 16-Jan-26.',
     'SHOPPING', 'APPROVED');

-- Kotak - TRANSPORT patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\s+of\s+Rs\.\s+(?<amount>[\d,]+\.\d{2})\s+on\s+.*?(?:Debit|Credit)\s+Card\s+(?<accountNumber>\w+)\s+at\s+(?<merchant>UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})',
     'Transaction of Rs. 380.00 on Kotak Bank Debit Card XX9123 at UBER on 17-Jan-26.',
     'TRANSPORT', 'APPROVED');

-- Kotak - UTILITIES patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\s+of\s+Rs\.\s+(?<amount>[\d,]+\.\d{2})\s+on\s+.*?(?:Debit|Credit)\s+Card\s+(?<accountNumber>\w+)\s+at\s+(?<merchant>ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})',
     'Transaction of Rs. 749.00 on Kotak Bank Debit Card XX9123 at AIRTEL on 18-Jan-26.',
     'UTILITIES', 'APPROVED');

-- Kotak - OTHERS (Card transactions are DEBIT/spent - fallback)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\s+of\s+Rs\.\s+(?<amount>[\d,]+\.\d{2})\s+on\s+.*?(?:Debit|Credit)\s+Card\s+(?<accountNumber>\w+)\s+at\s+(?<merchant>[A-Z\s]+)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})',
     'Transaction of Rs. 1,200.00 on Kotak Bank Credit Card XX9124 at SOME MERCHANT on 19-Jan-26.',
     'OTHERS', 'APPROVED');

-- Kotak - UPI DEBIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+(?<type>debited|withdrawn|spent)\s+from\s+A/c\s+(?<accountNumber>\w+)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})\s+via\s+UPI.*?to\s+(?<merchant>[\w\s]+?)(?:\.\s+|\s+)Ref:\s+(?<refNumber>\d+)',
     'Rs 350.00 debited from A/c XX7890 on 20-Jan-26 via UPI to MERCHANT NAME. Ref: 123456789.',
     'OTHERS', 'APPROVED');

-- Kotak - UPI CREDIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?Rs\.?\s+(?<amount>[\d,]+\.\d{2})\s+(?<type>credited|received)\s+(?:to|in)\s+A/c\s+(?<accountNumber>\w+)\s+on\s+(?<date>\d{1,2}-\w{3}-\d{2})\s+via\s+UPI.*?from\s+(?<merchant>[\w\s]+?)(?:\.\s+|\s+)Ref:\s+(?<refNumber>\d+)',
     'Rs 2,500.00 credited to A/c XX7890 on 21-Jan-26 via UPI from SENDER NAME. Ref: 123456790.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Generic Banks
-- =============================================

-- Generic - Credit Card statement
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?Card ending\s+(?<accountNumber>\d+).*?Total Amt Due:\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2}).*?Due Date:\s+(?<date>\d{1,2}-\w{3}-\d{4})',
     'Statement for Card ending 1002. Total Amt Due: INR 12,450.00. Due Date: 25-Jan-2026.',
     'OTHERS', 'APPROVED');

-- Generic - Bill Payment patterns
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?Bill Payment of\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+successful for\s+(?<merchant>Electricity|Water|Gas|DTH|Broadband)[\w\s]*?\s+via\s+Acct\s+(?<accountNumber>\w+).*?Ref:\s+(?<refNumber>\d+)',
     'Bill Payment of INR 1,540.00 successful for Electricity Bill via Acct XX101. Ref: 992211.',
     'UTILITIES', 'APPROVED');

INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?Bill Payment of\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+successful for\s+(?<merchant>[\w\s]+?)\s+via\s+Acct\s+(?<accountNumber>\w+).*?Ref:\s+(?<refNumber>\d+)',
     'Bill Payment of INR 850.00 successful for Credit Card Bill via Acct XX101. Ref: 992212.',
     'OTHERS', 'APPROVED');

-- Generic - UPI DEBIT transaction pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+(?<type>debited|withdrawn|spent)\s+from\s+(?:A/c|Account)\s+(?<accountNumber>\w+).*?UPI.*?(?:ID|Ref):\s+(?<refNumber>\d+)',
     'INR 500.00 debited from Account XX8888 via UPI. Ref ID: 445566778899.',
     'OTHERS', 'APPROVED');

-- Generic - UPI CREDIT transaction pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+(?<type>credited|received)\s+(?:to|in)\s+(?:A/c|Account)\s+(?<accountNumber>\w+).*?UPI.*?(?:ID|Ref):\s+(?<refNumber>\d+)',
     'INR 5,000.00 credited to Account XX8888 via UPI. Ref ID: 445566778900.',
     'OTHERS', 'APPROVED');
