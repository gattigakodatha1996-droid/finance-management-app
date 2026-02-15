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
    { path: '/', icon: Home, label: 'Home', emoji: '🏠' },
    { path: '/transactions', icon: List, label: 'Transactions', emoji: '💰' },
    { path: '/insights', icon: PieChart, label: 'Insights', emoji: '📊' }
  ];
  
  return (
    <>
      <div className="romantic-layout">
        <div className="content-container">
          {children}
        </div>
        
        {/* Floating Add Button */}
        <button
          onClick={onAddTransaction}
          className="romantic-fab"
          aria-label="Add transaction"
        >
          <div className="fab-hearts">
            <span className="fab-heart">💕</span>
          </div>
          <Plus className="fab-icon" />
          <div className="fab-ripple-1"></div>
          <div className="fab-ripple-2"></div>
        </button>
        
        {/* Bottom Navigation */}
        <nav className="romantic-nav">
          <div className="nav-glow"></div>
          <div className="nav-content">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`romantic-nav-item ${isActive ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="nav-icon-wrapper">
                    {isActive && <div className="active-glow"></div>}
                    <Icon className="nav-icon" />
                    <span className="nav-emoji">{item.emoji}</span>
                  </div>
                  <span className="nav-label">{item.label}</span>
                  {isActive && (
                    <>
                      <div className="active-indicator"></div>
                      <div className="active-shine"></div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      
      <style>{`
        .romantic-layout {
          min-height: 100vh;
          padding-bottom: 100px;
          position: relative;
        }
        
        .content-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
        }
        
        /* Floating Action Button */
        .romantic-fab {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #FBBF24 0%, #F472B6 100%);
          border: none;
          border-radius: 50%;
          box-shadow: 
            0 12px 32px rgba(236, 72, 153, 0.4),
            0 0 0 0 rgba(251, 191, 36, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: fab-entrance 1s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: visible;
        }
        
        .romantic-fab:hover {
          transform: scale(1.15) rotate(90deg);
          box-shadow: 
            0 16px 48px rgba(236, 72, 153, 0.5),
            0 0 40px rgba(251, 191, 36, 0.3);
        }
        
        .romantic-fab:active {
          transform: scale(0.95) rotate(90deg);
        }
        
        .fab-hearts {
          position: absolute;
          top: -8px;
          right: -8px;
          z-index: 10;
        }
        
        .fab-heart {
          font-size: 20px;
          animation: heart-bounce 2s ease-in-out infinite;
        }
        
        .fab-icon {
          width: 28px;
          height: 28px;
          color: white;
          transition: transform 0.3s ease;
          position: relative;
          z-index: 5;
        }
        
        .romantic-fab:hover .fab-icon {
          transform: rotate(90deg);
        }
        
        .fab-ripple-1,
        .fab-ripple-2 {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.4), rgba(236, 72, 153, 0.4));
          animation: ripple-pulse 3s ease-out infinite;
        }
        
        .fab-ripple-2 {
          animation-delay: 1.5s;
        }
        
        /* Bottom Navigation */
        .romantic-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          animation: nav-slide-up 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .nav-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(251, 191, 36, 0.1), transparent);
          pointer-events: none;
        }
        
        .nav-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-top: 2px solid;
          border-image: linear-gradient(90deg, 
            rgba(251, 191, 36, 0.3), 
            rgba(236, 72, 153, 0.3),
            rgba(251, 191, 36, 0.3)
          ) 1;
          box-shadow: 
            0 -10px 40px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 12px 20px 20px;
          position: relative;
        }
        
        .romantic-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 12px 20px;
          text-decoration: none;
          color: #9CA3AF;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          border-radius: 16px;
          opacity: 0;
          animation: nav-item-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .romantic-nav-item:hover {
          color: #EC4899;
          transform: translateY(-4px);
          background: rgba(236, 72, 153, 0.05);
        }
        
        .romantic-nav-item.active {
          color: #EC4899;
        }
        
        .nav-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }
        
        .active-glow {
          position: absolute;
          inset: -8px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent 70%);
          border-radius: 50%;
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .nav-icon {
          width: 24px;
          height: 24px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }
        
        .romantic-nav-item:hover .nav-icon {
          transform: scale(1.2);
        }
        
        .romantic-nav-item.active .nav-icon {
          animation: icon-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .nav-emoji {
          position: absolute;
          font-size: 12px;
          bottom: -2px;
          right: -2px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .romantic-nav-item.active .nav-emoji {
          opacity: 1;
          animation: emoji-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .nav-label {
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .romantic-nav-item.active .nav-label {
          font-weight: 800;
          background: linear-gradient(135deg, #F59E0B, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .active-indicator {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 4px;
          background: linear-gradient(90deg, #FBBF24, #EC4899);
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.5);
          animation: indicator-slide-down 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .active-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            transparent 0%,
            rgba(236, 72, 153, 0.1) 50%,
            transparent 100%);
          animation: shine-sweep 2s ease-in-out infinite;
          border-radius: 16px;
        }
        
        /* Animations */
        @keyframes fab-entrance {
          from {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes heart-bounce {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          10%, 30% {
            transform: scale(1.3) translateY(-4px);
          }
          20%, 40% {
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes ripple-pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.8);
            opacity: 0.2;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes nav-slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes nav-item-pop {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes icon-bounce {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.3) translateY(-6px);
          }
        }
        
        @keyframes emoji-pop {
          from {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes indicator-slide-down {
          from {
            transform: translateX(-50%) scaleX(0) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) scaleX(1) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes shine-sweep {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @media (max-width: 640px) {
          .romantic-fab {
            bottom: 90px;
            right: 20px;
            width: 64px;
            height: 64px;
          }
        }
      `}</style>
    </>
  );
}
