import { mockTransactions, categories } from '../app/utils/mockData';
import { transactionService, categoryService } from '../services/firebaseService';

/**
 * Migration script to populate Firebase with initial data
 * Run this once to seed your database with mock data
 */
export async function migrateToFirebase() {
  try {
    console.log('Starting migration to Firebase...');

    // Step 1: Initialize categories
    console.log('Migrating categories...');
    await categoryService.initializeCategories(categories);
    console.log(`✓ ${categories.length} categories migrated`);

    // Step 2: Migrate transactions
    console.log('Migrating transactions...');
    await transactionService.batchCreate(
      mockTransactions.map(t => ({
        date: t.date,
        category: t.category,
        amount: t.amount,
        description: t.description,
        user: t.user
      }))
    );
    console.log(`✓ ${mockTransactions.length} transactions migrated`);

    console.log('✓ Migration completed successfully!');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// You can call this function from your app's initialization
// or create a separate admin page to run it
