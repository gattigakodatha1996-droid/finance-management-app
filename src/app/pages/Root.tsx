import { useState } from 'react';
import { Outlet } from 'react-router';
import { Layout } from '../components/Layout';
import { AddTransactionDialog } from '../components/AddTransactionDialog';
import { transactionService } from '../../services/firebaseService';
import { toast } from 'sonner';

export function Root() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddTransaction = async (transaction: any) => {
    try {
      setIsLoading(true);
      
      // Save to Firebase
      const id = await transactionService.create({
        date: transaction.date,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description,
        user: transaction.user
      });
      
      console.log('Transaction saved to Firebase with ID:', id);
      
      // Show success message (optional - if you have toast notifications)
      // toast.success('Transaction added successfully!');
      
      // Reload the page to show new data
      window.location.reload();
      
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Failed to add transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Layout onAddTransaction={() => setIsAddDialogOpen(true)}>
        <Outlet />
      </Layout>
      
      <AddTransactionDialog
        isOpen={isAddDialogOpen}
        onClose={() => !isLoading && setIsAddDialogOpen(false)}
        onAdd={handleAddTransaction}
      />
    </>
  );
}
