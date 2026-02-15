import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';
import { RomanticBackground } from '../components/RomanticBackground';
import { CoupleDisplay } from '../components/ProfilePic';
import { MonthSelector } from '../components/MonthSelector';

export function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  // IMPORTANT: Replace these URLs with your actual profile picture URLs
  const LOKI_IMAGE = "https://ibb.co/B5QW7pc8 ";
  const VASU_IMAGE = "https://ibb.co/9Ds24pn";
  
  const { 
    transactions, 
    loading, 
    error,
  } = useTransactions();
  
  // Filter by month
  const filteredTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === selectedMonth.getMonth() &&
           transactionDate.getFullYear() === selectedMonth.getFullYear();
  });
  
  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  const lokisExpenses = filteredTransactions
    .filter(t => t.user === 'You')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const vasusExpenses = filteredTransactions
    .filter(t => t.user === 'Wife')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const categoryTotals = new Map<string, number>();
  filteredTransactions.forEach(transaction => {
    const current = categoryTotals.get(transaction.category) || 0;
    categoryTotals.set(transaction.category, current + transaction.amount);
  });
  
  const categoryData = Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
  
  if (loading) {
    return (
      <div className="romantic-loading">
        <div className="heart-loader">❤️</div>
        <p>Loading our journey...</p>
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
  
  return (
    <>
      <RomanticBackground />
      
      <div className="romantic-dashboard">
        {/* Couple Header */}
        <div className="couple-header">
          <CoupleDisplay lokiImage={LOKI_IMAGE} vasuImage={VASU_IMAGE} />
          <h1 className="romantic-title">Our Love Story in Numbers</h1>
          <p className="romantic-subtitle">B-452 • Together We Manage</p>
        </div>
        
        {/* Together Card */}
        <div className="together-card">
          <div className="together-header">
            <div className="hearts-decoration">
              <span>💝</span>
              <span>Together This Month</span>
              <span>💝</span>
            </div>
            <MonthSelector 
              selectedMonth={selectedMonth} 
              onMonthChange={setSelectedMonth} 
            />
          </div>
          
          <div className="total-amount">
            <div className="amount-label">Our Combined Spending</div>
            <div className="amount-value">₹{totalExpenses.toFixed(2)}</div>
            <div className="amount-hearts">
              <span className="heart-beat">❤️</span>
              <span className="heart-beat" style={{ animationDelay: '0.2s' }}>💕</span>
              <span className="heart-beat" style={{ animationDelay: '0.4s' }}>💖</span>
            </div>
          </div>
          
          {/* Categories */}
          {categoryData.length > 0 && (
            <div className="categories-section">
              <h3 className="section-title">What We Spent On</h3>
              <div className="categories-list">
                {categoryData.map((item, index) => {
                  const Icon = getCategoryIcon(item.category);
                  const color = getCategoryColor(item.category);
                  const percentage = (item.amount / totalExpenses) * 100;
                  
                  return (
                    <div 
                      key={item.category}
                      className="category-item-romantic"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="category-header">
                        <div className="category-icon-romantic" style={{ backgroundColor: color + '30' }}>
                          <Icon className="icon" style={{ color }} />
                        </div>
                        <div className="category-info">
                          <div className="category-name">{item.category}</div>
                          <div className="category-amount">₹{item.amount.toFixed(2)}</div>
                        </div>
                        <div className="category-percent">{percentage.toFixed(1)}%</div>
                      </div>
                      <div className="progress-bar-romantic">
                        <div 
                          className="progress-fill-romantic"
                          style={{ 
                            width: `${percentage}%`,
                            background: `linear-gradient(90deg, ${color}, ${color}99)`,
                            animationDelay: `${index * 0.1 + 0.3}s`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Individual Cards */}
        <div className="individual-cards">
          {/* Loki's Card */}
          <div className="person-card loki-card">
            <div className="card-header">
              <div className="mini-avatar loki-avatar">
                <img src={LOKI_IMAGE} alt="Loki" />
              </div>
              <div className="person-name">Loki's Share</div>
            </div>
            <div className="person-amount">₹{lokisExpenses.toFixed(2)}</div>
            <div className="percentage-of-total">
              {totalExpenses > 0 ? ((lokisExpenses / totalExpenses) * 100).toFixed(1) : 0}% of total
            </div>
          </div>
          
          {/* Vasu's Card */}
          <div className="person-card vasu-card">
            <div className="card-header">
              <div className="mini-avatar vasu-avatar">
                <img src={VASU_IMAGE} alt="Vasu" />
              </div>
              <div className="person-name">Vasu's Share</div>
            </div>
            <div className="person-amount">₹{vasusExpenses.toFixed(2)}</div>
            <div className="percentage-of-total">
              {totalExpenses > 0 ? ((vasusExpenses / totalExpenses) * 100).toFixed(1) : 0}% of total
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .romantic-dashboard {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          animation: dashboard-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        /* Couple Header */
        .couple-header {
          text-align: center;
          margin-bottom: 32px;
          animation: float-in 1s ease-out;
        }
        
        .romantic-title {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #DB2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 16px 0 8px;
          animation: title-shimmer 3s ease-in-out infinite;
        }
        
        .romantic-subtitle {
          font-size: 18px;
          color: #6B7280;
          font-weight: 500;
        }
        
        /* Together Card */
        .together-card {
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
        
        .together-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .hearts-decoration {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
        }
        
        .hearts-decoration span:first-child,
        .hearts-decoration span:last-child {
          font-size: 24px;
          animation: heart-pulse-dec 2s ease-in-out infinite;
        }
        
        .total-amount {
          text-align: center;
          padding: 32px;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(236, 72, 153, 0.1));
          border-radius: 24px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }
        
        .total-amount::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer-sweep 3s ease-in-out infinite;
        }
        
        .amount-label {
          font-size: 14px;
          color: #6B7280;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .amount-value {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #F59E0B, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
          animation: amount-pulse 2s ease-in-out infinite;
        }
        
        .amount-hearts {
          display: flex;
          justify-content: center;
          gap: 12px;
          font-size: 24px;
        }
        
        .heart-beat {
          display: inline-block;
          animation: heart-beat 1.5s ease-in-out infinite;
        }
        
        /* Categories */
        .categories-section {
          margin-top: 32px;
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .category-item-romantic {
          opacity: 0;
          animation: slide-in-romantic 0.6s ease-out forwards;
          background: rgba(255, 255, 255, 0.6);
          padding: 16px;
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        
        .category-item-romantic:hover {
          transform: translateX(8px);
          background: rgba(255, 255, 255, 0.9);
        }
        
        .category-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .category-icon-romantic {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .category-icon-romantic .icon {
          width: 24px;
          height: 24px;
        }
        
        .category-info {
          flex: 1;
        }
        
        .category-name {
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 4px;
        }
        
        .category-amount {
          font-size: 14px;
          color: #6B7280;
          font-weight: 500;
        }
        
        .category-percent {
          font-size: 16px;
          font-weight: 700;
          color: #EC4899;
        }
        
        .progress-bar-romantic {
          height: 8px;
          background: rgba(229, 231, 235, 0.5);
          border-radius: 999px;
          overflow: hidden;
        }
        
        .progress-fill-romantic {
          height: 100%;
          border-radius: 999px;
          opacity: 0;
          animation: progress-fill-romantic 1s ease-out forwards;
          box-shadow: 0 0 12px currentColor;
        }
        
        /* Individual Cards */
        .individual-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        
        .person-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid;
          animation: card-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .loki-card {
          border-color: rgba(251, 191, 36, 0.3);
          animation-delay: 0.2s;
        }
        
        .vasu-card {
          border-color: rgba(236, 72, 153, 0.3);
          animation-delay: 0.3s;
        }
        
        .person-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .mini-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          padding: 3px;
          animation: avatar-pulse 3s ease-in-out infinite;
        }
        
        .loki-avatar {
          background: linear-gradient(135deg, #FBBF24, #F59E0B);
        }
        
        .vasu-avatar {
          background: linear-gradient(135deg, #F472B6, #DB2777);
        }
        
        .mini-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
        }
        
        .person-name {
          font-weight: 700;
          color: #1F2937;
          font-size: 16px;
        }
        
        .person-amount {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        
        .loki-card .person-amount {
          background: linear-gradient(135deg, #FBBF24, #F59E0B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .vasu-card .person-amount {
          background: linear-gradient(135deg, #F472B6, #DB2777);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .percentage-of-total {
          font-size: 14px;
          color: #6B7280;
          font-weight: 600;
        }
        
        /* Animations */
        @keyframes dashboard-enter {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes title-shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes card-entrance {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes heart-pulse-dec {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        
        @keyframes shimmer-sweep {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
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
        
        @keyframes heart-beat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.3);
          }
          20%, 40% {
            transform: scale(1);
          }
        }
        
        @keyframes slide-in-romantic {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes progress-fill-romantic {
          from {
            opacity: 0;
            width: 0 !important;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes card-pop {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes avatar-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 currentColor;
          }
          50% {
            box-shadow: 0 0 20px 8px transparent;
          }
        }
        
        @media (max-width: 640px) {
          .individual-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
