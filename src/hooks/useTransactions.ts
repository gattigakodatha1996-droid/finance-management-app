import { useState, useEffect } from 'react';
import { Transaction } from '../app/utils/mockData';
import { transactionService } from '../services/firebaseService';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      setError(null);
      const id = await transactionService.create(transaction);
      setTransactions(prev => [{ ...transaction, id }, ...prev]);
      return id;
    } catch (err) {
      setError('Failed to add transaction');
      console.error(err);
      throw err;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Omit<Transaction, 'id'>>) => {
    try {
      setError(null);
      await transactionService.update(id, updates);
      setTransactions(prev =>
        prev.map(t => (t.id === id ? { ...t, ...updates } : t))
      );
    } catch (err) {
      setError('Failed to update transaction');
      console.error(err);
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      setError(null);
      await transactionService.delete(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete transaction');
      console.error(err);
      throw err;
    }
  };

  const getTransactionsByCategory = () => {
    const categoryTotals = new Map<string, number>();
    
    transactions.forEach(transaction => {
      const current = categoryTotals.get(transaction.category) || 0;
      categoryTotals.set(transaction.category, current + transaction.amount);
    });
    
    return Array.from(categoryTotals.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getTotalExpenses = () => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const getTransactionsByUser = (user: 'You' | 'Wife') => {
    return transactions.filter(t => t.user === user);
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refreshTransactions: fetchTransactions,
    getTransactionsByCategory,
    getTotalExpenses,
    getTransactionsByUser
  };
}
