import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class test_regex {
    public static void main(String[] args) {
        String regex = "A/c\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|credited)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?via UPI to\\s+(?<merchant>[A-Z]+).*?Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}).*?Ref No:\\s+(?<refNumber>\\d+)";
        String sms = "Alert: Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789";
        
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(sms);
        
        if (matcher.find()) {
            System.out.println("MATCH FOUND!");
            System.out.println("Account: " + matcher.group("accountNumber"));
            System.out.println("Type: " + matcher.group("type"));
            System.out.println("Amount: " + matcher.group("amount"));
            System.out.println("Date: " + matcher.group("date"));
            System.out.println("Merchant: " + matcher.group("merchant"));
            System.out.println("Balance: " + matcher.group("balance"));
            System.out.println("Ref No: " + matcher.group("refNumber"));
        } else {
            System.out.println("NO MATCH!");
            
            // Test parts of the pattern
            System.out.println("\nTesting individual parts:");
            
            // Test 1: Basic account pattern
            if (Pattern.compile("A/c\\s+(?<accountNumber>\\w+)", Pattern.CASE_INSENSITIVE).matcher(sms).find()) {
                System.out.println("✓ Account number part matches");
            } else {
                System.out.println("✗ Account number part fails");
            }
            
            // Test 2: With type
            if (Pattern.compile("A/c\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|credited)", Pattern.CASE_INSENSITIVE).matcher(sms).find()) {
                System.out.println("✓ Type part matches");
            } else {
                System.out.println("✗ Type part fails");
            }
            
            // Test 3: With amount
            if (Pattern.compile("A/c\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|credited)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})", Pattern.CASE_INSENSITIVE).matcher(sms).find()) {
                System.out.println("✓ Amount part matches");
            } else {
                System.out.println("✗ Amount part fails");
            }
            
            // Test 4: Check the actual SMS structure
            System.out.println("\nActual SMS: " + sms);
            System.out.println("SMS starts with: " + sms.substring(0, Math.min(30, sms.length())));
        }
    }
}
