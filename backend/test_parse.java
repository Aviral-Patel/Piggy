import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class test_parse {
    public static void main(String[] args) {
        // Test with the exact SMS from the user's message
        String regex = "A/c\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|credited)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?via UPI to\\s+(?<merchant>[A-Z]+).*?Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}).*?Ref No:\\s+(?<refNumber>\\d+)";
        
        // Different variations to test
        String[] testMessages = {
            "Alert: Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789",
            "Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789",
            "A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789",
            "Alert: Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO Avl Bal: INR 15,420.50 Ref No: 60123456789"
        };
        
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        
        for (int i = 0; i < testMessages.length; i++) {
            System.out.println("\n=== Test " + (i+1) + " ===");
            System.out.println("SMS: " + testMessages[i]);
            Matcher matcher = pattern.matcher(testMessages[i]);
            
            if (matcher.find()) {
                System.out.println("✓ MATCH!");
                System.out.println("  Account: " + matcher.group("accountNumber"));
                System.out.println("  Type: " + matcher.group("type"));
                System.out.println("  Amount: " + matcher.group("amount"));
                System.out.println("  Merchant: " + matcher.group("merchant"));
            } else {
                System.out.println("✗ NO MATCH");
            }
        }
    }
}
