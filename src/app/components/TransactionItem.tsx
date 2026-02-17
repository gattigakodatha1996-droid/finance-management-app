import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Transaction } from '../utils/mockData';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete?: () => void;
}

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const Icon = getCategoryIcon(transaction.category);
  const color = getCategoryColor(transaction.category);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete?.();
    } catch {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 py-3 px-4 hover:bg-surface-elevated transition-colors group">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '22' }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-text-primary">{transaction.category}</div>
          <div className="text-sm text-text-muted">{transaction.description}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-semibold text-text-primary">₹{transaction.amount.toFixed(2)}</div>
            <div className="text-xs text-text-muted">{transaction.user === 'You' ? 'Loki' : 'Vasu'}</div>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-destructive/10 text-text-muted hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border-color rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-destructive/10 border border-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Delete Transaction?</h3>
              <p className="text-text-secondary text-sm">
                <span className="font-semibold">{transaction.category}</span> · ₹{transaction.amount.toFixed(2)}
              </p>
              <p className="text-text-muted text-xs mt-1">This cannot be undone</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border-color text-text-secondary hover:bg-surface-elevated transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 rounded-xl bg-destructive hover:bg-destructive/80 text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><Trash2 className="w-4 h-4" /> Delete</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
