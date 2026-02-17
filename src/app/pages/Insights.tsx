import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTransactions } from '../../hooks/useTransactions';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';
import { MonthSelector } from '../components/MonthSelector';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Insights() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { transactions, loading, error } = useTransactions();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-2 border-surface-elevated border-t-accent-primary rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-destructive text-sm">{error}</div>
  );

  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth.getMonth() &&
           d.getFullYear() === selectedMonth.getFullYear();
  });

  const totalExpenses = filtered.reduce((s, t) => s + t.amount, 0);

  const categoryTotals = new Map<string, number>();
  filtered.forEach(t => categoryTotals.set(t.category, (categoryTotals.get(t.category) || 0) + t.amount));
  const categoryData = Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({ category, amount, percentage: totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : '0' }))
    .sort((a, b) => b.amount - a.amount);

  const prevMonth = () => {
    const d = new Date(selectedMonth);
    d.setMonth(d.getMonth() - 1);
    setSelectedMonth(d);
  };
  const nextMonth = () => {
    const d = new Date(selectedMonth);
    d.setMonth(d.getMonth() + 1);
    setSelectedMonth(d);
  };

  return (
    <div className="space-y-4">
      <div className="text-center pt-4 mb-2">
        <h1 className="text-3xl font-bold text-text-primary mb-1">Insights</h1>
        <p className="text-text-muted text-sm">Where your money goes</p>
      </div>

      <div className="bg-surface rounded-2xl border border-border-color overflow-hidden">
        {/* Period selector */}
        <div className="bg-gradient-to-r from-accent-dark via-accent-primary to-accent-glow p-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#fff_0%,_transparent_70%)]" />
          <div className="flex items-center justify-between relative z-10">
            <button onClick={prevMonth} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">
                {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="mt-4 relative z-10">
            <div className="bg-black/20 rounded-lg p-4 text-center border border-white/10">
              <p className="text-white/70 text-sm mb-1">Total Expenses</p>
              <p className="text-white font-bold text-2xl">₹{totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {totalExpenses === 0 ? (
          <div className="p-10 text-center">
            <p className="text-text-muted text-sm">No transactions this month</p>
          </div>
        ) : (
          <>
            {/* Pie chart */}
            <div className="p-6">
              <div className="relative" style={{ height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={3} dataKey="amount" stroke="none">
                      {categoryData.map((entry, i) => (
                        <Cell key={i} fill={getCategoryColor(entry.category)} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px', color: '#E6E6E6' }}
                      formatter={(value: number) => [`₹${value.toFixed(2)}`, '']}
                      labelStyle={{ color: '#BFBFBF' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent-primary">₹{totalExpenses.toFixed(0)}</p>
                    <p className="text-sm text-text-muted">Total</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 space-y-2">
                {categoryData.slice(0, 5).map((item) => (
                  <div key={item.category} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getCategoryColor(item.category) }} />
                      <span className="text-text-secondary font-medium">{item.category}</span>
                    </div>
                    <span className="font-semibold text-text-primary">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top lists */}
            <div className="border-t border-border-color p-6">
              <h3 className="font-bold text-text-primary mb-4">Top Spending</h3>
              <div className="space-y-4">
                {categoryData.slice(0, 5).map((item) => {
                  const Icon = getCategoryIcon(item.category);
                  const color = getCategoryColor(item.category);
                  const pct = totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0;
                  return (
                    <div key={item.category} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '22' }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1.5">
                          <span className="font-medium text-text-primary">{item.category}</span>
                          <span className="font-semibold text-text-primary">₹{item.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
                          </div>
                          <span className="text-sm text-text-muted min-w-[42px] text-right">{pct.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
