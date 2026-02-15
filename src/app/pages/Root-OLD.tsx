import { useState } from 'react';
import { Outlet } from 'react-router';
import { Layout } from '../components/Layout';
import { AddTransactionDialog } from '../components/AddTransactionDialog';

export function Root() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const handleAddTransaction = (transaction: any) => {
    console.log('New transaction:', transaction);
    // In a real app, this would update the state/database
  };
  
  return (
    <>
      <Layout onAddTransaction={() => setIsAddDialogOpen(true)}>
        <Outlet />
      </Layout>
      
      <AddTransactionDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddTransaction}
      />
    </>
  );
}
