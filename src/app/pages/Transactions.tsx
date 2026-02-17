import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionItem } from '../components/TransactionItem';
import { MonthSelector } from '../components/MonthSelector';

export function Transactions() {
  const [filter, setFilter] = useState<'all' | 'You' | 'Wife'>('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { transactions, loading, error, deleteTransaction } = useTransactions();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-2 border-surface-elevated border-t-accent-primary rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-destructive text-sm">{error}</div>
  );

  // Filter by month first
  const monthFiltered = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth.getMonth() &&
           d.getFullYear() === selectedMonth.getFullYear();
  });

  // Then by user
  const filtered = filter === 'all' ? monthFiltered : monthFiltered.filter(t => t.user === filter);

  // Sort newest first
  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group by date
  const grouped = sorted.reduce((groups, t) => {
    const key = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
    return groups;
  }, {} as Record<string, typeof transactions>);

  const total = filtered.reduce((s, t) => s + t.amount, 0);

  const filterBtn = (active: boolean) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
      active
        ? 'bg-accent-primary text-white shadow-accent-glow'
        : 'bg-surface-elevated border border-border-color text-text-secondary hover:text-accent-primary hover:border-accent-primary'
    }`;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-surface rounded-2xl border border-border-color p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-text-primary">Transactions</h1>
          <MonthSelector selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
        </div>

        <div className="mb-4">
          <p className="text-sm text-text-muted mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-accent-primary">₹{total.toFixed(2)}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setFilter('all')}  className={filterBtn(filter === 'all')}>All</button>
          <button onClick={() => setFilter('You')}  className={filterBtn(filter === 'You')}>Loki</button>
          <button onClick={() => setFilter('Wife')} className={filterBtn(filter === 'Wife')}>Vasu</button>
        </div>
      </div>

      {/* List */}
      {Object.keys(grouped).length === 0 ? (
        <div className="bg-surface border border-border-color rounded-2xl p-10 text-center">
          <p className="text-text-muted text-sm">No transactions this month</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([date, txns]) => (
            <div key={date} className="bg-surface rounded-2xl border border-border-color overflow-hidden">
              <div className="bg-surface-elevated px-4 py-2 border-b border-border-color">
                <p className="font-semibold text-text-muted text-sm">{date}</p>
              </div>
              <div className="divide-y divide-border-color">
                {txns.map(t => (
                  <TransactionItem
                    key={t.id}
                    transaction={t}
                    onDelete={() => deleteTransaction(t.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
