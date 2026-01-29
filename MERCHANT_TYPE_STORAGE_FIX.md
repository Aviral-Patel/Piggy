# Merchant Name & Type Storage - Complete Fix

## 🎯 Problem

When a **maker** creates a pattern in SMSParser and fills in:
- **Merchant Name** (e.g., "ZOMATO", "PL", "HOUSING")
- **Type** (e.g., "DEBITED", "ALERT", "REMINDER")

These values were **NOT being stored** in the database. They were only embedded in the regex pattern as capture groups.

When a **checker** reviewed the pattern, these fields showed as **empty** because they were never saved.

---

## ✅ Solution

Added `merchantName` and `type` as **separate database columns** in the `Pattern` entity, so they are:
1. **Saved** when the maker creates a pattern
2. **Retrieved** when the checker reviews the pattern
3. **Displayed** correctly in the review form

---

## 📝 Changes Made

### 1. Backend - Pattern Entity

**File:** `Pattern.java`

**Added fields:**
```java
@Column
private String merchantName;

@Column
private String type;
```

**Added getters/setters:**
```java
public String getMerchantName() { return merchantName; }
public void setMerchantName(String merchantName) { this.merchantName = merchantName; }

public String getType() { return type; }
public void setType(String type) { this.type = type; }
```

---

### 2. Backend - PatternDTO

**File:** `PatternDTO.java`

**Added fields:**
```java
private String merchantName;
private String type;
```

**Updated constructor:**
```java
public PatternDTO(Pattern pattern) {
    this.id = pattern.getId();
    this.bankAddress = pattern.getBankAddress();
    this.bankName = pattern.getBankName();
    this.merchantName = pattern.getMerchantName();  // ✅ Now included
    this.type = pattern.getType();                   // ✅ Now included
    this.regexPattern = pattern.getRegexPattern();
    this.message = pattern.getMessage();
    this.category = pattern.getCategory();
    this.status = pattern.getStatus();
}
```

**Added getters/setters:**
```java
public String getMerchantName() { return merchantName; }
public void setMerchantName(String merchantName) { this.merchantName = merchantName; }

public String getType() { return type; }
public void setType(String type) { this.type = type; }
```

---

### 3. Backend - PatternController

**File:** `PatternController.java`

**Updated createPattern method:**
```java
@PostMapping
public ResponseEntity<PatternDTO> createPattern(@RequestBody PatternDTO dto) {
    Pattern pattern = new Pattern();
    pattern.setBankAddress(dto.getBankAddress());
    pattern.setBankName(dto.getBankName());
    pattern.setMerchantName(dto.getMerchantName());  // ✅ Save merchantName
    pattern.setType(dto.getType());                  // ✅ Save type
    pattern.setRegexPattern(dto.getRegexPattern());
    pattern.setMessage(dto.getMessage());
    pattern.setCategory(dto.getCategory());
    pattern.setStatus(dto.getStatus() != null ? dto.getStatus() : PatternStatus.PENDING);
    
    Pattern saved = patternService.savePattern(pattern);
    return ResponseEntity.ok(new PatternDTO(saved));
}
```

---

### 4. Frontend - SMSParser.jsx

**Updated save function to send merchantName and type:**

```javascript
const patternData = {
  bankAddress: formData.bankAddress,
  bankName: formData.bankName,
  merchantName: formData.merchantName || null,  // ✅ Send to backend
  type: formData.type || null,                  // ✅ Send to backend
  regexPattern: formData.regexPattern,
  message: formData.message,
  category: formData.category || null,
  status: 'PENDING'
};
```

---

### 5. Frontend - TemplateApproval.jsx

**Simplified handleCheck to use stored values:**

**Before (Complex extraction logic):**
```javascript
const extractFromRegex = (regex, groupName) => { ... };
const extractValueFromMessage = (regex, message, groupName) => { ... };
const merchantName = extractValueFromMessage(...) || extractFromRegex(...);
const type = extractValueFromMessage(...) || extractFromRegex(...);
```

