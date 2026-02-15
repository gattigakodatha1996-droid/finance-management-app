import { Transaction } from '../utils/mockData';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const Icon = getCategoryIcon(transaction.category);
  const color = getCategoryColor(transaction.category);
  
  return (
    <div className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + '40' }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900">{transaction.category}</div>
        <div className="text-sm text-gray-500">{transaction.description}</div>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-gray-900">
          ${transaction.amount.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500">{transaction.user}</div>
      </div>
    </div>
  );
}