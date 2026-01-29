-- Insert patterns with bank_address and bank_name as direct fields
-- MySQL compatible version: All backslashes are doubled (\\) for proper storage
-- =============================================
-- Patterns for State Bank of India (SBI)
-- =============================================

-- SBI - FOOD patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\\s+(?<accountNumber>\\w+).*?(?<type>debited|spent|withdrawn)\\s+by\\s+(?<amount>[\\d.]+).*?on date\\s+(?<date>\\d{1,2}\\w{3}\\d{2}).*?trf to\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY))(?:\\s+[A-Z\\s]*?)?(?=\\s+Refno).*?Refno\\s+(?<refNumber>\\d+)',
     'Dear UPI user A/C X6292 debited by 350.00 on date 14Jan26 trf to SWIGGY Refno 871684140146 If not u? call-1800111109-SBI',
     'FOOD', 'APPROVED');

-- SBI - ENTERTAINMENT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\\s+(?<accountNumber>\\w+).*?(?<type>debited|spent|withdrawn)\\s+by\\s+(?<amount>[\\d.]+).*?on date\\s+(?<date>\\d{1,2}\\w{3}\\d{2}).*?trf to\\s+(?<merchant>(?:UPI-|BBPS-)?(?:NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV))(?:\\s+[A-Z\\s]*?)?(?=\\s+Refno).*?Refno\\s+(?<refNumber>\\d+)',
     'Dear UPI user A/C X6292 debited by 199.00 on date 15Jan26 trf to NETFLIX Refno 871684140147 If not u? call-1800111109-SBI',
     'ENTERTAINMENT', 'APPROVED');

-- SBI - SHOPPING patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\\s+(?<accountNumber>\\w+).*?(?<type>debited|spent|withdrawn)\\s+by\\s+(?<amount>[\\d.]+).*?on date\\s+(?<date>\\d{1,2}\\w{3}\\d{2}).*?trf to\\s+(?<merchant>(?:UPI-|BBPS-)?(?:AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA))(?:\\s+[A-Z\\s]*?)?(?=\\s+Refno).*?Refno\\s+(?<refNumber>\\d+)',
     'Dear UPI user A/C X6292 debited by 1500.00 on date 16Jan26 trf to AMAZON Refno 871684140148 If not u? call-1800111109-SBI',
     'SHOPPING', 'APPROVED');

-- SBI - TRANSPORT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\\s+(?<accountNumber>\\w+).*?(?<type>debited|spent|withdrawn)\\s+by\\s+(?<amount>[\\d.]+).*?on date\\s+(?<date>\\d{1,2}\\w{3}\\d{2}).*?trf to\\s+(?<merchant>(?:UPI-|BBPS-)?(?:UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC))(?:\\s+[A-Z\\s]*?)?(?=\\s+Refno).*?Refno\\s+(?<refNumber>\\d+)',
     'Dear UPI user A/C X6292 debited by 250.00 on date 17Jan26 trf to UBER Refno 871684140149 If not u? call-1800111109-SBI',
     'TRANSPORT', 'APPROVED');

-- SBI - UTILITIES patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\\s+(?<accountNumber>\\w+).*?(?<type>debited|spent|withdrawn)\\s+by\\s+(?<amount>[\\d.]+).*?on date\\s+(?<date>\\d{1,2}\\w{3}\\d{2}).*?trf to\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI))(?:\\s+[A-Z\\s]*?)?(?=\\s+Refno).*?Refno\\s+(?<refNumber>\\d+)',
     'Dear UPI user A/C X6292 debited by 800.00 on date 18Jan26 trf to ELECTRICITY Refno 871684140150 If not u? call-1800111109-SBI',
     'UTILITIES', 'APPROVED');

-- SBI - OTHERS (DEBIT - fallback for non-specific merchants)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?C\\s+(?<accountNumber>\\w+).*?(?<type>debited|spent|withdrawn)\\s+by\\s+(?<amount>[\\d.]+).*?on date\\s+(?<date>\\d{1,2}\\w{3}\\d{2}).*?trf to\\s+(?<merchant>[A-Z][A-Z\\s]+?)(?=\\s+Refno).*?Refno\\s+(?<refNumber>\\d+)',
     'Dear UPI user A/C X6292 debited by 120.00 on date 14Jan26 trf to RAKESH L H Refno 871684140146 If not u? call-1800111109 for other services-18001234-SBI',
     'OTHERS', 'APPROVED');

-- SBI - Generic DEBIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>debited|withdrawn|spent)\\s+with\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{2}/\\d{2}/\\d{2}).*?UPI Ref\\s+(?<refNumber>\\d+)',
     'Dear Customer, your A/c X1234 is debited with INR 500.50 on 09/01/26. UPI Ref 667788.',
     'OTHERS', 'APPROVED');

-- SBI - Generic CREDIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BZ-SBIINB', 'State Bank of India',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>credited|received)\\s+with\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{2}/\\d{2}/\\d{2}).*?(?:from\\s+(?<merchant>[\\w\\s]+).*?)?UPI Ref\\s+(?<refNumber>\\d+)',
     'Dear Customer, your A/c X1234 is credited with INR 500.50 on 09/01/26. UPI Ref 667788.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for HDFC Bank