**After (Direct access):**
```javascript
const handleCheck = (template) => {
  navigate('/sms-parser', {
    state: {
      id: template.id,
      patternId: template.id,
      bankAddress: template.bankAddress,
      bankName: template.bankName,
      merchantName: template.merchantName,  // ✅ Direct from database
      type: template.type,                  // ✅ Direct from database
      regexPattern: template.regexPattern,
      message: template.message,
      category: template.category,
      status: template.status
    }
  });
};
```

---

## 🗄️ Database Schema

### New Columns in `patterns` Table:

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `merchant_name` | VARCHAR | YES | Merchant name filled by maker |
| `type` | VARCHAR | YES | Transaction type filled by maker |

**Notes:**
- Both columns are **nullable** because not all patterns have these fields
- Existing patterns will have `NULL` values (which is fine)
- New patterns will store these values when makers fill them in

---

## 📊 Data Flow

### Creating a Pattern (Maker)

```
┌────────────────────────────────────┐
│ 1. Maker fills SMSParser form:    │
│    - Merchant Name: "ZOMATO"       │
│    - Type: "DEBITED"               │
│    - Other fields...               │
└────────────────┬───────────────────┘
                 │
                 ↓
┌────────────────────────────────────┐
│ 2. Click "Save as New Pattern"     │
└────────────────┬───────────────────┘
                 │
                 ↓
┌────────────────────────────────────┐
│ 3. Frontend sends to backend:      │
│    POST /api/patterns              │
│    {                               │
│      merchantName: "ZOMATO",       │
│      type: "DEBITED",              │
│      ...                           │
│    }                               │
└────────────────┬───────────────────┘
                 │
                 ↓
┌────────────────────────────────────┐
│ 4. Backend saves to database:      │
│    INSERT INTO patterns            │
│    (merchant_name, type, ...)      │
│    VALUES ('ZOMATO', 'DEBITED'...) │
└────────────────────────────────────┘
```

### Reviewing a Pattern (Checker)

```
┌────────────────────────────────────┐
│ 1. Checker views Template Approval │
│    page with pending patterns      │
└────────────────┬───────────────────┘
                 │
                 ↓
┌────────────────────────────────────┐
│ 2. Backend fetches patterns:       │
│    GET /api/patterns/pending       │
│    Returns PatternDTO with:        │
│    - merchantName: "ZOMATO"        │
│    - type: "DEBITED"               │
└────────────────┬───────────────────┘
                 │
                 ↓
┌────────────────────────────────────┐
│ 3. Checker clicks "Check" button   │
└────────────────┬───────────────────┘
                 │
                 ↓
┌────────────────────────────────────┐
│ 4. Navigate to SMSParser with:     │
│    state: {                        │
│      merchantName: "ZOMATO",       │
│      type: "DEBITED",              │
│      ...                           │
│    }                               │
└────────────────┬───────────────────┘
                 │
                 ↓
┌────────────────────────────────────┐
│ 5. SMSParser form auto-fills:      │
│    ✅ Merchant Name: ZOMATO        │
│    ✅ Type: DEBITED                │
│    ✅ All other fields             │
└────────────────────────────────────┘
```

---

## 🧪 Testing

### Test 1: Create New Pattern as Maker

1. **Login as maker**
2. Go to **SMSParser**
3. Fill in form:
   - Bank Address: `ICICIT`
   - Bank Name: `ICICI Bank`
   - **Merchant Name: `PL`** ← This should be saved
   - **Type: `ALERT`** ← This should be saved
   - Regex Pattern: `.*?(?<merchant>PL|CC).*`
   - Sample Message: `290 days payment overdue...`
   - Category: `OTHERS`
4. Click **"Match"** → Should match successfully
5. Click **"Save as New Pattern"**

**Expected Result:**
```
✅ Pattern sent for approval successfully!
✅ merchantName='PL' saved to database
✅ type='ALERT' saved to database
```

**Verify in Database:**
```sql
SELECT merchant_name, type, bank_address 
FROM patterns 
WHERE bank_address = 'ICICIT';

Result:
merchant_name | type  | bank_address
--------------+-------+-------------
PL            | ALERT | ICICIT
```

