import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MonthSelectorProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Generate last 12 months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date;
  });
  
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  const formatShortMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  return (
    <>
      <div className="month-selector-container">
        <button 
          className="month-selector-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{formatShortMonth(selectedMonth)}</span>
          <ChevronDown className={`chevron ${isOpen ? 'open' : ''}`} size={16} />
        </button>
        
        {isOpen && (
          <>
            <div className="month-selector-backdrop" onClick={() => setIsOpen(false)} />
            <div className="month-selector-dropdown">
              {months.map((month, index) => {
                const isSelected = 
                  month.getMonth() === selectedMonth.getMonth() &&
                  month.getFullYear() === selectedMonth.getFullYear();
                
                return (
                  <button
                    key={index}
                    className={`month-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onMonthChange(month);
                      setIsOpen(false);
                    }}
                  >
                    {formatMonth(month)}
                    {index === 0 && <span className="badge">Current</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      
      <style>{`
        .month-selector-container {
          position: relative;
        }
        
        .month-selector-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(234, 179, 8, 0.3);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #1F2937;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .month-selector-button:hover {
          background: white;
          border-color: #EAB308;
          box-shadow: 0 4px 12px rgba(234, 179, 8, 0.2);
          transform: translateY(-2px);
        }
        
        .chevron {
          transition: transform 0.3s ease;
        }
        
        .chevron.open {
          transform: rotate(180deg);
        }
        
        .month-selector-backdrop {
          position: fixed;
          inset: 0;
          z-index: 40;
        }
        
        .month-selector-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 220px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          z-index: 50;
          max-height: 400px;
          overflow-y: auto;
          padding: 8px;
          animation: dropdown-enter 0.2s ease;
        }
        
        .month-option {
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          border: none;
          background: transparent;
          border-radius: 10px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .month-option:hover {
          background: #FEF3C7;
          color: #1F2937;
        }
        
        .month-option.selected {
          background: linear-gradient(135deg, #EAB308, #FCD34D);
          color: white;
          font-weight: 600;
        }
        
        .badge {
          background: rgba(255, 255, 255, 0.3);
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }
        
        @keyframes dropdown-enter {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Scrollbar styling */
        .month-selector-dropdown::-webkit-scrollbar {
          width: 6px;
        }
        
        .month-selector-dropdown::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 10px;
        }
        
        .month-selector-dropdown::-webkit-scrollbar-thumb {
          background: #EAB308;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