-- =============================================

-- HDFC - FOOD patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+(?:is\\s+)?(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-?\\w{3}-?\\d{2})(?:\\s+via\\s+UPI)?\\s+(?:to|at)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY))(?:\\.\\s+|\\s+)(?:Avl Bal|Available Bal):\\s+(?:INR|Rs\\.?)\\s+(?<balance>[\\d,]+\\.\\d{2})(?:\\.\\s+|\\s+)Ref(?:\\s+No)?:\\s+(?<refNumber>\\d+)',
     'Alert: Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789',
     'FOOD', 'APPROVED');

-- HDFC - ENTERTAINMENT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+(?:is\\s+)?(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-?\\w{3}-?\\d{2})(?:\\s+via\\s+UPI)?\\s+(?:to|at)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV))(?:\\.\\s+|\\s+)(?:Avl Bal|Available Bal):\\s+(?:INR|Rs\\.?)\\s+(?<balance>[\\d,]+\\.\\d{2})(?:\\.\\s+|\\s+)Ref(?:\\s+No)?:\\s+(?<refNumber>\\d+)',
     'Alert: Your A/c XX5678 debited for INR 499.00 on 10-Jan-26 via UPI to NETFLIX. Avl Bal: INR 13,721.50. Ref No: 60123456791',
     'ENTERTAINMENT', 'APPROVED');

-- HDFC - SHOPPING patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+(?:is\\s+)?(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-?\\w{3}-?\\d{2})(?:\\s+via\\s+UPI)?\\s+(?:to|at)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA))(?:\\.\\s+|\\s+)(?:Avl Bal|Available Bal):\\s+(?:INR|Rs\\.?)\\s+(?<balance>[\\d,]+\\.\\d{2})(?:\\.\\s+|\\s+)Ref(?:\\s+No)?:\\s+(?<refNumber>\\d+)',
     'Alert: Your A/c XX5678 debited for INR 3,200.00 on 11-Jan-26 via UPI to AMAZON. Avl Bal: INR 10,521.50. Ref No: 60123456793',
     'SHOPPING', 'APPROVED');

-- HDFC - TRANSPORT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+(?:is\\s+)?(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-?\\w{3}-?\\d{2})(?:\\s+via\\s+UPI)?\\s+(?:to|at)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC))(?:\\.\\s+|\\s+)(?:Avl Bal|Available Bal):\\s+(?:INR|Rs\\.?)\\s+(?<balance>[\\d,]+\\.\\d{2})(?:\\.\\s+|\\s+)Ref(?:\\s+No)?:\\s+(?<refNumber>\\d+)',
     'Alert: Your A/c XX5678 debited for INR 450.00 on 12-Jan-26 via UPI to UBER. Avl Bal: INR 10,071.50. Ref No: 60123456794',
     'TRANSPORT', 'APPROVED');

-- HDFC - UTILITIES patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+(?:is\\s+)?(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-?\\w{3}-?\\d{2})(?:\\s+via\\s+UPI)?\\s+(?:to|at)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI))(?:\\.\\s+|\\s+)(?:Avl Bal|Available Bal):\\s+(?:INR|Rs\\.?)\\s+(?<balance>[\\d,]+\\.\\d{2})(?:\\.\\s+|\\s+)Ref(?:\\s+No)?:\\s+(?<refNumber>\\d+)',
     'Alert: Your A/c XX5678 debited for INR 999.00 on 13-Jan-26 via UPI to AIRTEL. Avl Bal: INR 9,072.50. Ref No: 60123456795',
     'UTILITIES', 'APPROVED');

-- HDFC - OTHERS (DEBIT - fallback)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+(?:is\\s+)?(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-?\\w{3}-?\\d{2})(?:\\s+via\\s+UPI)?\\s+(?:to|at)\\s+(?<merchant>[A-Z][A-Z\\s]+?)(?:\\.\\s+|\\s+)(?:Avl Bal|Available Bal):\\s+(?:INR|Rs\\.?)\\s+(?<balance>[\\d,]+\\.\\d{2})(?:\\.\\s+|\\s+)Ref(?:\\s+No)?:\\s+(?<refNumber>\\d+)',
     'Alert: Your A/c XX5678 debited for INR 300.00 on 10-Jan-26 via UPI to UNKNOWN MERCHANT. Avl Bal: INR 13,421.50. Ref No: 60123456792',
     'OTHERS', 'APPROVED');

-- HDFC - CREDIT pattern (Generic)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?A/?c\\s+(?<accountNumber>\\w+)\\s+(?:is\\s+)?(?<type>credited|received)\\s+(?:with|by)\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-?\\w{3}-?\\d{2})(?:\\s+via\\s+UPI)?(?:\\s+from\\s+(?<merchant>[A-Z][A-Z\\s]+?))?(?:\\.\\s+|\\s+)(?:Avl Bal|Available Bal):\\s+(?:INR|Rs\\.?)\\s+(?<balance>[\\d,]+\\.\\d{2})(?:\\.\\s+|\\s+)Ref(?:\\s+No)?:\\s+(?<refNumber>\\d+)',
     'Alert: Your A/c XX5678 credited with INR 5,000.00 on 14-Jan-26 via UPI from SALARY ACCOUNT. Avl Bal: INR 18,421.50. Ref No: 60123456796',
     'OTHERS', 'APPROVED');

