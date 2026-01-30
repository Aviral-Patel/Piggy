package com.piggy.backend.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class TransactionTypeTest {

    @Test
    void testTransactionTypeValues() {
        TransactionType[] types = TransactionType.values();
        assertEquals(4, types.length);
    }

    @Test
    void testTransactionTypeCredited() {
        assertEquals("CREDITED", TransactionType.CREDITED.name());
    }

    @Test
    void testTransactionTypeDebited() {
        assertEquals("DEBITED", TransactionType.DEBITED.name());
    }

    @Test
    void testTransactionTypeAlert() {
        assertEquals("ALERT", TransactionType.ALERT.name());
    }

    @Test
    void testTransactionTypeReminder() {
        assertEquals("REMINDER", TransactionType.REMINDER.name());
    }

    @Test
    void testTransactionTypeValueOf() {
        assertEquals(TransactionType.CREDITED, TransactionType.valueOf("CREDITED"));
        assertEquals(TransactionType.DEBITED, TransactionType.valueOf("DEBITED"));
        assertEquals(TransactionType.ALERT, TransactionType.valueOf("ALERT"));
        assertEquals(TransactionType.REMINDER, TransactionType.valueOf("REMINDER"));
    }
}
