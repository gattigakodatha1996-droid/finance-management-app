export function RomanticBackground() {
  return (
    <>
      <div className="romantic-bg-container">
        {/* Soft gradient blobs */}
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
        <div className="gradient-blob blob-4"></div>
        <div className="gradient-blob blob-5"></div>
        
        {/* Heart particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="heart-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              fontSize: `${12 + Math.random() * 8}px`,
            }}
          >
            ❤️
          </div>
        ))}
        
        {/* Sparkle particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✨
          </div>
        ))}
        
        {/* Floating rose petals */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 15}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>
      
      <style>{`
        .romantic-bg-container {
          position: fixed;
          inset: 0;
          z-index: -10;
          overflow: hidden;
          background: linear-gradient(135deg, 
            #FEF3F2 0%, 
            #FFF7ED 25%, 
            #FDF2F8 50%, 
            #FEF3C7 75%,
            #FCE7F3 100%);
          background-size: 400% 400%;
          animation: romantic-gradient 20s ease infinite;
        }
        
        /* Soft gradient blobs */
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.3;
          mix-blend-mode: multiply;
          animation: blob-float 30s ease-in-out infinite;
        }
        
        .blob-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(45deg, #FBBF24, #F472B6);
          top: -200px;
          left: -200px;
          animation-duration: 25s;
        }
        
        .blob-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #EC4899, #DB2777);
          top: 20%;
          right: -150px;
          animation-duration: 30s;
          animation-delay: -5s;
        }
        
        .blob-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(225deg, #FCD34D, #FBBF24);
          bottom: -200px;
          left: 10%;
          animation-duration: 28s;
          animation-delay: -10s;
        }
        
        .blob-4 {
          width: 450px;
          height: 450px;
          background: linear-gradient(315deg, #F472B6, #EC4899);
          bottom: 30%;
          right: 20%;
          animation-duration: 32s;
          animation-delay: -15s;
        }
        
        .blob-5 {
          width: 400px;
          height: 400px;
          background: linear-gradient(180deg, #FBBF24, #F59E0B);
          top: 40%;
          left: 40%;
          animation-duration: 27s;
          animation-delay: -20s;
        }
        
        /* Heart particles */
        .heart-particle {
          position: absolute;
          opacity: 0;
          animation: heart-rise linear infinite;
          filter: drop-shadow(0 0 4px rgba(236, 72, 153, 0.6));
          pointer-events: none;
        }
        
        /* Sparkle particles */
        .sparkle-particle {
          position: absolute;
          font-size: 16px;
          animation: sparkle-twinkle 3s ease-in-out infinite;
          pointer-events: none;
        }
        
        /* Rose petals */
        .petal {
          position: absolute;
          font-size: 20px;
          opacity: 0;
          animation: petal-fall linear infinite;
          pointer-events: none;
        }
        
        /* Animations */
        @keyframes romantic-gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes blob-float {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(50px, -60px) scale(1.1) rotate(90deg);
          }
          50% {
            transform: translate(-30px, 40px) scale(0.9) rotate(180deg);
          }
          75% {
            transform: translate(60px, 50px) scale(1.05) rotate(270deg);
          }
        }
        
        @keyframes heart-rise {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(30px) rotate(180deg) scale(1);
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) translateX(-30px) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes sparkle-twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        @keyframes petal-fall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(50px) rotate(180deg);
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(110vh) translateX(-50px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
