import { useTransactions } from '../../hooks/useTransactions';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { ParticleBackground } from '../components/ParticleBackground';
import { RupeeCoin } from '../components/RupeeSymbol';
import { GlassCard } from '../components/GlassCard';

export function Dashboard() {
  const { 
    transactions, 
    loading, 
    error,
    getTotalExpenses,
    getTransactionsByCategory 
  } = useTransactions();
  
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
  
  const totalExpenses = getTotalExpenses();
  const categoryData = getTransactionsByCategory().slice(0, 5);
  
  const yourExpenses = transactions
    .filter(t => t.user === 'You')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const wifeExpenses = transactions
    .filter(t => t.user === 'Wife')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <>
      <AnimatedBackground />
      <ParticleBackground />
      
      <div className="space-y-6 relative">
        {/* Header with Animated Rupee */}
        <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <RupeeCoin />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finome</h1>
          <p className="text-gray-600">Track your family expenses</p>
        </div>
        
        {/* Summary Card */}
        <GlassCard>
          <div className="bg-gradient-to-r from-[#EAB308] to-[#FCD34D] p-6 text-white rounded-t-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Expenses</p>
                <p className="text-3xl font-bold">₹{totalExpenses.toFixed(2)}</p>
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
            {categoryData.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No transactions yet. Add your first transaction!</p>
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
                            className="w-10 h-10 rounded-full flex items-center justify-center transform transition-transform hover:scale-110"
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
                      <div className="ml-13">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500 ease-out"
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
            )}
          </div>
        </GlassCard>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="p-4">
            <p className="text-sm text-gray-600 mb-1">Your Expenses</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{yourExpenses.toFixed(2)}
            </p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-sm text-gray-600 mb-1">Wife's Expenses</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{wifeExpenses.toFixed(2)}
            </p>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