-- HDFC - Credit Card SHOPPING patterns (spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     'Credit Card\\s+(?<accountNumber>\\w+)\\s+has been (?<type>spent|used|charged)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+at\\s+(?<merchant>AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA)\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Curr O/S:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2})',
     'Your HDFC Bank Credit Card XX4401 has been spent for INR 1,200.00 at AMAZON on 12-Jan-26. Curr O/S: INR 5,400.00.',
     'SHOPPING', 'APPROVED');

-- HDFC - Credit Card OTHERS patterns (spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     'Credit Card\\s+(?<accountNumber>\\w+)\\s+has been (?<type>spent|used|charged)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+at\\s+(?<merchant>[A-Z\\s]+)\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Curr O/S:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2})',
     'Your HDFC Bank Credit Card XX4401 has been spent for INR 850.00 at SOME STORE on 13-Jan-26. Curr O/S: INR 6,250.00.',
     'OTHERS', 'APPROVED');

-- HDFC - Credit Card payment patterns (paid)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     'Credit Card\\s+(?<accountNumber>\\w+)\\s+(?<type>paid|payment received)\\s+(?:of|for)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Curr O/S:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2})',
     'Your HDFC Bank Credit Card XX4401 paid for INR 5,000.00 on 14-Jan-26. Curr O/S: INR 1,250.00.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for ICICI Bank
-- =============================================

-- ICICI - FOOD patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|withdrawn|spent)\\s+(?:with|for)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY))(?:.*?Total Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 425.00 on 15-Jan-26. Info: UPI-SWIGGY. Total Avl Bal: INR 12,575.00.',
     'FOOD', 'APPROVED');

-- ICICI - ENTERTAINMENT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|withdrawn|spent)\\s+(?:with|for)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>(?:UPI-|BBPS-)?(?:NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV))(?:.*?Total Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 199.00 on 16-Jan-26. Info: UPI-NETFLIX. Total Avl Bal: INR 12,376.00.',
     'ENTERTAINMENT', 'APPROVED');

-- ICICI - SHOPPING patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|withdrawn|spent)\\s+(?:with|for)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>(?:UPI-|BBPS-)?(?:AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA))(?:.*?Total Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 2,350.00 on 17-Jan-26. Info: UPI-AMAZON. Total Avl Bal: INR 10,026.00.',
     'SHOPPING', 'APPROVED');

-- ICICI - TRANSPORT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|withdrawn|spent)\\s+(?:with|for)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>(?:UPI-|BBPS-)?(?:UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC))(?:.*?Total Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 325.00 on 18-Jan-26. Info: UPI-UBER. Total Avl Bal: INR 9,701.00.',
     'TRANSPORT', 'APPROVED');

-- ICICI - UTILITIES patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|withdrawn|spent)\\s+(?:with|for)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI))(?:.*?Total Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 1,200.00 on 19-Jan-26. Info: BBPS-ELECTRICITY. Total Avl Bal: INR 8,501.00.',
     'UTILITIES', 'APPROVED');

-- ICICI - OTHERS (DEBIT - fallback for non-categorized merchants)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|withdrawn|spent)\\s+(?:with|for)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>(?:UPI-|BBPS-|NEFT-|IMPS-|ATM-)?[\\w\\-\\s]+?)(?:\\.\\s+Total Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Dear Customer, your Acct XX101 debited with INR 5,000.00 on 20-Jan-26. Info: ATM-CASH WDL. Total Avl Bal: INR 3,501.00.',
     'OTHERS', 'APPROVED');

-- ICICI - CREDIT pattern (Generic)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>credited|received)\\s+(?:with|for)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>(?:UPI-|BBPS-|NEFT-|IMPS-)?[\\w\\-\\s]+?)(?:\\.\\s+Total Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Dear Customer, your Acct XX101 credited with INR 50,000.00 on 01-Jan-26. Info: NEFT-Salary. Total Avl Bal: INR 62,000.00.',
     'OTHERS', 'APPROVED');

-- ICICI - Simple DEBIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|withdrawn|spent)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>[\\w\\-\\s]+)',
     'Your A/c XX5678 debited for INR 10,000.00 on 08-Jan-26. Info: CASH WDL.',
     'OTHERS', 'APPROVED');

-- ICICI - Simple CREDIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AX-ICICIB', 'ICICI Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+(?<type>credited|received)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>[\\w\\-\\s]+)',
     'Your A/c XX5678 credited for INR 25,000.00 on 08-Jan-26. Info: SALARY TRANSFER.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Axis Bank
-- =============================================

-- Axis - FOOD patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{4}-\\d{2}-\\d{2}|\\d{1,2}-\\w{3}-\\d{2})\\s+(?:via|by|to)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY))(?:.*?Available Bal:\\s+Rs\\.?\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Your A/c X9901 is debited for Rs 550.00 on 2026-01-10 via SWIGGY. Available Bal: Rs 8,450.00.',
     'FOOD', 'APPROVED');

