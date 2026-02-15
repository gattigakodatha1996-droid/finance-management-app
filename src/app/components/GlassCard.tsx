interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <>
      <div className={`glass-card ${className}`}>
        {children}
      </div>
      
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 1rem;
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 12px 40px 0 rgba(31, 38, 135, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset;
        }
      `}</style>
    </>
  );
}

export function GradientCard({ children, className = '' }: GlassCardProps) {
  return (
    <>
      <div className={`gradient-card ${className}`}>
        <div className="gradient-overlay"></div>
        <div className="card-content">{children}</div>
      </div>
      
      <style>{`
        .gradient-card {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          transition: transform 0.3s ease;
        }
        
        .gradient-card:hover {
          transform: translateY(-5px);
        }
        
        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(234, 179, 8, 0.1) 0%,
            rgba(252, 211, 77, 0.1) 100%
          );
          animation: gradient-shift 3s ease infinite;
        }
        
        .card-content {
          position: relative;
          z-index: 1;
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </>
  );
}
