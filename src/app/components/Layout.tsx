import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, List, PieChart, User, Plus } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  onAddTransaction?: () => void;
}

export function Layout({ children, onAddTransaction }: LayoutProps) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/transactions', icon: List, label: 'Transactions' },
    { path: '/insights', icon: PieChart, label: 'Insights' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];
  
  return (
    <div className="min-h-screen bg-[#FCD34D] pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </div>
      
      {/* Floating Add Button */}
      <button
        onClick={onAddTransaction}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#EAB308] rounded-full shadow-lg flex items-center justify-center hover:bg-[#CA8A04] transition-colors z-40"
        aria-label="Add transaction"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                    isActive ? 'text-[#EAB308]' : 'text-gray-500'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