-- Axis - ENTERTAINMENT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{4}-\\d{2}-\\d{2}|\\d{1,2}-\\w{3}-\\d{2})\\s+(?:via|by|to)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV))(?:.*?Available Bal:\\s+Rs\\.?\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Your A/c X9901 is debited for Rs 649.00 on 2026-01-11 via SPOTIFY. Available Bal: Rs 7,801.00.',
     'ENTERTAINMENT', 'APPROVED');

-- Axis - SHOPPING patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{4}-\\d{2}-\\d{2}|\\d{1,2}-\\w{3}-\\d{2})\\s+(?:via|by|to)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA))(?:.*?Available Bal:\\s+Rs\\.?\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Your A/c X9901 is debited for Rs 1,850.00 on 2026-01-12 via AMAZON. Available Bal: Rs 5,951.00.',
     'SHOPPING', 'APPROVED');

-- Axis - TRANSPORT patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{4}-\\d{2}-\\d{2}|\\d{1,2}-\\w{3}-\\d{2})\\s+(?:via|by|to)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC))(?:.*?Available Bal:\\s+Rs\\.?\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Your A/c X9901 is debited for Rs 275.00 on 2026-01-13 via UBER. Available Bal: Rs 5,676.00.',
     'TRANSPORT', 'APPROVED');

-- Axis - UTILITIES patterns (DEBIT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{4}-\\d{2}-\\d{2}|\\d{1,2}-\\w{3}-\\d{2})\\s+(?:via|by|to)\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI))(?:.*?Available Bal:\\s+Rs\\.?\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Your A/c X9901 is debited for Rs 899.00 on 2026-01-14 to JIO. Available Bal: Rs 4,777.00.',
     'UTILITIES', 'APPROVED');

-- Axis - OTHERS (DEBIT - fallback)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>debited|withdrawn|spent)\\s+(?:for|by)\\s+Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{4}-\\d{2}-\\d{2}|\\d{1,2}-\\w{3}-\\d{2})\\s+(?:via|by|to)\\s+(?<merchant>[\\w\\s]+?)(?:\\.\\s+|\\s+)?(?:Available Bal:\\s+Rs\\.?\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Your A/c X9901 is debited for Rs 500.00 on 2026-01-05 by ATM. Available Bal: Rs 2,300.00.',
     'OTHERS', 'APPROVED');

-- Axis - CREDIT pattern (Generic)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>credited|received)\\s+(?:for|by|with)\\s+Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{4}-\\d{2}-\\d{2}|\\d{1,2}-\\w{3}-\\d{2})(?:\\s+(?:via|by|from)\\s+(?<merchant>[\\w\\s]+?))?(?:\\.\\s+|\\s+)?(?:Available Bal:\\s+Rs\\.?\\s+(?<balance>[\\d,]+\\.\\d{2}))?',
     'Your A/c X9901 is credited for Rs 30,000.00 on 2026-01-15 via NEFT. Available Bal: Rs 34,777.00.',
     'OTHERS', 'APPROVED');

-- Axis - Low balance alert
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JD-AXISBK', 'Axis Bank',
     '.*?A/c\\s+(?<accountNumber>\\w+)\\s+has a Low Balance of\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})',
     'Your A/c XX5678 has a Low Balance of INR 450.00. Please top up to avoid charges.',
     NULL, 'APPROVED');

-- =============================================
-- Patterns for Kotak Bank
-- =============================================

-- Kotak - FOOD patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\\s+of\\s+Rs\\.\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+.*?(?:Debit|Credit)\\s+Card\\s+(?<accountNumber>\\w+)\\s+at\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY))\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})',
     'Transaction of Rs. 475.00 on Kotak Bank Debit Card XX9123 at SWIGGY on 15-Jan-26.',
     'FOOD', 'APPROVED');

-- Kotak - ENTERTAINMENT patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\\s+of\\s+Rs\\.\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+.*?(?:Debit|Credit)\\s+Card\\s+(?<accountNumber>\\w+)\\s+at\\s+(?<merchant>(?:UPI-|BBPS-)?(?:NETFLIX|PRIME VIDEO|HOTSTAR|DISNEY|SPOTIFY|APPLE MUSIC|BOOKMYSHOW|PAYTM MOVIES|YOUTUBE|SONY LIV))\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})',
     'Transaction of Rs. 299.00 on Kotak Bank Debit Card XX9123 at NETFLIX on 11-Jan-26.',
     'ENTERTAINMENT', 'APPROVED');

-- Kotak - SHOPPING patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\\s+of\\s+Rs\\.\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+.*?(?:Debit|Credit)\\s+Card\\s+(?<accountNumber>\\w+)\\s+at\\s+(?<merchant>(?:UPI-|BBPS-)?(?:AMAZON|FLIPKART|MYNTRA|AJIO|MEESHO|NYKAA|RELIANCE DIGITAL|CROMA))\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})',
     'Transaction of Rs. 2,599.00 on Kotak Bank Credit Card XX9124 at AMAZON on 16-Jan-26.',
     'SHOPPING', 'APPROVED');