---

### Test 2: Review Pattern as Checker

1. **Login as checker**
2. Go to **Template Approval**
3. Find the ICICIT pattern in pending list
4. Click **"Check"** button

**Expected Result:**
```
✅ Navigates to SMSParser in Review Mode
✅ Form shows:
   - Bank Address: ICICIT
   - Bank Name: ICICI Bank
   - Merchant Name: PL ← ✅ Now filled!
   - Type: ALERT ← ✅ Now filled!
   - Regex Pattern: .*?(?<merchant>PL|CC).*
   - Sample Message: 290 days payment overdue...
   - Category: OTHERS
```

**Before Fix:**
```
❌ Merchant Name: [EMPTY]
❌ Type: [EMPTY]
```

**After Fix:**
```
✅ Merchant Name: PL
✅ Type: ALERT
```

---

### Test 3: Existing Patterns (NULL Values)

**Existing patterns in database (from data.sql) don't have merchantName/type:**

```sql
SELECT merchant_name, type, bank_address 
FROM patterns 
WHERE bank_address = 'BZ-SBIINB';

Result:
merchant_name | type | bank_address
--------------+------+--------------
NULL          | NULL | BZ-SBIINB
```

**This is fine!** When checker reviews old patterns:
- Merchant Name: (empty) ← Expected for old patterns
- Type: (empty) ← Expected for old patterns

**No errors, just empty fields for legacy patterns.** ✅

---

## 🔄 Migration

### Restart Backend (Required!)

```bash
cd backend
./mvnw spring-boot:run
```

**What happens on restart:**
```
✅ Hibernate detects new columns
✅ Automatically adds columns to patterns table:
   - ALTER TABLE patterns ADD COLUMN merchant_name VARCHAR(255);
   - ALTER TABLE patterns ADD COLUMN type VARCHAR(255);
✅ Existing rows have NULL for these columns (safe)
✅ New patterns will store these values
```

### No Data Loss

- ✅ **Existing patterns** remain unchanged
- ✅ **New columns** added automatically
- ✅ **NULL values** for old patterns (expected)
- ✅ **New patterns** will have values

---

## ✅ Benefits

### 1. **Complete Information Storage**
- Maker's input is now **fully saved**
- No data loss during pattern creation

### 2. **Better Review Experience**
- Checkers see **all fields** the maker filled in
- More context for approval/rejection decisions

### 3. **No Complex Extraction**
- No regex parsing needed in frontend
- Simple direct access to stored values

### 4. **Backward Compatible**
- Old patterns still work (NULL values)
- No breaking changes

### 5. **Future-Proof**
- Can add more fields easily
- Scalable architecture

---

## 📋 Summary

| Component | Change | Impact |
|-----------|--------|--------|
| **Pattern Entity** | Added `merchantName`, `type` fields | Database schema updated |
| **PatternDTO** | Added `merchantName`, `type` fields | API response includes new fields |
| **PatternController** | Save `merchantName`, `type` on create | Values persisted to database |
| **SMSParser.jsx** | Send `merchantName`, `type` to backend | Maker's input sent to server |
| **TemplateApproval.jsx** | Use stored values directly | Checker sees maker's input |

---

## 🚀 Restart & Test

### 1. Restart Backend
```bash
cd backend
./mvnw spring-boot:run
```

**Wait for:**
```
Started PiggyApplication in X.XXX seconds
```

### 2. Test Flow

**As Maker:**
1. Go to SMSParser
2. Fill in Merchant Name and Type
3. Save pattern
4. ✅ Should save successfully

**As Checker:**
1. Go to Template Approval
2. Click "Check" on the pattern
3. ✅ Merchant Name and Type should be filled!

---

## 🎉 Result

Checkers can now see **ALL the details** the maker filled in, including:
- ✅ Bank Address
- ✅ Bank Name
- ✅ **Merchant Name** (now stored!)
- ✅ **Type** (now stored!)
- ✅ Regex Pattern
- ✅ Sample Message
- ✅ Category

No more empty fields in review mode! 🎊
