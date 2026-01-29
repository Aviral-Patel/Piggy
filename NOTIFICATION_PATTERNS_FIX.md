# Notification Patterns Issue & Fix

## 🐛 Problem

Some patterns in `data.sql` are for **notifications** (not transactions) and don't have required transaction fields like `amount`. When these patterns match, the parser throws an exception.

**Error:**
```
RuntimeException: Failed to extract amount from SMS: No group with name <amount>
```

## 📋 Problematic Patterns Found

### 1. Axis Bank - Overdue Notification (Line 410-414)
```sql
'.*?Axis Bank\s+(?<merchant>COMMERCIAL VEHICLE|PERSONAL LOAN)\s+A/c\s+no\.\s+(?<accountNumber>\w+)\s+is overdue'
```
**Missing:** `amount`, `date`, `type`  
**Type:** Overdue alert notification

### 2. Kotak Bank - Statement Ready (Line 439-443)
```sql
'.*?Kotak bank statement for CRN\s+(?<accountNumber>\w+)\s+for\s+(?<date>\w{3}-\d{2})\s+is ready'
```
**Missing:** `amount`, `type`  
**Type:** Statement ready notification

### 3. Tru Credit - Credit Bureau Report (Line 592-596)
```sql
'.*?Delay in your loan repayment has been reported to credit bureaus'
```
**Missing:** `amount`, `accountNumber`, `date`, `type`  
**Type:** Credit bureau notification

### 4. ICICI Credit Bureau (Line 431-435)
```sql
'.*?days payment overdue for ICICI Bank.*?has been submitted for reporting to Credit Bureaus'
```
**Missing:** `amount` (likely)  
**Type:** Credit bureau notification

## ✅ Fix Applied

### 1. Updated `SmsRegexParser.buildTransaction()`

**Before:**
```java
String amountStr = matcher.group("amount");
// Throws exception if amount group doesn't exist
```

**After:**
```java
try {
    String amountStr = matcher.group("amount");
    if (amountStr == null || amountStr.isBlank()) {
        // Don't set amount - leave it null
    } else {
        transaction.setAmount(new BigDecimal(amountStr));
    }
} catch (IllegalArgumentException e) {
    // Amount group doesn't exist - return null
    System.out.println("⚠ Amount group not found - may be notification");
    return null;
}
```

### 2. Updated `SmsRegexParser.parse()`

**Before:**
```java
if (matcher.find()) {
    return buildTransaction(matcher, pattern, bankAddress);
}
```

**After:**
```java
if (matcher.find()) {
    Transaction transaction = buildTransaction(matcher, pattern, bankAddress);
    
    // If null, pattern didn't have required fields - try next pattern
    if (transaction == null) {
        System.out.println("⚠ Pattern matched but build failed - trying next");
        continue;
    }
    
    return transaction;
}
```

## 🔄 New Behavior

### When Notification Pattern Matches:

1. **Pattern matches** the SMS text
2. **Build fails** because `amount` field is missing
3. **Returns null** instead of throwing exception
4. **Tries next pattern** in the list
5. If all patterns fail → **Saves as unparsed message**

### Result:
- ✅ No more crashes
- ✅ Parser tries other patterns
- ✅ Invalid patterns saved as unparsed messages
- ✅ Makers can see them in "Pending Messages"
- ✅ Makers can create proper transaction patterns

## 🎯 Recommendations

### Option 1: Remove Notification Patterns (Recommended)
These patterns should be removed from `data.sql` since they're not transaction patterns:

```sql
-- DELETE these lines from data.sql:
-- Line 410-414: Axis Bank overdue
-- Line 439-443: Kotak statement ready
-- Line 592-596: Tru Credit bureau report
```

### Option 2: Mark as REJECTED
Change their status to `REJECTED` so they won't be used:

```sql
-- Change APPROVED to REJECTED:
(..., 'OTHERS', 'REJECTED');  -- Instead of APPROVED
```

### Option 3: Add Missing Fields
Add the required fields to make them proper transaction patterns (if applicable):

```sql
-- Add amount, date, type fields to the regex pattern
'.*?minimum due Rs\.(?<amount>[\d,]+\.\d{2}).*?'
```

### Option 4: Keep Current Behavior (Done)
- Let the parser handle them gracefully
- They'll be saved as unparsed messages
- Makers can create proper patterns for them

## 🧪 Testing

### Test Case: Axis Bank Overdue Message

**Input SMS:**
```
Your Axis Bank COMMERCIAL VEHICLE A/c no. XX6422 is overdue. Our authorised agency AXIS SALES LTD may contact you. Please ignore if paid.
```

**Before Fix:**
- ❌ RuntimeException thrown
- ❌ Request crashes
- ❌ No data saved

**After Fix:**
- ✅ Pattern matches but returns null
- ✅ Tries other patterns (if any)
- ✅ Saves as unparsed message
- ✅ Shows in "Pending Messages"
- ✅ Maker can create proper pattern

### Backend Console Output:
```
✓ Pattern matched for bank address: AXISBK
⚠ Amount group not found in pattern - this may be a notification/alert message
⚠ Pattern matched but transaction build failed - trying next pattern
⚠ No matching pattern found for SMS from bank address: AXISBK
Saving unparsed message for bank: AXISBK
✓ Unparsed message saved with ID: 1
```

## 📊 Pattern Types

### Transaction Patterns (Should Parse)
- ✅ Debit transactions with amount
- ✅ Credit transactions with amount
- ✅ Balance inquiries
- ✅ Fund transfers with amount

### Notification Patterns (Won't Parse)
- ❌ Overdue alerts (no transaction amount)
- ❌ Statement ready notifications
- ❌ Credit bureau reports
- ❌ Account alerts
- ❌ Service messages

## 🎉 Summary

The parser now gracefully handles patterns that don't have required fields:
1. ✅ No more crashes on notification patterns
2. ✅ Continues to try other patterns
3. ✅ Saves as unparsed if all fail
4. ✅ Makers can review and fix

**The system is now more robust and handles edge cases properly!**
