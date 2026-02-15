import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, List, PieChart, Plus } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  onAddTransaction?: () => void;
}

export function Layout({ children, onAddTransaction }: LayoutProps) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/transactions', icon: List, label: 'Transactions' },
    { path: '/insights', icon: PieChart, label: 'Insights' }
  ];
  
  return (
    <>
      <div className="min-h-screen pb-20" style={{ background: 'transparent' }}>
        <div className="max-w-2xl mx-auto px-4 py-6">
          {children}
        </div>
        
        {/* Floating Add Button with Sexy Animation */}
        <button
          onClick={onAddTransaction}
          className="fab-button"
          aria-label="Add transaction"
        >
          <Plus className="w-6 h-6 text-white fab-icon" />
          <div className="fab-ripple"></div>
        </button>
        
        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-around h-16">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {isActive && <div className="active-indicator"></div>}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
      
      <style>{`
        /* Floating Action Button */
        .fab-button {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #EAB308 0%, #FBBF24 100%);
          border-radius: 50%;
          border: none;
          box-shadow: 
            0 8px 24px rgba(234, 179, 8, 0.4),
            0 0 0 0 rgba(234, 179, 8, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 40;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fab-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: visible;
        }
        
        .fab-button:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 
            0 12px 32px rgba(234, 179, 8, 0.5),
            0 0 0 8px rgba(234, 179, 8, 0.1);
        }
        
        .fab-button:active {
          transform: scale(0.95) rotate(90deg);
        }
        
        .fab-icon {
          transition: transform 0.3s ease;
        }
        
        .fab-button:hover .fab-icon {
          transform: rotate(90deg);
        }
        
        .fab-ripple {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(234, 179, 8, 0.3);
          animation: ripple-pulse 2s ease-out infinite;
        }
        
        /* Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(234, 179, 8, 0.2);
          box-shadow: 
            0 -10px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          animation: nav-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: none;
          color: #9CA3AF;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          animation: nav-item-enter 0.4s ease-out forwards;
        }
        
        .nav-item:hover {
          color: #EAB308;
          transform: translateY(-4px);
        }
        
        .nav-item.active {
          color: #EAB308;
        }
        
        .nav-icon {
          width: 24px;
          height: 24px;
          margin-bottom: 4px;
          transition: all 0.3s ease;
        }
        
        .nav-item:hover .nav-icon {
          transform: scale(1.2);
        }
        
        .nav-item.active .nav-icon {
          animation: bounce-icon 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .nav-label {
          font-size: 12px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .nav-item.active .nav-label {
          font-weight: 700;
        }
        
        .active-indicator {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #EAB308, #FCD34D);
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 12px rgba(234, 179, 8, 0.4);
          animation: indicator-slide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Animations */
        @keyframes fab-enter {
          from {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes ripple-pulse {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes nav-enter {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes nav-item-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-icon {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.3) translateY(-8px);
          }
        }
        
        @keyframes indicator-slide {
          from {
            transform: translateX(-50%) scaleX(0);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
