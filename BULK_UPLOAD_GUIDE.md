# Bulk SMS Upload Guide

## Overview
The Dashboard now supports bulk upload of SMS messages via JSON file. This allows you to parse multiple SMS messages at once instead of pasting them one by one.

## JSON File Format

Your JSON file must be an array of objects, where each object contains:
- `address`: The bank address/SMS ID (e.g., "BZ-SBIINB", "VM-HDFCBK")
- `message`: The complete SMS text message

### Example JSON Structure

```json
[
  {
    "address": "BZ-SBIINB",
    "message": "Dear UPI user A/C X6292 debited by 350.00 on date 14Jan26 trf to SWIGGY Refno 871684140146 If not u? call-1800111109-SBI"
  },
  {
    "address": "VM-HDFCBK",
    "message": "Alert: Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789"
  },
  {
    "address": "AX-ICICIB",
    "message": "Dear Customer, your Acct XX101 debited with INR 1,200.00 on 19-Jan-26. Info: BBPS-ELECTRICITY. Total Avl Bal: INR 8,501.00."
  }
]
```

## Supported Bank Addresses

You can use any of the following bank addresses in your JSON file:

- **State Bank of India**: `BZ-SBIINB`, `SBIINB`, `CBSSBI`, `SBIBNK`, `SBICRD`
- **HDFC Bank**: `VM-HDFCBK`, `HDFCBK`
- **ICICI Bank**: `AX-ICICIB`, `ICICIT`
- **Axis Bank**: `JD-AXISBK`, `AXISBK`
- **Kotak Bank**: `KM-KOTAKB`, `KOTAKB`
- **Punjab National Bank**: `PNBSMS`
- **Tata Mutual Fund**: `TATAMF`
- **Federal Bank**: `FEDBNK`
- **AU Bank**: `AUBANK`
- **IndusInd Bank**: `INDUSB`
- **Ujjivan Bank**: `UJJIVN`
- **Jana Bank**: `JANABK`
- **Standard Chartered**: `SCBANK`
- **IDFC First Bank**: `IDFCFB`
- **Canara Bank**: `CanBnk`
- **Maharashtra Bank**: `MAHABK`
- **OneCard**: `OneCrd`
- **Tru Credit**: `TRCRED`
- **Branch International**: `BRNCHI`
- **Generic**: `GENERIC`

## How to Use

1. **Prepare Your JSON File**
   - Create a new file with `.json` extension (e.g., `messages.json`)
   - Add your SMS messages following the format above
   - Save the file

2. **Upload the File**
   - Go to the Dashboard
   - Find the "Bulk Upload (JSON)" section
   - Click "Choose File" and select your JSON file
   - The system will automatically start processing

3. **Monitor Progress**
   - A progress bar will show how many messages have been processed
   - You'll see: "Processing messages... X / Y"

4. **Review Results**
   - Successfully parsed transactions will appear in a green box
   - All transactions will be added to your transaction list
   - If any messages fail to parse, you'll see a warning with the count

## Sample File

A sample JSON file (`sample-messages.json`) has been created in the project root directory. You can use it as a template or test the bulk upload feature.

## Features

- ✅ **Progress Tracking**: Real-time progress bar showing current/total messages
- ✅ **Error Handling**: Failed messages are logged and reported
- ✅ **Validation**: Automatic validation of JSON structure and required fields
- ✅ **Auto-Preview**: Successfully parsed transactions are displayed for 5 seconds
- ✅ **Batch Processing**: All transactions are added to your list at once

## Error Messages

- **"Please upload a valid JSON file"**: File must have `.json` extension
- **"JSON file must contain an array of messages"**: Root element must be an array `[]`
- **"Each message must have 'address' and 'message' fields"**: Missing required fields
- **"Invalid JSON format"**: Syntax error in JSON file
- **"X message(s) failed to parse"**: Some messages couldn't be matched to patterns

## Tips

1. **Validate JSON**: Use a JSON validator (like jsonlint.com) before uploading
2. **Check Bank Addresses**: Ensure addresses match the supported list
3. **Verify SMS Format**: Messages should match your bank's SMS format
4. **Start Small**: Test with 2-3 messages first before uploading large files
5. **Check Console**: For detailed error information, open browser developer console

## Notes

- The system processes messages sequentially (one by one)
- Processing time depends on the number of messages
- Failed messages don't stop the entire process
- Successfully parsed transactions are immediately added to your dashboard
