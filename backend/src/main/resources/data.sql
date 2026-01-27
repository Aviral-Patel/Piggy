-- Insert approved SMS transaction patterns
-- These patterns will be loaded on application startup

-- Pattern 1: Standard debit transaction
INSERT INTO patterns (regex_pattern, message, status) VALUES 
('A/C\s+(?<accountNumber>\w+).*?(?<type>debited|credited)\s+by\s+(?<amount>[\d.]+).*?on date\s+(?<date>\d{1,2}\w{3}\d{2}).*?trf to\s+(?<merchant>[A-Z][A-Z\s]+?)(?=\s+Refno).*?Refno\s+(?<refNumber>\d+).*?(?<bankName>\w+)$',
'Dear UPI user A/C X6292 debited by 120.00 on date 14Jan26 trf to RAKESH L H Refno 871684140146 If not u? call-1800111109 for other services-18001234-SBI',
'APPROVED');
