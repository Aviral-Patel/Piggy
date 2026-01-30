package com.piggy.backend.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CategoryTest {

    @Test
    void testCategoryValues() {
        Category[] categories = Category.values();
        assertEquals(6, categories.length);
    }

    @Test
    void testCategoryFood() {
        assertEquals("FOOD", Category.FOOD.name());
    }

    @Test
    void testCategoryShopping() {
        assertEquals("SHOPPING", Category.SHOPPING.name());
    }

    @Test
    void testCategoryEntertainment() {
        assertEquals("ENTERTAINMENT", Category.ENTERTAINMENT.name());
    }

    @Test
    void testCategoryTransport() {
        assertEquals("TRANSPORT", Category.TRANSPORT.name());
    }

    @Test
    void testCategoryUtilities() {
        assertEquals("UTILITIES", Category.UTILITIES.name());
    }

    @Test
    void testCategoryOthers() {
        assertEquals("OTHERS", Category.OTHERS.name());
    }

    @Test
    void testCategoryValueOf() {
        assertEquals(Category.FOOD, Category.valueOf("FOOD"));
        assertEquals(Category.SHOPPING, Category.valueOf("SHOPPING"));
        assertEquals(Category.ENTERTAINMENT, Category.valueOf("ENTERTAINMENT"));
        assertEquals(Category.TRANSPORT, Category.valueOf("TRANSPORT"));
        assertEquals(Category.UTILITIES, Category.valueOf("UTILITIES"));
        assertEquals(Category.OTHERS, Category.valueOf("OTHERS"));
    }
}
