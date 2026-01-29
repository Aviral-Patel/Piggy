# Alert & Reminder Message Types - Implementation Summary

## 🎯 Purpose

Many patterns in the database are not actual financial transactions but rather **alerts** and **reminders** such as:
- Overdue payment notifications
- Statement ready alerts
- Credit bureau reports
- Payment due reminders
- Account balance alerts

These messages don't have transaction amounts (DEBITED/CREDITED) but still need to be tracked.

## ✅ Changes Made

### 1. **Backend - TransactionType Enum**

**File:** `TransactionType.java`

**Before:**
```java
public enum TransactionType {
    CREDITED,
    DEBITED
}
```

**After:**
```java
public enum TransactionType {
    CREDITED,
    DEBITED,
    ALERT,
    REMINDER
}
```

---

### 2. **Backend - SmsRegexParser**

**File:** `SmsRegexParser.java`

**Updated `normalizeType()` method:**
```java
private static TransactionType normalizeType(String type) {
    if (type == null || type.isBlank()) return TransactionType.DEBITED;
    String u = type.toUpperCase();
    if (u.contains("CREDIT") || "CREDITED".equals(u)) return TransactionType.CREDITED;
    if (u.contains("SPENT") || u.contains("DEBIT") || "DEBITED".equals(u)) return TransactionType.DEBITED;
    if (u.contains("ALERT") || "ALERT".equals(u)) return TransactionType.ALERT;
    if (u.contains("REMINDER") || "REMINDER".equals(u)) return TransactionType.REMINDER;
    return TransactionType.DEBITED;
}
```

---

### 3. **Frontend - SMSParser.jsx**

**Type Dropdown Updated:**

**Before:**
```jsx
options={['', 'CREDITED', 'DEBITED', 'OTHERS']}
```

**After:**
```jsx
options={['', 'CREDITED', 'DEBITED', 'ALERT', 'REMINDER']}
```

**Changes:**
- Added `ALERT` and `REMINDER` options
- Removed `OTHERS` (not a valid TransactionType)

---

### 4. **Frontend - TransactionCards.jsx**

**Card List View:**
- Added `isAlert` and `isReminder` checks
- Shows badge instead of amount for alerts/reminders
- Alert: Orange badge
- Reminder: Blue badge

**Before (Amount Display):**
```jsx
<p className="text-2xl font-bold ...">
  ₹{transaction.amount}
</p>
```

**After:**
```jsx
{isAlert || isReminder ? (
  <span className={`... ${isAlert ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
    {transaction.type}
  </span>
) : (
  <p className="text-2xl font-bold ...">
    ₹{transaction.amount}
  </p>
)}
```

**Modal Detail View:**
- Hides `Amount` field for ALERT/REMINDER types
- Hides `Balance` field for ALERT/REMINDER types
- Shows colored type badge (orange for alert, blue for reminder)

---

### 5. **Frontend - Dashboard.jsx**

**Single Parse Preview:**
- Added logic to detect ALERT/REMINDER types
- Conditionally hides amount display
- Updates header text: "Alert/Reminder Added Successfully!"
- Shows colored badge instead of generic badge

**Bulk Parse Preview:**
- Added same logic for bulk parsed data
- Each transaction card checks for ALERT/REMINDER
- Conditionally shows/hides amount
- Applies appropriate color coding

---

## 🎨 UI/UX Design

### Color Coding

| Type | Card Badge | Text Color | Background |
|------|-----------|------------|------------|
| CREDITED | Green | `text-tertiary` | `bg-secondary` |
| DEBITED | Red | `text-red-500` | `bg-red-100` |
| ALERT | Orange | `text-orange-600` | `bg-orange-100` |
| REMINDER | Blue | `text-blue-600` | `bg-blue-100` |

### Card Display Logic

**Transaction (DEBITED/CREDITED):**
```
┌─────────────────────────────┐
│ ZOMATO             -₹500.00 │
│ DEBITED                     │
│ 📅 Jan 28, 2026             │
└─────────────────────────────┘
```

**Alert:**
```
┌─────────────────────────────┐
│ Overdue Notification  [ALERT]│
│ ALERT                       │
│ 📅 Jan 28, 2026             │
└─────────────────────────────┘
```

**Reminder:**
```
┌─────────────────────────────┐
│ Payment Due        [REMINDER]│
│ REMINDER                    │
│ 📅 Jan 28, 2026             │
└─────────────────────────────┘
```

---

## 📊 Example Patterns That Use ALERT/REMINDER

### Axis Bank - Overdue Alert
```sql
INSERT INTO patterns (...) VALUES
    ('AXISBK', 'Axis Bank',
     '.*?Axis Bank\s+(?<merchant>COMMERCIAL VEHICLE|PERSONAL LOAN)\s+A/c\s+no\.\s+(?<accountNumber>\w+)\s+is overdue',
     'Your Axis Bank COMMERCIAL VEHICLE A/c no. XX6422 is overdue...',
     'OTHERS', 'APPROVED');
