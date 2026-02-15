import { useState } from 'react';
import { mockTransactions } from '../utils/mockData';
import { TransactionItem } from '../components/TransactionItem';
import { ChevronDown } from 'lucide-react';

export function Transactions() {
  const [filter, setFilter] = useState<'all' | 'You' | 'Wife'>('all');
  const [sortedTransactions] = useState(
    [...mockTransactions].sort((a, b) => b.date.getTime() - a.date.getTime())
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
  }, {} as Record<string, typeof mockTransactions>);
  
  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium">
            February <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-[#EAB308] text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('You')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'You' 
                ? 'bg-[#EAB308] text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            You
          </button>
          <button
            onClick={() => setFilter('Wife')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'Wife' 
                ? 'bg-[#EAB308] text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Wife
          </button>
        </div>
      </div>
      
      {/* Transaction List */}
      <div className="space-y-4">
        {Object.entries(groupedByDate).map(([date, transactions]) => (
          <div key={date} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <p className="font-semibold text-gray-700">{date}</p>
            </div>
            <div className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}