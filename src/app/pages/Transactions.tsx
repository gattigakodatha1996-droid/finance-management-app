import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionItem } from '../components/TransactionItem';
import { MonthSelector } from '../components/MonthSelector';

export function Transactions() {
  const [filter, setFilter] = useState<'all' | 'You' | 'Wife'>('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  const { transactions, loading, error } = useTransactions();
  
  if (loading) {
    return (
      <div className="romantic-loading">
        <div className="heart-loader">❤️</div>
        <p>Loading our memories...</p>
        <style>{`
          .romantic-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            gap: 16px;
          }
          .heart-loader {
            font-size: 48px;
            animation: heart-beat-load 1s ease-in-out infinite;
          }
          @keyframes heart-beat-load {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
          }
        `}</style>
      </div>
    );
  }
  
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  
  // Filter by month
  const monthFiltered = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === selectedMonth.getMonth() &&
           transactionDate.getFullYear() === selectedMonth.getFullYear();
  });
  
  const sortedTransactions = [...monthFiltered].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  
  const filteredTransactions = filter === 'all' 
    ? sortedTransactions 
    : sortedTransactions.filter(t => t.user === filter);
  
  const groupedByDate = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);
  
  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <div className="romantic-transactions">
      {/* Header Card */}
      <div className="transactions-header-card">
        <div className="header-row">
          <div>
            <h1 className="transactions-title">Our Spending Journey</h1>
            <p className="transactions-subtitle">Every rupee tells our story 💕</p>
          </div>
          <MonthSelector 
            selectedMonth={selectedMonth} 
            onMonthChange={setSelectedMonth} 
          />
        </div>
        
        <div className="total-display">
          <div className="total-label">Together We Spent</div>
          <div className="total-amount">₹{totalExpenses.toFixed(2)}</div>
        </div>
        
        {/* Filter Buttons */}
        <div className="filter-buttons-romantic">
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn-romantic ${filter === 'all' ? 'active' : ''} all-btn`}
          >
            <span className="filter-emoji">💑</span>
            <span>Both of Us</span>
          </button>
          <button
            onClick={() => setFilter('You')}
            className={`filter-btn-romantic ${filter === 'You' ? 'active' : ''} loki-btn`}
          >
            <span className="filter-emoji">👨</span>
            <span>Loki</span>
          </button>
          <button
            onClick={() => setFilter('Wife')}
            className={`filter-btn-romantic ${filter === 'Wife' ? 'active' : ''} vasu-btn`}
          >
            <span className="filter-emoji">👩</span>
            <span>Vasu</span>
          </button>
        </div>
      </div>
      
      {/* Transactions List */}
      <div className="transactions-list-romantic">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="empty-state-romantic">
            <div className="empty-icon">💐</div>
            <p className="empty-text">No spending this month</p>
            <p className="empty-subtext">Start your financial journey together!</p>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, transactions], index) => (
            <div key={date} className="date-group-romantic" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="date-header-romantic">
                <span className="date-icon">📅</span>
                <span className="date-text">{date}</span>
                <span className="date-count">{transactions.length} items</span>
              </div>
              <div className="transactions-items">
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      
      <style>{`
        .romantic-transactions {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        /* Header Card */
        .transactions-header-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-radius: 32px;
          padding: 32px;
          box-shadow: 
            0 20px 60px rgba(236, 72, 153, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          border: 2px solid rgba(251, 191, 36, 0.2);
          margin-bottom: 24px;
          animation: card-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        
        .transactions-title {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #DB2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 4px;
        }
        
        .transactions-subtitle {
          font-size: 14px;
          color: #6B7280;
          font-weight: 500;
        }
        
        .total-display {
          text-align: center;
          padding: 24px;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(236, 72, 153, 0.1));
          border-radius: 20px;
          margin-bottom: 24px;
        }
        
        .total-label {
          font-size: 14px;
          color: #6B7280;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .total-amount {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #F59E0B, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: amount-pulse 2s ease-in-out infinite;
        }
        
        /* Filter Buttons */
        .filter-buttons-romantic {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .filter-btn-romantic {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          border-radius: 16px;
          border: 2px solid transparent;
          background: rgba(249, 250, 251, 0.8);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
          color: #6B7280;
        }
        
        .filter-emoji {
          font-size: 24px;
        }
        
        .filter-btn-romantic:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        .filter-btn-romantic.active.all-btn {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(236, 72, 153, 0.2));
          border-color: #EC4899;
          color: #1F2937;
          box-shadow: 0 4px 16px rgba(236, 72, 153, 0.3);
        }
        
        .filter-btn-romantic.active.loki-btn {
          background: linear-gradient(135deg, #FBBF24, #F59E0B);
          border-color: #F59E0B;
          color: white;
          box-shadow: 0 4px 16px rgba(251, 191, 36, 0.4);
        }
        
        .filter-btn-romantic.active.vasu-btn {
          background: linear-gradient(135deg, #F472B6, #EC4899);
          border-color: #EC4899;
          color: white;
          box-shadow: 0 4px 16px rgba(236, 72, 153, 0.4);
        }
        
        /* Transactions List */
        .transactions-list-romantic {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .date-group-romantic {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.2);
          opacity: 0;
          animation: slide-up-romantic 0.6s ease-out forwards;
        }
        
        .date-header-romantic {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(236, 72, 153, 0.15));
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
        }
        
        .date-icon {
          font-size: 20px;
        }
        
        .date-text {
          flex: 1;
          font-weight: 700;
          color: #1F2937;
          font-size: 16px;
        }
        
        .date-count {
          font-size: 12px;
          color: #6B7280;
          background: rgba(255, 255, 255, 0.8);
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 600;
        }
        
        .transactions-items {
          padding: 8px;
        }
        
        /* Empty State */
        .empty-state-romantic {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(236, 72, 153, 0.1);
          border: 2px dashed rgba(236, 72, 153, 0.3);
        }
        
        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          animation: float-icon 3s ease-in-out infinite;
        }
        
        .empty-text {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 8px;
        }
        
        .empty-subtext {
          font-size: 14px;
          color: #6B7280;
        }
        
        /* Animations */
        @keyframes card-entrance {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes amount-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes slide-up-romantic {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        @media (max-width: 640px) {
          .header-row {
            flex-direction: column;
            gap: 16px;
          }
          
          .filter-buttons-romantic {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
