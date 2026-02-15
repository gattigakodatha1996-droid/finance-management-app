import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../../hooks/useTransactions';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Insights() {
  // Get data from Firebase
  const { 
    transactions,
    loading, 
    error,
    getTotalExpenses,
    getTransactionsByCategory 
  } = useTransactions();
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading insights...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-800">Error loading insights: {error}</p>
      </div>
    );
  }
  
  const categoryData = getTransactionsByCategory();
  const totalExpenses = getTotalExpenses();
  
  // Prepare data for pie chart
  const chartData = categoryData.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: ((item.amount / totalExpenses) * 100).toFixed(1)
  }));
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center pt-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Get personalized insights
        </h1>
      </div>
      
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Period Selector */}
        <div className="bg-gradient-to-r from-[#EAB308] to-[#FCD34D] p-4">
          <div className="flex items-center justify-between">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">February 2026</p>
              <div className="flex gap-2 mt-2">
                <button className="px-4 py-1 bg-gray-900 text-white rounded-lg text-sm font-medium">
                  Month
                </button>
                <button className="px-4 py-1 bg-white/20 text-white rounded-lg text-sm font-medium">
                  Year
                </button>
              </div>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="mt-4">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm text-center">
              <p className="text-white/80 text-sm mb-1">Total Expenses</p>
              <p className="text-white font-bold text-2xl">$ {totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        {/* Pie Chart */}
        <div className="p-6">
          {chartData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No data to display. Add transactions to see insights!</p>
            </div>
          ) : (
            <>
              <div className="relative" style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name)} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(0)}</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </div>
              </div>
              
              {/* Category Legend */}
              <div className="mt-6 space-y-2">
                {chartData.slice(0, 5).map((item) => {
                  const Icon = getCategoryIcon(item.name);
                  const color = getCategoryColor(item.name);
                  
                  return (
                    <div key={item.name} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-gray-900 font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-gray-900">{item.percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        
        {/* Top Lists Section */}
        {categoryData.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Top lists</h3>
            <div className="space-y-3">
              {categoryData.slice(0, 5).map((item) => {
                const Icon = getCategoryIcon(item.category);
                const color = getCategoryColor(item.category);
                const percentage = (item.amount / totalExpenses) * 100;
                
                return (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: color + '40' }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{item.category}</span>
                          <span className="font-semibold text-gray-900">${item.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: color 
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 min-w-[45px] text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
