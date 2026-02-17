import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';
import { MonthSelector } from '../components/MonthSelector';

export function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  const { 
    transactions, 
    loading, 
    error,
  } = useTransactions();
  
  // Filter transactions by selected month
  const filteredTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === selectedMonth.getMonth() &&
           transactionDate.getFullYear() === selectedMonth.getFullYear();
  });
  
  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  const lokisExpenses = filteredTransactions
    .filter(t => t.user === 'You')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const vasusExpenses = filteredTransactions
    .filter(t => t.user === 'Wife')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const categoryTotals = new Map<string, number>();
  filteredTransactions.forEach(transaction => {
    const current = categoryTotals.get(transaction.category) || 0;
    categoryTotals.set(transaction.category, current + transaction.amount);
  });
  
  const categoryData = Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-800">Error loading data: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header - Finome in BLACK */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: '#111827' }}>Finome</h1>
        <p className="text-gray-700">B-452 Spendings</p>
      </div>
      
      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#EAB308] to-[#FCD34D] p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Expenses</p>
              <p className="text-3xl font-bold">₹{totalExpenses.toFixed(2)}</p>
            </div>
            <MonthSelector
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
            />
          </div>
        </div>
        
        {/* Category Breakdown */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Categories</h3>
          {categoryData.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No transactions this month. Add your first transaction!</p>
          ) : (
            <div className="space-y-3">
              {categoryData.map((item) => {
                const Icon = getCategoryIcon(item.category);
                const color = getCategoryColor(item.category);
                const percentage = (item.amount / totalExpenses) * 100;
                
                return (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: color + '40' }}
                        >
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <span className="font-medium text-gray-900">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">₹{item.amount.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden ml-13">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Loki's Expenses</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{lokisExpenses.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Vasu's Expenses</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{vasusExpenses.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
