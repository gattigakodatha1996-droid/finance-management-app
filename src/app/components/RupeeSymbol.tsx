export function RupeeSymbolAnimated() {
  return (
    <>
      <div className="rupee-container">
        <div className="rupee-symbol">₹</div>
      </div>
      
      <style>{`
        .rupee-container {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }
        
        .rupee-symbol {
          font-size: 48px;
          font-weight: bold;
          color: #EAB308;
          animation: float-rotate 4s ease-in-out infinite;
          filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.6));
          text-shadow: 0 0 20px rgba(234, 179, 8, 0.4);
        }
        
        @keyframes float-rotate {
          0%, 100% {
            transform: translateY(0px) rotateY(0deg);
          }
          25% {
            transform: translateY(-10px) rotateY(90deg);
          }
          50% {
            transform: translateY(0px) rotateY(180deg);
          }
          75% {
            transform: translateY(-10px) rotateY(270deg);
          }
        }
      `}</style>
    </>
  );
}

// Simpler floating version
export function RupeeSymbolSimple() {
  return (
    <>
      <div className="rupee-simple">₹</div>
      
      <style>{`
        .rupee-simple {
          font-size: 48px;
          font-weight: bold;
          color: #EAB308;
          animation: gentle-float 3s ease-in-out infinite;
          filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.6));
        }
        
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }
      `}</style>
    </>
  );
}

// Spinning coin effect
export function RupeeCoin() {
  return (
    <>
      <div className="coin">
        <div className="coin-inner">₹</div>
      </div>
      
      <style>{`
        .coin {
          width: 80px;
          height: 80px;
          position: relative;
          animation: coin-spin 3s linear infinite;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .coin-inner {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #FCD34D 0%, #EAB308 50%, #CA8A04 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: bold;
          color: white;
          box-shadow: 
            0 10px 30px rgba(234, 179, 8, 0.4),
            inset 0 -5px 10px rgba(0, 0, 0, 0.2),
            inset 0 5px 10px rgba(255, 255, 255, 0.3);
          transform-style: preserve-3d;
        }
        
        @keyframes coin-spin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </>
  );
}
