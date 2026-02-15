import { getTotalExpenses, getTransactionsByCategory } from '../utils/mockData';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';

export function Dashboard() {
  const totalExpenses = getTotalExpenses();
  const categoryData = getTransactionsByCategory().slice(0, 5);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Money Manager</h1>
        <p className="text-gray-600">Track your family expenses</p>
      </div>
      
      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#EAB308] to-[#FCD34D] p-6 text-white">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Expenses</p>
              <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">This Month</p>
              <p className="text-lg font-semibold">Feb 2026</p>
            </div>
          </div>
        </div>
        
        {/* Category Breakdown */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Categories</h3>
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
                      <div className="font-semibold text-gray-900">${item.amount.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className="ml-13">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Your Expenses</p>
          <p className="text-2xl font-bold text-gray-900">
            ${(totalExpenses * 0.55).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Wife's Expenses</p>
          <p className="text-2xl font-bold text-gray-900">
            ${(totalExpenses * 0.45).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}