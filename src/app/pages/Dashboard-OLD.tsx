import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';
import { EnhancedBackground } from '../components/EnhancedBackground';
import { RupeeCoin } from '../components/RupeeSymbol';
import { MonthSelector } from '../components/MonthSelector';

export function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  const { 
    transactions, 
    loading, 
    error,
    getTotalExpenses,
    getTransactionsByCategory 
  } = useTransactions();
  
  // Filter transactions by selected month
  const filteredTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === selectedMonth.getMonth() &&
           transactionDate.getFullYear() === selectedMonth.getFullYear();
  });
  
  // Calculate totals from filtered transactions
  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  const lokisExpenses = filteredTransactions
    .filter(t => t.user === 'You')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const vasusExpenses = filteredTransactions
    .filter(t => t.user === 'Wife')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Get category data from filtered transactions
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
          <div className="loading-spinner"></div>
          <p className="mt-4 text-gray-600">Loading your data...</p>
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
        <p className="text-red-800">Error loading data: {error}</p>
      </div>
    );
  }
  
  return (
    <>
      <EnhancedBackground />
      
      <div className="space-y-6 relative">
        {/* Header with Animated Rupee */}
        <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-4 mb-4 header-animate">
            <RupeeCoin />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 title-gradient">Finome</h1>
          <p className="text-gray-600 text-lg">B-452 Spendings</p>
        </div>
        
        {/* Summary Card */}
        <div className="glass-card-sexy">
          <div className="gradient-header">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Expenses</p>
                <p className="text-4xl font-bold amount-pulse">₹{totalExpenses.toFixed(2)}</p>
              </div>
              <MonthSelector 
                selectedMonth={selectedMonth} 
                onMonthChange={setSelectedMonth} 
              />
            </div>
          </div>
          
          {/* Category Breakdown */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Top Categories</h3>
            {categoryData.length === 0 ? (
              <div className="empty-state">
                <p className="text-gray-500 text-center py-8">
                  No transactions this month. Start tracking!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryData.map((item, index) => {
                  const Icon = getCategoryIcon(item.category);
                  const color = getCategoryColor(item.category);
                  const percentage = (item.amount / totalExpenses) * 100;
                  
                  return (
                    <div 
                      key={item.category} 
                      className="category-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="category-icon-wrapper"
                            style={{ backgroundColor: color + '40' }}
                          >
                            <Icon className="w-5 h-5" style={{ color }} />
                          </div>
                          <span className="font-medium text-gray-900">{item.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">₹{item.amount.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="ml-13">
                        <div className="progress-bar-bg">
                          <div 
                            className="progress-bar-fill"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: color,
                              animationDelay: `${index * 0.1 + 0.3}s`
                            }}
                          />
                        </div>
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
          <div className="stat-card stat-card-1">
            <p className="text-sm text-gray-600 mb-1">Loki's Expenses</p>
            <p className="text-3xl font-bold text-gray-900 amount-pulse">
              ₹{lokisExpenses.toFixed(2)}
            </p>
          </div>
          <div className="stat-card stat-card-2">
            <p className="text-sm text-gray-600 mb-1">Vasu's Expenses</p>
            <p className="text-3xl font-bold text-gray-900 amount-pulse">
              ₹{vasusExpenses.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        /* Header animations */
        .header-animate {
          animation: float-in 1s ease-out;
        }
        
        .title-gradient {
          background: linear-gradient(135deg, #EAB308, #FCD34D, #EAB308);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }
        
        /* Glass card with sexy effects */
        .glass-card-sexy {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          box-shadow: 
            0 20px 60px rgba(234, 179, 8, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: card-enter 0.6s ease-out;
        }
        
        .glass-card-sexy:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 
            0 30px 80px rgba(234, 179, 8, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.3) inset;
        }
        
        .gradient-header {
          background: linear-gradient(135deg, #EAB308 0%, #FCD34D 100%);
          padding: 24px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .gradient-header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
          animation: shimmer 3s ease-in-out infinite;
        }
        
        /* Amount pulse animation */
        .amount-pulse {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        
        /* Category item animations */
        .category-item {
          opacity: 0;
          animation: slide-in 0.5s ease-out forwards;
          padding: 12px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .category-item:hover {
          background: rgba(234, 179, 8, 0.05);
          transform: translateX(8px);
        }
        
        .category-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .category-item:hover .category-icon-wrapper {
          transform: scale(1.15) rotate(10deg);
          box-shadow: 0 8px 20px rgba(234, 179, 8, 0.3);
        }
        
        .progress-bar-bg {
          height: 8px;
          background: rgba(229, 231, 235, 0.6);
          border-radius: 999px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .progress-bar-fill {
          height: 100%;
          border-radius: 999px;
          opacity: 0;
          animation: progress-fill 1s ease-out forwards;
          box-shadow: 0 0 10px currentColor;
        }
        
        /* Stat cards */
        .stat-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(234, 179, 8, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.5);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #EAB308, #FCD34D);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        
        .stat-card:hover::before {
          transform: scaleX(1);
        }
        
        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(234, 179, 8, 0.2);
        }
        
        .stat-card-1 {
          animation: card-enter 0.6s ease-out 0.2s both;
        }
        
        .stat-card-2 {
          animation: card-enter 0.6s ease-out 0.3s both;
        }
        
        /* Empty state */
        .empty-state {
          background: linear-gradient(135deg, rgba(254, 243, 199, 0.3), rgba(253, 230, 138, 0.3));
          border-radius: 16px;
          border: 2px dashed rgba(234, 179, 8, 0.3);
        }
        
        /* Keyframe animations */
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shimmer {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-30%, -30%) rotate(180deg); }
        }
        
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes progress-fill {
          from {
            opacity: 0;
            width: 0 !important;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
