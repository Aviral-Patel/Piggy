package com.piggy.backend.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PatternStatusTest {

    @Test
    void testPatternStatusValues() {
        PatternStatus[] statuses = PatternStatus.values();
        assertEquals(4, statuses.length);
    }

    @Test
    void testPatternStatusApproved() {
        assertEquals("APPROVED", PatternStatus.APPROVED.name());
    }

    @Test
    void testPatternStatusPending() {
        assertEquals("PENDING", PatternStatus.PENDING.name());
    }

    @Test
    void testPatternStatusRejected() {
        assertEquals("REJECTED", PatternStatus.REJECTED.name());
    }

    @Test
    void testPatternStatusDraft() {
        assertEquals("DRAFT", PatternStatus.DRAFT.name());
    }

    @Test
    void testPatternStatusValueOf() {
        assertEquals(PatternStatus.APPROVED, PatternStatus.valueOf("APPROVED"));
        assertEquals(PatternStatus.PENDING, PatternStatus.valueOf("PENDING"));
        assertEquals(PatternStatus.REJECTED, PatternStatus.valueOf("REJECTED"));
        assertEquals(PatternStatus.DRAFT, PatternStatus.valueOf("DRAFT"));
    }
}