-- Kotak - TRANSPORT patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\\s+of\\s+Rs\\.\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+.*?(?:Debit|Credit)\\s+Card\\s+(?<accountNumber>\\w+)\\s+at\\s+(?<merchant>(?:UPI-|BBPS-)?(?:UBER|OLA|RAPIDO|NAMMA YATRI|METRO|PAYTM FASTAG|IRCTC))\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})',
     'Transaction of Rs. 380.00 on Kotak Bank Debit Card XX9123 at UBER on 17-Jan-26.',
     'TRANSPORT', 'APPROVED');

-- Kotak - UTILITIES patterns (Card transactions are DEBIT/spent)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\\s+of\\s+Rs\\.\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+.*?(?:Debit|Credit)\\s+Card\\s+(?<accountNumber>\\w+)\\s+at\\s+(?<merchant>(?:UPI-|BBPS-)?(?:ELECTRICITY|WATER|GAS|MOBILE RECHARGE|DTH|BROADBAND|BSNL|AIRTEL|JIO|VI))\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})',
     'Transaction of Rs. 749.00 on Kotak Bank Debit Card XX9123 at AIRTEL on 18-Jan-26.',
     'UTILITIES', 'APPROVED');

-- Kotak - OTHERS (Card transactions are DEBIT/spent - fallback)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?(?<type>Transaction)\\s+of\\s+Rs\\.\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+.*?(?:Debit|Credit)\\s+Card\\s+(?<accountNumber>\\w+)\\s+at\\s+(?<merchant>[\\w\\-\\s]+)\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})',
     'Transaction of Rs. 1,200.00 on Kotak Bank Credit Card XX9124 at SOME MERCHANT on 19-Jan-26.',
     'OTHERS', 'APPROVED');

-- Kotak - UPI DEBIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+(?<type>debited|withdrawn|spent)\\s+from\\s+A/c\\s+(?<accountNumber>\\w+)\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})\\s+via\\s+UPI.*?to\\s+(?<merchant>[\\w\\-\\s]+?)(?:\\.\\s+|\\s+)Ref:\\s+(?<refNumber>\\d+)',
     'Rs 350.00 debited from A/c XX7890 on 20-Jan-26 via UPI to MERCHANT NAME. Ref: 123456789.',
     'OTHERS', 'APPROVED');

-- Kotak - UPI CREDIT pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KM-KOTAKB', 'Kotak Bank',
     '.*?Rs\\.?\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+(?<type>credited|received)\\s+(?:to|in)\\s+A/c\\s+(?<accountNumber>\\w+)\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})\\s+via\\s+UPI.*?from\\s+(?<merchant>[\\w\\-\\s]+?)(?:\\.\\s+|\\s+)Ref:\\s+(?<refNumber>\\d+)',
     'Rs 2,500.00 credited to A/c XX7890 on 21-Jan-26 via UPI from SENDER NAME. Ref: 123456790.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Generic Banks
-- =============================================

-- Generic - Credit Card statement
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?Card ending\\s+(?<accountNumber>\\d+).*?Total Amt Due:\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2}).*?Due Date:\\s+(?<date>\\d{1,2}-\\w{3}-\\d{4})',
     'Statement for Card ending 1002. Total Amt Due: INR 12,450.00. Due Date: 25-Jan-2026.',
     'OTHERS', 'APPROVED');

-- Generic - Bill Payment patterns
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?Bill Payment of\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+successful for\\s+(?<merchant>Electricity|Water|Gas|DTH|Broadband)[\\w\\s]*?\\s+via\\s+Acct\\s+(?<accountNumber>\\w+).*?Ref:\\s+(?<refNumber>\\d+)',
     'Bill Payment of INR 1,540.00 successful for Electricity Bill via Acct XX101. Ref: 992211.',
     'UTILITIES', 'APPROVED');

INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?Bill Payment of\\s+(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+successful for\\s+(?<merchant>[\\w\\s]+?)\\s+via\\s+Acct\\s+(?<accountNumber>\\w+).*?Ref:\\s+(?<refNumber>\\d+)',
     'Bill Payment of INR 850.00 successful for Credit Card Bill via Acct XX101. Ref: 992212.',
     'OTHERS', 'APPROVED');

-- Generic - UPI DEBIT transaction pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+(?<type>debited|withdrawn|spent)\\s+from\\s+(?:A/c|Account)\\s+(?<accountNumber>\\w+).*?UPI.*?(?:ID|Ref):\\s+(?<refNumber>\\d+)',
     'INR 500.00 debited from Account XX8888 via UPI. Ref ID: 445566778899.',
     'OTHERS', 'APPROVED');

