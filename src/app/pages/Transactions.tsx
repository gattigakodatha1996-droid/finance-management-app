import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionItem } from '../components/TransactionItem';
import { MonthSelector } from '../components/MonthSelector';

export function Transactions() {
  const [filter, setFilter] = useState<'all' | 'You' | 'Wife'>('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  const { transactions, loading, error } = useTransactions();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="mt-4 text-gray-600">Loading transactions...</p>
          <style>{`
            .loading-spinner {
              width: 48px;
              height: 48px;
              border: 4px solid #FEF3C7;
              border-top-color: #EAB308;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-800">Error loading transactions: {error}</p>
      </div>
    );
  }
  
  // Filter by selected month
  const monthFiltered = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === selectedMonth.getMonth() &&
           transactionDate.getFullYear() === selectedMonth.getFullYear();
  });
  
  // Sort by date
  const sortedTransactions = [...monthFiltered].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  
  const filteredTransactions = filter === 'all' 
    ? sortedTransactions 
    : sortedTransactions.filter(t => t.user === filter);
  
  // Group by date
  const groupedByDate = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);
  
  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <MonthSelector 
            selectedMonth={selectedMonth} 
            onMonthChange={setSelectedMonth} 
          />
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
          <p className="text-3xl font-bold text-gray-900 amount-pulse">₹{totalExpenses.toFixed(2)}</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('You')}
            className={`filter-btn ${filter === 'You' ? 'active' : ''}`}
          >
            Loki
          </button>
          <button
            onClick={() => setFilter('Wife')}
            className={`filter-btn ${filter === 'Wife' ? 'active' : ''}`}
          >
            Vasu
          </button>
        </div>
      </div>
      
      {/* Transaction List */}
      <div className="space-y-4">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="glass-card text-center py-12">
            <p className="text-gray-500">No transactions this month.</p>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, transactions], index) => (
            <div key={date} className="transaction-group" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="date-header">
                <p className="font-semibold text-gray-700">{date}</p>
              </div>
              <div className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(234, 179, 8, 0.15);
          padding: 24px;
          animation: card-enter 0.6s ease-out;
        }
        
        .amount-pulse {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        
        .filter-btn {
          flex: 1;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid transparent;
          background: rgba(229, 231, 235, 0.5);
          color: #6B7280;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .filter-btn:hover {
          background: rgba(254, 243, 199, 0.8);
          color: #1F2937;
          transform: translateY(-2px);
        }
        
        .filter-btn.active {
          background: linear-gradient(135deg, #EAB308, #FCD34D);
          color: white;
          border-color: #F59E0B;
          box-shadow: 0 4px 12px rgba(234, 179, 8, 0.4);
        }
        
        .transaction-group {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(234, 179, 8, 0.1);
          overflow: hidden;
          opacity: 0;
          animation: slide-up 0.5s ease-out forwards;
        }
        
        .date-header {
          background: rgba(249, 250, 251, 0.8);
          padding: 12px 20px;
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
        }
        
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
