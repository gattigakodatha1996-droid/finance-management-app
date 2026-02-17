import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';
import { MonthSelector } from '../components/MonthSelector';

export function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { transactions, loading, error } = useTransactions();

  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth.getMonth() &&
           d.getFullYear() === selectedMonth.getFullYear();
  });

  const totalExpenses = filtered.reduce((s, t) => s + t.amount, 0);
  const lokiTotal = filtered.filter(t => t.user === 'You').reduce((s, t) => s + t.amount, 0);
  const vasuTotal = filtered.filter(t => t.user === 'Wife').reduce((s, t) => s + t.amount, 0);

  const categoryTotals = new Map<string, number>();
  filtered.forEach(t => categoryTotals.set(t.category, (categoryTotals.get(t.category) || 0) + t.amount));
  const categoryData = Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-2 border-surface-elevated border-t-accent-primary rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-destructive text-sm">{error}</div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold text-text-primary mb-1">Finome</h1>
        <p className="text-text-muted text-sm">B-452 Spendings</p>
      </div>

      {/* Summary Card */}
      <div className="bg-surface rounded-2xl overflow-hidden border border-border-color">
        <div className="bg-gradient-to-r from-accent-dark via-accent-primary to-accent-glow p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#fff_0%,_transparent_70%)]" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-white/70 text-sm mb-1">Total Expenses</p>
              <p className="text-3xl font-bold text-white">₹{totalExpenses.toFixed(2)}</p>
            </div>
            <MonthSelector selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-text-primary mb-4">Top Categories</h3>
          {categoryData.length === 0 ? (
            <p className="text-text-muted text-center py-6 text-sm">No transactions this month</p>
          ) : (
            <div className="space-y-4">
              {categoryData.map((item) => {
                const Icon = getCategoryIcon(item.category);
                const color = getCategoryColor(item.category);
                const pct = totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0;
                return (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '22' }}>
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <span className="font-medium text-text-primary">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-text-primary">₹{item.amount.toFixed(2)}</div>
                        <div className="text-sm text-text-muted">{pct.toFixed(1)}%</div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
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
        <div className="bg-surface rounded-xl border border-border-color p-4">
          <p className="text-sm text-text-muted mb-1">Loki's Expenses</p>
          <p className="text-2xl font-bold text-accent-primary">₹{lokiTotal.toFixed(2)}</p>
        </div>
        <div className="bg-surface rounded-xl border border-border-color p-4">
          <p className="text-sm text-text-muted mb-1">Vasu's Expenses</p>
          <p className="text-2xl font-bold text-accent-glow">₹{vasuTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
