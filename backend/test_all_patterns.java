import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class test_all_patterns {
    public static void main(String[] args) {
        String sms = "Alert: Your A/c XX5678 debited for INR 2,500.00 on 10-Jan-26 via UPI to ZOMATO. Avl Bal: INR 15,420.50. Ref No: 60123456789";
        
        String[][] patterns = {
            {"Pattern 1 (UPI by)", "A/C\\s+(?<accountNumber>\\w+).*?(?<type>debited|credited)\\s+by\\s+(?<amount>[\\d.]+).*?on date\\s+(?<date>\\d{1,2}\\w{3}\\d{2}).*?trf to\\s+(?<merchant>[A-Z][A-Z\\s]+?)(?=\\s+Refno).*?Refno\\s+(?<refNumber>\\d+).*?(?<bankName>\\w+)$"},
            {"Pattern 2 (UPI to)", "A/c\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|credited)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?via UPI to\\s+(?<merchant>[A-Z]+).*?Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2}).*?Ref No:\\s+(?<refNumber>\\d+)"},
            {"Pattern 3 (Acct credited)", "Acct\\s+(?<accountNumber>\\w+)\\s+(?<type>credited|debited)\\s+with\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>[\\w\\-]+).*?Total Avl Bal:\\s+INR\\s+(?<balance>[\\d,]+\\.\\d{2})"},
            {"Pattern 11 (Info)", "A/c\\s+(?<accountNumber>\\w+)\\s+(?<type>debited|credited)\\s+for\\s+INR\\s+(?<amount>[\\d,]+\\.\\d{2})\\s+on\\s+(?<date>\\d{1,2}-\\w{3}-\\d{2}).*?Info:\\s+(?<merchant>[\\w\\s]+)"}
        };
        
        System.out.println("Testing SMS: " + sms);
        System.out.println("\n" + "=".repeat(80) + "\n");
        
        for (String[] patternInfo : patterns) {
            String name = patternInfo[0];
            String regex = patternInfo[1];
            
            Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(sms);
            
            System.out.println(name + ":");
            if (matcher.find()) {
                System.out.println("  ✓ MATCHES!");
                try { System.out.println("    Account: " + matcher.group("accountNumber")); } catch (Exception e) {}
                try { System.out.println("    Type: " + matcher.group("type")); } catch (Exception e) {}
                try { System.out.println("    Amount: " + matcher.group("amount")); } catch (Exception e) {}
                try { System.out.println("    Merchant: " + matcher.group("merchant")); } catch (Exception e) {}
            } else {
                System.out.println("  ✗ No match");
            }
            System.out.println();
        }
    }
}
