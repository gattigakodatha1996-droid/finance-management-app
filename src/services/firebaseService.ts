import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Transaction } from '../app/utils/mockData';

const TRANSACTIONS_COLLECTION = 'transactions';
const CATEGORIES_COLLECTION = 'categories';

// Convert Firestore Timestamp to Date
const timestampToDate = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};

// Convert Date to Firestore Timestamp
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// Transaction CRUD operations
export const transactionService = {
  // Create a new transaction
  async create(transaction: Omit<Transaction, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, TRANSACTIONS_COLLECTION), {
        ...transaction,
        date: dateToTimestamp(transaction.date),
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Get all transactions
  async getAll(): Promise<Transaction[]> {
    try {
      const q = query(
        collection(db, TRANSACTIONS_COLLECTION),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: timestampToDate(doc.data().date)
      })) as Transaction[];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Get transactions by user
  async getByUser(user: 'You' | 'Wife'): Promise<Transaction[]> {
    try {
      const q = query(
        collection(db, TRANSACTIONS_COLLECTION),
        where('user', '==', user),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: timestampToDate(doc.data().date)
      })) as Transaction[];
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      throw error;
    }
  },

  // Get transactions by category
  async getByCategory(category: string): Promise<Transaction[]> {
    try {
      const q = query(
        collection(db, TRANSACTIONS_COLLECTION),
        where('category', '==', category),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: timestampToDate(doc.data().date)
      })) as Transaction[];
    } catch (error) {
      console.error('Error fetching category transactions:', error);
      throw error;
    }
  },

  // Get transactions by date range
  async getByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    try {
      const q = query(
        collection(db, TRANSACTIONS_COLLECTION),
        where('date', '>=', dateToTimestamp(startDate)),
        where('date', '<=', dateToTimestamp(endDate)),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: timestampToDate(doc.data().date)
      })) as Transaction[];
    } catch (error) {
      console.error('Error fetching transactions by date range:', error);
      throw error;
    }
  },

  // Update a transaction
  async update(id: string, transaction: Partial<Omit<Transaction, 'id'>>): Promise<void> {
    try {
      const docRef = doc(db, TRANSACTIONS_COLLECTION, id);
      const updateData: any = { ...transaction };
      
      if (transaction.date) {
        updateData.date = dateToTimestamp(transaction.date);
      }
      updateData.updatedAt = Timestamp.now();
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  // Delete a transaction
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, TRANSACTIONS_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  // Batch create transactions (useful for importing mock data)
  async batchCreate(transactions: Omit<Transaction, 'id'>[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      transactions.forEach(transaction => {
        const docRef = doc(collection(db, TRANSACTIONS_COLLECTION));
        batch.set(docRef, {
          ...transaction,
          date: dateToTimestamp(transaction.date),
          createdAt: Timestamp.now()
        });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error batch creating transactions:', error);
      throw error;
    }
  }
};

// Category operations
export const categoryService = {
  // Initialize categories in Firestore
  async initializeCategories(categories: string[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      categories.forEach(category => {
        const docRef = doc(collection(db, CATEGORIES_COLLECTION));
        batch.set(docRef, {
          name: category,
          createdAt: Timestamp.now()
        });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error initializing categories:', error);
      throw error;
    }
  },

  // Get all categories
  async getAll(): Promise<string[]> {
    try {
      const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
      return querySnapshot.docs.map(doc => doc.data().name as string);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};
