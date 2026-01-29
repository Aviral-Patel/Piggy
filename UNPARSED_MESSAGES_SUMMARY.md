# Unparsed Messages Feature - Implementation Summary

## ✅ Files Created

### Backend (Java/Spring Boot)

1. **Entity**
   - `/backend/src/main/java/com/piggy/backend/entity/UnparsedMessage.java`
   - Defines the database structure for storing unparsed messages
   - Fields: id, bankAddress, smsMessage, errorMessage, createdAt, processed, user

2. **Repository**
   - `/backend/src/main/java/com/piggy/backend/repository/UnparsedMessageRepository.java`
   - JPA repository with custom query methods
   - Methods to find, count, and filter unparsed messages

3. **Service**
   - `/backend/src/main/java/com/piggy/backend/service/UnparsedMessageService.java`
   - Business logic for managing unparsed messages
   - Save, retrieve, mark as processed, delete operations

4. **Controller**
   - `/backend/src/main/java/com/piggy/backend/controller/UnparsedMessageController.java`
   - REST API endpoints for unparsed messages
   - Endpoints: GET all, GET pending, GET count, PUT mark-processed, DELETE

### Documentation

5. **User Guide**
   - `/UNPARSED_MESSAGES_GUIDE.md`
   - Complete documentation of the feature
   - Includes workflows, API examples, and troubleshooting

6. **Summary**
   - `/UNPARSED_MESSAGES_SUMMARY.md` (this file)

## ✅ Files Modified

### Backend

1. **TransactionService.java**
   - Added dependency injection for `UnparsedMessageService`
   - Modified `parseAndSave()` method to save unparsed messages on failure
   - Before throwing exception, saves the failed message to database

### Frontend (React)

2. **SMSParser.jsx**
   - Added state variables for pending messages management
   - Added `useEffect` to fetch pending count on mount
   - Added `fetchPendingMessages()` function
   - Added `handleSelectPendingMessage()` function
   - Added `handleDeletePendingMessage()` function
   - Added "Pending Messages" button in header (with count badge)
   - Added modal component to display pending messages

## 🎯 Feature Highlights

### Automatic Storage
- ✅ Failed SMS parses are automatically saved (Dashboard)
- ✅ Works for both single SMS and bulk JSON uploads
- ✅ Stores bank address, SMS text, and error message
- ✅ Associates with the user who attempted parsing

### User Interface
- ✅ Orange "Pending Messages" button in SMS Parser
- ✅ Badge showing count of pending messages
- ✅ Full-screen modal with scrollable list
- ✅ Clean card design for each message
- ✅ "Use This" button to auto-fill form
- ✅ "Delete" button to remove messages
- ✅ Dark mode support

### Backend API
- ✅ RESTful endpoints for all operations
- ✅ User-specific data (security)
- ✅ Count endpoint for efficient badge updates
- ✅ Mark as processed to track workflow
- ✅ Delete endpoint for cleanup

## 📊 Database Changes

### New Table: `unparsed_messages`
The database will automatically create this table when you restart the backend:

```sql
CREATE TABLE unparsed_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bank_address VARCHAR(255),
    sms_message VARCHAR(2000),
    error_message VARCHAR(1000),
    created_at TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🚀 How to Test

### Step 1: Start the Backend
```bash
cd backend
./mvnw spring-boot:run
```
The new table `unparsed_messages` will be created automatically via JPA.

### Step 2: Start the Frontend
```bash
cd client
npm start
```

### Step 3: Test the Feature

1. **Create an unparsed message:**
   - Go to Dashboard
   - Enter a bank address that has no patterns (e.g., "TESTBANK")
   - Paste any SMS text
   - Click "Parse SMS"
   - It will fail and save to unparsed messages

2. **View pending messages:**
   - Go to SMS Parser (must be logged in as "maker")
   - Click the orange "Pending Messages" button
   - You should see your failed message

3. **Use a pending message:**
   - Click "Use This" on a message
   - Form auto-fills with bank address and SMS text
   - Create a regex pattern
   - Test with "Match" button
   - Submit with "Send to Approve"

4. **Test with bulk upload:**
   - Use the `sample-messages.json` file
   - Modify one message to have an invalid bank address
   - Upload to Dashboard
   - Check SMS Parser for the failed message

## 🔄 User Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        Dashboard                                 │
│  ┌────────────────────────────────────────────────────┐         │
│  │  User pastes SMS or uploads JSON                   │         │
│  └────────────────────────────────────────────────────┘         │
│                            │                                     │
│                            ▼                                     │
│  ┌────────────────────────────────────────────────────┐         │
│  │  Backend attempts to parse with existing patterns  │         │
│  └────────────────────────────────────────────────────┘         │
│              │                           │                       │
│              │                           │                       │
│         ✅ Success                   ❌ Failure                  │
│              │                           │                       │
│              ▼                           ▼                       │
│  ┌──────────────────────┐   ┌──────────────────────────┐       │
│  │ Add to Transactions  │   │ Save to unparsed_messages│       │
│  └──────────────────────┘   └──────────────────────────┘       │
└─────────────────────────────────────┬───────────────────────────┘
                                      │
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SMS Parser (Maker)                        │
│  ┌────────────────────────────────────────────────────┐         │
│  │  Click "Pending Messages" button (shows count)     │         │
│  └────────────────────────────────────────────────────┘         │
│                            │                                     │
│                            ▼                                     │
│  ┌────────────────────────────────────────────────────┐         │
│  │  Modal displays all pending unparsed messages      │         │
│  └────────────────────────────────────────────────────┘         │
│                            │                                     │
│                            ▼                                     │
│  ┌────────────────────────────────────────────────────┐         │
│  │  User clicks "Use This" on a message               │         │
│  └────────────────────────────────────────────────────┘         │
│                            │                                     │
│                            ▼                                     │
│  ┌────────────────────────────────────────────────────┐         │
│  │  Form auto-fills with bank address & SMS text      │         │
│  │  Message marked as "processed"                     │         │
│  └────────────────────────────────────────────────────┘         │
│                            │                                     │
│                            ▼                                     │
│  ┌────────────────────────────────────────────────────┐         │
│  │  User creates regex pattern and tests it           │         │
│  └────────────────────────────────────────────────────┘         │
│                            │                                     │
│                            ▼                                     │
│  ┌────────────────────────────────────────────────────┐         │
│  │  User submits pattern for approval                 │         │
│  └────────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## 📋 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/unparsed-messages` | Get all unparsed messages for user |
| GET | `/api/unparsed-messages/pending` | Get only unprocessed messages |
| GET | `/api/unparsed-messages/pending/count` | Get count of pending messages |
| PUT | `/api/unparsed-messages/{id}/mark-processed` | Mark message as processed |
| DELETE | `/api/unparsed-messages/{id}` | Delete a message |

All endpoints require authentication (`Bearer` token).

## 🎨 UI Components

### Pending Messages Button
- Location: Top right of SMS Parser header
- Color: Orange (#f97316)
- Badge: Shows count in white on darker orange background
- Only visible for "maker" role when count > 0

### Pending Messages Modal
- Full-screen overlay with dark backdrop
- White/dark gray card (theme-aware)
- Max height: 80vh with scroll
- Close button (X) in top right
- Each message card includes:
  - Bank address badge (blue)
  - Timestamp (small gray text)
  - SMS text (gray background box)
  - Error message (red background box)
  - Two action buttons (primary green, danger red)

## ✨ Benefits

1. **Zero Data Loss**: Every failed parse is captured
2. **Efficient Processing**: Batch handle failed messages
3. **Better Coverage**: Identify gaps in pattern library
4. **User-Friendly**: Auto-fill saves time and reduces errors
5. **Trackable**: See exactly what failed and why
6. **Scalable**: Handles single failures or bulk upload issues

## 🐛 Known Issues / Limitations

- None currently identified

## 🔮 Future Enhancements

- [ ] Auto-suggest bank name based on address
- [ ] Pattern similarity detection
- [ ] Bulk actions (mark all, delete all)
- [ ] Search/filter by bank address
- [ ] Export to CSV
- [ ] Statistics dashboard
- [ ] Auto-retry with new patterns

## 📝 Notes

- Unparsed messages are user-specific (no cross-user visibility)
- Messages remain in database even after being marked as processed (for audit trail)
- Frontend automatically refreshes count after actions
- Backend uses JPA transactions for data consistency
- All API endpoints have proper error handling and return meaningful messages