-- Generic - UPI CREDIT transaction pattern
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('GENERIC', 'Generic Bank',
     '.*?(?:INR|Rs\\.?)\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+(?<type>credited|received)\\s+(?:to|in)\\s+(?:A/c|Account)\\s+(?<accountNumber>\\w+).*?UPI.*?(?:ID|Ref):\\s+(?<refNumber>\\d+)',
     'INR 5,000.00 credited to Account XX8888 via UPI. Ref ID: 445566778900.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Punjab National Bank (PNB)
-- =============================================

-- PNB - Loan installment due notification (Auto-detected as REMINDER)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('PNBSMS', 'Punjab National Bank',
     '.*?Installment of Rs\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+in loan A/c No\\s+(?<accountNumber>\\w+)\\s+is falling due on\\s+(?<date>\\d{2}-\\d{2}-\\d{4}).*?Total Amt\\.\\s+due\\s+[\\d,]+\\.\\d{2}',
     'Installment of Rs 8430.93 in loan A/c No XXXXXB00491911 is falling due on 31-01-2026.Total Amt. due 8430.93.Pl ignoreif deposited UPDATE YOUR EMAILID IN ACCOUNT-PNB',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Tata Mutual Fund
-- =============================================

-- TATAMF - SIP purchase successful (DEBIT - investment)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('TATAMF', 'Tata Mutual Fund',
     '.*?Your Purchase SIP in folio\\s+(?<accountNumber>[\\d/]+)\\s+in scheme\\s+(?<merchant>[\\w\\s]+?)\\s+for Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+for\\s+[\\d.]+\\s+units.*?dated\\s+(?<date>\\d{1,2}-\\w{3}-\\d{4})\\s+is successful',
     'Your Purchase SIP in folio 11930104/69 in scheme Tata Small Cap Fund Reg Pl Gr for Rs.199.99 for 5.599 units at NAV of Rs.35.7187 dated 14-Jan-2026 is successful with applicable load. Click link to view statement.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Federal Bank
-- =============================================

-- FEDBNK - Cash deposit CREDIT
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('FEDBNK', 'Federal Bank',
     '.*?Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+(?<type>credited|received)\\s+in your A/c\\s+(?<accountNumber>\\w+)\\s+on\\s+(?<date>\\d{1,2}\\w{3}\\d{4})\\s+\\d{2}:\\d{2}:\\d{2}\\s+using cash deposit machine.*?Current Bal:\\s+Rs\\.(?<balance>[\\d,]+\\.\\d{2})',
     'Hi, Rs.2000 credited in your A/c XX7847 on 18JAN2026 14:03:16 using cash deposit machine at FBL-FBL-EKM/PANAMPILY. Current Bal: Rs.2072.38',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for AU Small Finance Bank
-- =============================================

-- AUBANK - RTGS DEBIT
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AUBANK', 'AU Small Finance Bank',
     '.*?(?<type>Debited|Withdrawn)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+from A/c\\s+(?<accountNumber>\\w+)\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{4}).*?(?:RTGS|NEFT|IMPS).*?(?<refNumber>[\\w\\-]+).*?Bal INR\\s+(?<balance>[\\d,]+\\.\\d{2})',
     'Debited INR 7,00,000.00 from A/c X6136 on 23-JAN-2026 RTGS DR-AUBLR62026012321469397 - Gaurav J. Bal INR 6,638.87. Not you? Call 180012001200',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for Axis Bank
-- =============================================

-- AXISBK - Commercial vehicle loan overdue notification (Auto-detected as ALERT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AXISBK', 'Axis Bank',
     '.*?Axis Bank\\s+(?<merchant>COMMERCIAL VEHICLE|PERSONAL LOAN|HOME LOAN|CAR LOAN)\\s+A/c\\s+no\\.\\s+(?<accountNumber>\\w+)\\s+is overdue',
     'Your Axis Bank COMMERCIAL VEHICLE A/c no. XX6422 is overdue. Our authorised agency AXIS SALES LTD may contact you. Please ignore if paid.',
     'OTHERS', 'APPROVED');

-- AXISBK - Personal loan overdue with amount (Auto-detected as ALERT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AXISBK', 'Axis Bank',
     '.*?Axis Bank\\s+(?<merchant>PERSONAL LOAN|HOME LOAN|CAR LOAN|COMMERCIAL VEHICLE)\\s+A/c.*?Total overdue INR\\s+(?<amount>[\\d,]+\\.\\d{2})',
     'We are yet to receive payment for your Axis Bank PERSONAL LOAN A/c. Total overdue INR 12275.00. Ignore if paid.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for ICICI Bank
-- =============================================

-- ICICIT - Credit bureau reporting notification (Auto-detected as ALERT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('ICICIT', 'ICICI Bank',
     '.*?(?<date>\\d+)\\s+days payment overdue for ICICI Bank\\s+(?<merchant>PL|CC|HL|AL)\\s+(?<accountNumber>\\w+)\\s+in\\s+\\d{2}-\\w{3}-\\d{2}\\s+has been submitted for reporting to Credit Bureaus',
     '290 days payment overdue for ICICI Bank PL XX276 in 31-DEC-25 has been submitted for reporting to Credit Bureaus',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for Kotak Bank
-- =============================================

-- KOTAKB - Statement ready notification (Auto-detected as ALERT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('KOTAKB', 'Kotak Bank',
     '.*?Kotak bank statement for CRN\\s+(?<accountNumber>\\w+)\\s+for\\s+(?<date>\\w{3}-\\d{2})\\s+is ready',
     'Your Kotak bank statement for CRN 0390 for DEC-25 is ready. Login to net banking to view.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for OneCard
-- =============================================

-- OneCrd - Credit card bill overdue (Auto-detected as ALERT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('OneCrd', 'OneCard',
     '.*?Your bill is overdue.*?Pay minimum due Rs\\.(?<amount>[\\d,]+\\.\\d{2})',
     'Your bill is overdue, affecting your credit score. Pay minimum due Rs.59673.71 today.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for HDFC Bank
-- =============================================

-- HDFCBK - SmartPay scheduled debit notification
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?SmartPay Scheduled:\\s+Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+for\\s+(?<merchant>[\\w\\s]+?)\\s+will auto-debit via HDFC Bank Account\\s+(?<accountNumber>\\w+)\\s+by\\s+(?<date>\\d{2}-\\w{3}-\\d{4})',
     'SmartPay Scheduled: Rs.10000.00 for SBIMF Bill will auto-debit via HDFC Bank Account xx0941 by 05-Feb-2026',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for IndusInd Bank
-- =============================================

-- INDUSB - Credit card limit exceeded
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('INDUSB', 'IndusInd Bank',
     '.*?Limit Exceeded.*?Pay Min Due of Rs\\.\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on Credit Card ending\\s+(?<accountNumber>\\d+)',
     'Limit Exceeded! Pay Min Due of Rs. 12235.24 on Credit Card ending 5647. Ignore if already paid.',
     'OTHERS', 'APPROVED');

-- INDUSB - Credit card transaction declined
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('INDUSB', 'IndusInd Bank',
     '.*?Txn on IndusInd Bank Credit Card no\\.\\s+(?<accountNumber>\\d+)\\s+for INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+at\\s+(?<merchant>[\\w\\s]+?)\\s+is Declined',
     'Txn on IndusInd Bank Credit Card no. 5810 for INR 206.26 at Mobikwik is Declined due to incorrect CVV/CSC.',
     'OTHERS', 'APPROVED');

-- INDUSB - Available balance notification
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('INDUSB', 'IndusInd Bank',
     '.*?Your Ac\\.No\\.\\s+(?<accountNumber>\\w+)\\s+has an available balance of INR\\s+(?<balance>[\\d,]+\\.\\d{2})\\s+as on\\s+(?<date>\\d{2}-\\d{2}-\\d{2}).*?Last transaction\\s+(?<type>CR|DR)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})',
     'Your Ac.No. 100XXXXX386 has an available balance of INR 56.00 as on 08-12-25. Last transaction CR INR 14.00.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Ujjivan Small Finance Bank
-- =============================================

-- UJJIVN - Smart statement ready notification
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('UJJIVN', 'Ujjivan Small Finance Bank',
     '.*?Smart Statement for the month of\\s+(?<date>\\w{3}\\s+\\d{2})\\s+for Customer ID ending\\s+(?<accountNumber>\\d+)',
     'Dear Customer, please click the link to view your Smart Statement for the month of Dec 25 for Customer ID ending 0330.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Jana Small Finance Bank
-- =============================================

-- JANABK - Housing loan EMI default notification (Auto-detected as ALERT)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('JANABK', 'Jana Small Finance Bank',
     '.*?DEFAULT in the repayment of EMI for your\\s+(?<merchant>HOUSING|PERSONAL|CAR|BUSINESS)\\s+loan account ending\\s+(?<accountNumber>\\w+).*?Overdue Rs\\.(?<amount>[\\d,]+\\.\\d{0,2})',
     'Despite multiple reminders, there has been a DEFAULT in the repayment of EMI for your HOUSING loan account ending XXX0930. Overdue Rs.11752.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for SBI CBS
-- =============================================

-- CBSSBI - Account DEBIT for transfer
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('CBSSBI', 'State Bank of India',
     '.*?Your A/C\\s+(?<accountNumber>\\w+)\\s+(?<type>Debited|Withdrawn)\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{2}/\\d{2}/\\d{2})\\s+transferred to\\s+(?<merchant>[\\w\\s]+?)\\..*?Avl Balance INR\\s+(?<balance>[\\d,]+\\.\\d{2})',
     'Your A/C XXXXX728249 Debited INR 1,122.00 on 26/12/25 transferred to Mr. MohammadArif. Avl Balance INR 876.32',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Standard Chartered Bank
-- =============================================

-- SCBANK - CREDIT for reversal
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('SCBANK', 'Standard Chartered Bank',
     '.*?Your a/c no\\.\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>credited|received)\\s+for Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{2}-\\d{2}-\\d{4})\\s+for reversal of transaction.*?UPI Ref no\\s+(?<refNumber>\\d+)',
     'Your a/c no. XXXXXXX4698 is credited for Rs.500.00 on 22-01-2026 for reversal of transaction (UPI Ref no 602220176029).',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for IDFC First Bank
-- =============================================

-- IDFCFB - Cash payment received for loan
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('IDFCFB', 'IDFC First Bank',
     '.*?(?<type>Received)\\s+Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+by Cash vide eReceipt\\s+(?<refNumber>\\w+)\\s+for loan\\s+(?<accountNumber>\\w+)',
     'Received Rs.16902.00 by Cash vide eReceipt RN035843156 for loan XXXX9108.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Canara Bank
-- =============================================

-- CanBnk - CREDIT for reversal
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('CanBnk', 'Canara Bank',
     '.*?Your a/c no\\.\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>credited|received)\\s+for Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{2}-\\d{2}-\\d{2})\\s+for reversal of transaction.*?UPI Ref no\\s+(?<refNumber>\\d+)',
     'Your a/c no. XX9794 is credited for Rs.200.00 on 27-01-26 for reversal of transaction (UPI Ref no 639386824945).',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for SBI
-- =============================================

-- SBIINB - CREDIT by IMPS
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('SBIINB', 'State Bank of India',
     '.*?Your a/c no\\.\\s+(?<accountNumber>\\w+)\\s+is\\s+(?<type>credited|received)\\s+by Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{2}-\\d{2}-\\d{2})\\s+by\\s+(?<merchant>IMPS|NEFT|RTGS)',
     'Your a/c no. XXXXXXXX2800 is credited by Rs.1.00 on 16-12-25 by IMPS. If not done by you, call helpline.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for SBI Credit Card
-- =============================================

-- SBICRD - Credit card transaction alert
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('SBICRD', 'SBI Credit Card',
     '.*?Txn of Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+on SBI Credit Card\\s+(?<accountNumber>\\w+)\\s+at\\s+(?<merchant>[\\w\\s]+?)(?:\\.|$)',
     'Txn of Rs.5,005.00 on SBI Credit Card XX8786 at PAYU UTILITIES PG. If not done by you, report immediately.',
     'OTHERS', 'APPROVED');

-- SBICRD - Payment could not be processed
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('SBICRD', 'SBI Credit Card',
     '.*?Payment of Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+towards SBI Credit Card\\s+(?<accountNumber>\\w+)\\s+could not be processed',
     'Payment of Rs.281.00 towards SBI Credit Card XX2458 could not be processed due to excess credit balance.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Tru Credit/Loan Apps
-- =============================================

-- TRCRED - Credit bureau reporting
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('TRCRED', 'Tru Credit',
     '.*?Delay in your loan repayment has been reported to credit bureaus',
     'Delay in your loan repayment has been reported to credit bureaus. Please pay on time.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for AU Bank
-- =============================================

-- AUBANK - ACH mandate accepted
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('AUBANK', 'AU Small Finance Bank',
     '.*?ACH mandate for loan no\\.\\s+(?<accountNumber>\\w+)\\s+is accepted.*?EMI will be debited from account\\s+(?<merchant>\\w+)',
     'ACH mandate for loan no. L9001020243637839 is accepted. EMI will be debited from account XXXX0788.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Maharashtra Bank
-- =============================================

-- MAHABK - Account debited and credited (internal transfer)
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('MAHABK', 'Maharashtra Bank',
     '.*?Your Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|withdrawn)\\s+with INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+and Acct\\s+(?<merchant>\\w+)\\s+credited.*?UPI Ref\\s+(?<refNumber>\\d+)',
     'Your Acct X9089 debited with INR 80.00 and Acct X1105 credited. UPI Ref 920145998181.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for SBI Bank
-- =============================================

-- SBIBNK - E-mandate payment due
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('SBIBNK', 'State Bank of India',
     '.*?Your\\s+(?<merchant>[\\w\\s]+?)\\s+e-mandate payment for Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+is due on\\s+(?<date>\\d{2}/\\d{2}/\\d{4})',
     'Your Youtube e-mandate payment for Rs.149.00 is due on 06/01/2026 and will be processed through SBI Debit Card.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Patterns for Branch International
-- =============================================

-- BRNCHI - Loan unpaid legal warning
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BRNCHI', 'Branch International',
     '.*?Branch loan Rs\\.(?<amount>[\\d,]+)\\s+remains unpaid.*?Legal proceedings initiated',
     'Urgent warning: Branch loan Rs.996 remains unpaid. Legal proceedings initiated. Pay immediately.',
     'OTHERS', 'APPROVED');

-- BRNCHI - NPA warning
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('BRNCHI', 'Branch International',
     '.*?Overdue Rs\\.(?<amount>[\\d,]+)\\s+marked as NPA',
     'IMMEDIATE PAYMENT REQUIRED: Overdue Rs.1793 marked as NPA. Repay immediately to avoid consequences.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for ICICI Bank
-- =============================================

-- ICICIT - QR payment received
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('ICICIT', 'ICICI Bank',
     '.*?Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+(?<type>received)\\s+on ICICI Bank QR from\\s+(?<merchant>[\\w\\s]+?)\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2})',
     'Rs.1427.00 received on ICICI Bank QR from Rohit on 27-Jan-26. Amount to be settled tomorrow.',
     'OTHERS', 'APPROVED');

-- =============================================
-- Additional Patterns for HDFC Bank
-- =============================================

-- HDFCBK - Overdue alert
INSERT INTO patterns (bank_address, bank_name, regex_pattern, message, category, status) VALUES
    ('VM-HDFCBK', 'HDFC Bank',
     '.*?Overdue Alert:\\s+Rs\\.(?<amount>[\\d,]+\\.\\d{2})\\s+overdue for your A/c\\s+(?<accountNumber>\\w+)',
     'Overdue Alert: Rs.48998.20 overdue for your A/c XXXX9486 will be recovered to avoid penalty charges.',
     'OTHERS', 'APPROVED');
