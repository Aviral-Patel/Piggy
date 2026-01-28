# Role-Based Access Control Implementation

## Overview
Implemented role-based access control to restrict access to SMS Parser and Template Approval pages to users with MAKER or CHECKER roles only.

## Changes Made

### 1. Created ProtectedRoute Component
**File:** `/client/src/components/ProtectedRoute.jsx`

- A reusable component that wraps protected routes
- Checks if user is authenticated
- Validates user role against allowed roles
- Shows appropriate error messages for unauthorized access
- Redirects unauthenticated users to login page

**Features:**
- Loading state handling
- Authentication check
- Role-based authorization
- User-friendly access denied page
- Configurable allowed roles via props

### 2. Updated App.jsx
**File:** `/client/src/App.jsx`

- Imported the ProtectedRoute component
- Wrapped SMS Parser route with ProtectedRoute allowing ['MAKER', 'CHECKER']
- Wrapped Template Approval route with ProtectedRoute allowing ['MAKER', 'CHECKER']

**Protected Routes:**
```javascript
/sms-parser - Accessible to MAKER and CHECKER roles
/template-approval - Accessible ONLY to CHECKER role
```

### 3. Enhanced SMSParser Component
**File:** `/client/src/pages/SMSParser.jsx`

- Added Navigate import from react-router-dom
- Added component-level role check as a second layer of security
- Redirects to dashboard if user doesn't have MAKER or CHECKER role

### 4. Enhanced TemplateApproval Component
**File:** `/client/src/pages/TemplateApproval.jsx`

- Added Navigate import from react-router-dom
- Added component-level role check as a second layer of security
- Redirects to dashboard if user doesn't have CHECKER role
- **ONLY CHECKER role can access this page**

## Security Layers

The implementation provides **two layers of security**:

1. **Route-level protection** (ProtectedRoute wrapper)
   - Prevents unauthorized route access
   - Shows access denied page
   - Handles authentication state

2. **Component-level protection** (within components)
   - Additional validation inside components
   - Redirects to dashboard if role check fails
   - Prevents any rendering of protected content

## User Experience

### For Users WITHOUT MAKER/CHECKER Role:
- Attempting to access `/sms-parser` or `/template-approval` shows an "Access Denied" page
- Clear message indicating required roles
- "Go Back" button to return to previous page

### For Users WITH MAKER Role:
- Can access SMS Parser page
- Dashboard shows "Go to SMS Parser" button
- **Cannot access Template Approval page** (will see "Access Denied")

### For Users WITH CHECKER Role:
- Can access both SMS Parser and Template Approval pages
- Dashboard shows "Go to Template Approval" button
- Full access to approve/reject templates

### For Unauthenticated Users:
- Automatically redirected to login page
- Must authenticate before accessing protected routes

## Roles Defined

Based on the backend Role enum:
- **USER** - Regular user (no access to SMS Parser or Template Approval)
- **ADMIN** - Administrator (no access to SMS Parser or Template Approval)
- **MAKER** - Can access SMS Parser page only (cannot access Template Approval)
- **CHECKER** - Can access both SMS Parser and Template Approval pages

## Testing the Implementation

1. **Test as USER role:**
   - Login with a USER role account
   - Try to navigate to `/sms-parser` or `/template-approval`
   - Should see "Access Denied" page

2. **Test as MAKER role:**
   - Login with a MAKER role account
   - Should see "Go to SMS Parser" button on dashboard
   - Can access `/sms-parser` page
   - **Cannot access `/template-approval`** - should see "Access Denied" page

3. **Test as CHECKER role:**
   - Login with a CHECKER role account
   - Should see "Go to Template Approval" button on dashboard
   - Can access both `/sms-parser` and `/template-approval` pages

4. **Test without authentication:**
   - Logout or clear localStorage
   - Try to access protected routes
   - Should be redirected to login page

## Files Modified

1. `/client/src/components/ProtectedRoute.jsx` - **NEW FILE**
2. `/client/src/App.jsx` - Modified
3. `/client/src/pages/SMSParser.jsx` - Modified
4. `/client/src/pages/TemplateApproval.jsx` - Modified

## Notes

- The implementation uses the existing UserContext for authentication state
- Role checking is case-insensitive (handles both uppercase and lowercase)
- The Dashboard already had role-based navigation buttons, which complement this implementation
- No backend changes were required as the role system was already in place
