import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MonthSelectorProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    return d;
  });

  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const fmtLong = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const isSameMonth = (a: Date, b: Date) =>
    a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated border border-border-color rounded-lg text-sm font-medium text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-all duration-200"
        >
          {fmt(selectedMonth)}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-52 bg-surface-elevated border border-border-color rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="max-h-72 overflow-y-auto">
                {months.map((month, i) => {
                  const selected = isSameMonth(month, selectedMonth);
                  return (
                    <button
                      key={i}
                      onClick={() => { onMonthChange(month); setIsOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        selected
                          ? 'bg-accent-primary text-white font-semibold'
                          : 'text-text-secondary hover:bg-surface hover:text-accent-primary'
                      }`}
                    >
                      {fmtLong(month)}
                      {i === 0 && !selected && (
                        <span className="text-xs text-text-muted bg-surface px-1.5 py-0.5 rounded">Now</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
