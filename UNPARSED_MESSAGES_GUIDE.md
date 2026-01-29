# Unparsed Messages Feature Guide

## Overview
The system now automatically tracks SMS messages that fail to parse and provides a workflow for makers to create patterns for them.

## How It Works

### 1. **Automatic Storage**
When an SMS message fails to parse (either from Dashboard single SMS or bulk JSON upload), the system automatically:
- Saves the message to the `unparsed_messages` table
- Records the bank address
- Stores the error message (why it failed)
- Associates it with the user who attempted to parse it
- Marks it as "unprocessed"

### 2. **Viewing Pending Messages (SMS Parser)**
Makers can view all their pending unparsed messages in the SMS Parser page:

**Access:**
- Go to SMS Parser page
- Look for the orange "Pending Messages" button in the top right corner
- The button shows a badge with the count of pending messages

**Modal Features:**
- Lists all unparsed messages in reverse chronological order (newest first)
- Shows bank address, timestamp, SMS text, and error message for each
- Two actions per message:
  - **"Use This"**: Auto-fills the form and marks the message as processed
  - **"Delete"**: Removes the message from the pending list

### 3. **Creating Patterns for Unparsed Messages**

**Workflow:**
1. Click "Pending Messages" button
2. Review the list of failed SMS messages
3. Click "Use This" on a message
4. The form auto-fills with:
   - Bank Address field → from the message
   - Sample Message field → the SMS text
5. Now manually fill in:
   - Bank Name
   - Regex Pattern
   - Category
   - Type
   - Merchant Name (optional)
6. Click "Match" to test your pattern
7. Click "Send to Approve" to submit

## Backend Architecture

### New Entity: `UnparsedMessage`
```java
- id: Long (Primary Key)
- bankAddress: String
- smsMessage: String (max 2000 chars)
- errorMessage: String (max 1000 chars)
- createdAt: LocalDateTime (auto-set)
- processed: boolean (default false)
- user: User (Many-to-One relationship)
```

### New Repository: `UnparsedMessageRepository`
Methods:
- `findByUserOrderByCreatedAtDesc(User user)` - Get all messages for a user
- `findByUserAndProcessedOrderByCreatedAtDesc(User user, boolean processed)` - Get pending/processed
- `countByUserAndProcessed(User user, boolean processed)` - Count pending messages

### New Service: `UnparsedMessageService`
Methods:
- `saveUnparsedMessage()` - Save a failed message
- `getAllUnparsedMessages()` - Get all messages for a user
- `getPendingMessages()` - Get unprocessed messages
- `getPendingCount()` - Get count of pending
- `markAsProcessed()` - Mark message as handled
- `deleteUnparsedMessage()` - Delete a message

### New Controller: `UnparsedMessageController`
Endpoints:
- `GET /api/unparsed-messages` - Get all messages
- `GET /api/unparsed-messages/pending` - Get pending messages only
- `GET /api/unparsed-messages/pending/count` - Get count of pending
- `PUT /api/unparsed-messages/{id}/mark-processed` - Mark as processed
- `DELETE /api/unparsed-messages/{id}` - Delete message

### Modified: `TransactionService`
- Updated `parseAndSave()` method to save unparsed messages when parsing fails
- Automatically stores the SMS, bank address, and error message before throwing exception

## Frontend Features

### Dashboard
- No UI changes needed
- Failed parses are automatically saved to the backend
- Works for both single SMS and bulk JSON uploads

### SMS Parser
**New State Variables:**
- `pendingMessages` - Array of pending messages
- `showPendingMessages` - Modal visibility
- `pendingCount` - Badge count
- `loadingPending` - Loading state

**New Functions:**
- `fetchPendingCount()` - Loads count on mount (useEffect)
- `fetchPendingMessages()` - Loads full list when button clicked
- `handleSelectPendingMessage()` - Auto-fills form and marks as processed
- `handleDeletePendingMessage()` - Deletes a message

**UI Components:**
1. **Pending Messages Button** (Top Right)
   - Orange background
   - Shows count badge
   - Only visible for makers when count > 0

2. **Pending Messages Modal**
   - Full-screen overlay
   - Scrollable list of messages
   - Each message card shows:
     - Bank address badge
     - Timestamp
     - SMS text in gray box
     - Error message in red box
     - Two action buttons

## User Workflow Example

### Scenario: Bulk Upload with Some Failures

1. **User uploads JSON** with 10 messages to Dashboard
2. **8 messages parse successfully**, 2 fail
3. **System automatically**:
   - Adds 8 transactions to dashboard
   - Saves 2 failed messages as unparsed
   - Shows warning: "2 message(s) failed to parse"

4. **User goes to SMS Parser**
5. **Sees "Pending Messages (2)" button** in orange
6. **Clicks button** to open modal
7. **Reviews first failed message**
8. **Clicks "Use This"**:
   - Form auto-fills with bank address and SMS
   - Message marked as processed
   - Button badge updates to "1"

9. **User creates regex pattern**:
   - Fills in bank name: "Federal Bank"
   - Creates pattern: `.*?Rs\.(?<amount>[\d,]+\.\d{2}).*?A/c\s+(?<accountNumber>\w+).*?`
   - Selects category: "OTHERS"
   - Clicks "Match" to test
   - Clicks "Send to Approve"

10. **Pattern saved** and sent to checker for approval

## Database Schema

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

## API Examples

### Get Pending Count
```http
GET /api/unparsed-messages/pending/count
Authorization: Bearer <token>

Response:
{
  "count": 5
}
```

### Get Pending Messages
```http
GET /api/unparsed-messages/pending
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "bankAddress": "FEDBNK",
    "smsMessage": "Hi, Rs.2000 credited...",
    "errorMessage": "Unable to parse SMS message. No matching pattern...",
    "createdAt": "2026-01-29T10:30:00",
    "processed": false
  }
]
```

### Mark as Processed
```http
PUT /api/unparsed-messages/1/mark-processed
Authorization: Bearer <token>

Response:
{
  "message": "Message marked as processed"
}
```

### Delete Message
```http
DELETE /api/unparsed-messages/1
Authorization: Bearer <token>

Response:
{
  "message": "Message deleted successfully"
}
```

## Benefits

1. **No Data Loss**: Failed messages are never lost
2. **Efficient Workflow**: Makers can batch-process failed messages
3. **Context Preservation**: Original error messages help debug
4. **User-Specific**: Each user only sees their own unparsed messages
5. **Automatic**: No manual tracking required
6. **Auto-Fill**: Reduces typing and errors
7. **Visual Feedback**: Clear count badge shows pending work

## Tips

1. **Regular Review**: Check pending messages regularly to improve pattern coverage
2. **Delete Spam**: If a message is spam or irrelevant, delete it instead of creating a pattern
3. **Pattern Testing**: Always test patterns with "Match" before submitting
4. **Bulk Processing**: Process similar messages together (same bank) for efficiency
5. **Error Analysis**: Review error messages to understand why parsing failed

## Troubleshooting

**Issue**: Pending count not updating
- **Solution**: Refresh the page or navigate away and back

**Issue**: Can't see pending messages button
- **Solution**: Check you're logged in as a "maker" role, and there are pending messages

**Issue**: "Use This" button doesn't work
- **Solution**: Check console for errors, ensure backend is running

**Issue**: Message not marked as processed
- **Solution**: Check network tab for API errors, verify user permissions

## Future Enhancements (Ideas)

- Auto-suggest bank name based on address
- Pattern similarity detection
- Bulk actions (delete all, mark all processed)
- Export pending messages to CSV
- Search/filter pending messages by bank address
- Statistics dashboard for unparsed message trends