```
**Should have:** `(?<type>alert)` or `(?<type>ALERT)` in regex

### Kotak Bank - Statement Ready
```sql
INSERT INTO patterns (...) VALUES
    ('KOTAKB', 'Kotak Bank',
     '.*?Kotak bank statement for CRN\s+(?<accountNumber>\w+)\s+for\s+(?<date>\w{3}-\d{2})\s+is ready',
     'Your Kotak bank statement for CRN 0390 for DEC-25 is ready...',
     'OTHERS', 'APPROVED');
```
**Should have:** `(?<type>alert)` in regex

### OneCard - Payment Reminder
```sql
INSERT INTO patterns (...) VALUES
    ('OneCrd', 'OneCard',
     '.*?Your bill is overdue.*?Pay minimum due Rs\.(?<amount>[\d,]+\.\d{2})',
     'Your bill is overdue, affecting your credit score. Pay minimum due Rs.59673.71...',
     'OTHERS', 'APPROVED');
```
**Should have:** `(?<type>reminder)` in regex

---

## 🔄 Migration Path for Existing Patterns

### Step 1: Identify Alert/Reminder Patterns
Patterns that:
- Don't have transaction amounts (no money debited/credited)
- Are notifications about statements, overdue, credit bureau reports
- Are reminders about due dates, pending payments

### Step 2: Update Regex Patterns
Add `(?<type>alert)` or `(?<type>reminder)` to the regex:

**Example:**
```sql
-- Before:
'.*?Your bill is overdue'

-- After:
'.*?Your bill is overdue.*?(?<type>reminder)'
```

### Step 3: Update in SMSParser
Makers can:
1. Go to "Pending Messages" for failed parses
2. Click "Use This" on alert/reminder messages
3. Create new pattern with Type = "ALERT" or "REMINDER"
4. Submit for approval

---

## 🧪 Testing

### Test Case 1: Alert Message

**Input:**
- Bank Address: `AXISBK`
- Message: `Your Axis Bank COMMERCIAL VEHICLE A/c no. XX6422 is overdue...`
- Type: `ALERT`

**Expected:**
- ✅ Parsed successfully
- ✅ Card shows orange "ALERT" badge
- ✅ No amount displayed
- ✅ Modal shows colored badge
- ✅ Balance field hidden

### Test Case 2: Reminder Message

**Input:**
- Bank Address: `OneCrd`
- Message: `Your bill is overdue... Pay minimum due Rs.59673.71`
- Type: `REMINDER`

**Expected:**
- ✅ Parsed successfully
- ✅ Card shows blue "REMINDER" badge
- ✅ No amount displayed (or shows the due amount if present)
- ✅ Modal shows colored badge

### Test Case 3: Bulk Upload with Mixed Types

**JSON:**
```json
[
  {"address": "BZ-SBIINB", "message": "debited by 500"},
  {"address": "AXISBK", "message": "overdue notification"},
  {"address": "OneCrd", "message": "payment reminder"}
]
```

**Expected:**
- ✅ First shows as DEBITED with amount
- ✅ Second shows as ALERT with orange badge
- ✅ Third shows as REMINDER with blue badge

---

## 📝 Benefits

### 1. **Clear Visual Distinction**
- Transactions vs Alerts/Reminders are visually different
- Users immediately know what type of message it is

### 2. **Better Organization**
- All SMS messages tracked (not just transactions)
- Comprehensive message history

### 3. **Proper Categorization**
- Alert: Urgent notifications (overdue, fraud, statement)
- Reminder: Upcoming due dates, pending actions
- Transaction: Actual money movement

### 4. **Flexible Display**
- Amount shown only when relevant
- Balance shown only for transactions
- Appropriate color coding for each type

---

## 🎉 Summary

The system now supports 4 transaction types:
1. ✅ **CREDITED** - Money received (green)
2. ✅ **DEBITED** - Money spent (red)
3. ✅ **ALERT** - Important notifications (orange)
4. ✅ **REMINDER** - Due date reminders (blue)

This provides a complete SMS tracking system that handles both financial transactions and informational messages!

---

## 🚀 Next Steps

1. **Restart Backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Update Existing Patterns:**
   - Identify notification patterns in database
   - Add `(?<type>alert)` or `(?<type>reminder)` to their regex
   - Or let makers create new patterns through SMS Parser

3. **Test:**
   - Parse alert/reminder messages
   - Verify correct display in cards
   - Check modal details

The feature is fully implemented and ready to use! 🎊
