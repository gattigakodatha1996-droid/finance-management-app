export function EnhancedBackground() {
  return (
    <>
      <div className="enhanced-bg-container">
        {/* Animated gradient blobs */}
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
        <div className="gradient-blob blob-4"></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>
      
      <style>{`
        .enhanced-bg-container {
          position: fixed;
          inset: 0;
          z-index: -10;
          overflow: hidden;
          background: linear-gradient(135deg, #fef9e7 0%, #fef5e7 50%, #fef3e4 100%);
        }
        
        /* Animated gradient blobs */
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          mix-blend-mode: multiply;
        }
        
        .blob-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(45deg, #EAB308, #FCD34D);
          top: -200px;
          left: -200px;
          animation: blob-float-1 25s ease-in-out infinite;
        }
        
        .blob-2 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #FBBF24, #F59E0B);
          bottom: -250px;
          right: -250px;
          animation: blob-float-2 30s ease-in-out infinite;
        }
        
        .blob-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(225deg, #FCD34D, #FDE047);
          top: 30%;
          right: 10%;
          animation: blob-float-3 20s ease-in-out infinite;
        }
        
        .blob-4 {
          width: 450px;
          height: 450px;
          background: linear-gradient(315deg, #FACC15, #EAB308);
          bottom: 20%;
          left: 15%;
          animation: blob-float-4 28s ease-in-out infinite;
        }
        
        /* Floating particles */
        .floating-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #EAB308 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          animation: particle-rise linear infinite;
          box-shadow: 
            0 0 10px rgba(234, 179, 8, 0.8),
            0 0 20px rgba(234, 179, 8, 0.4);
        }
        
        /* Glowing orbs */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .orb-1 {
          width: 300px;
          height: 300px;
          background: #EAB308;
          top: 10%;
          right: 20%;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 250px;
          height: 250px;
          background: #FBBF24;
          bottom: 30%;
          left: 10%;
          animation-delay: 1.5s;
        }
        
        .orb-3 {
          width: 200px;
          height: 200px;
          background: #FCD34D;
          top: 50%;
          left: 50%;
          animation-delay: 3s;
        }
        
        /* Animations */
        @keyframes blob-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(100px, -80px) scale(1.1) rotate(120deg); }
          66% { transform: translate(-50px, 60px) scale(0.9) rotate(240deg); }
        }
        
        @keyframes blob-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(-80px, -100px) scale(1.15) rotate(90deg); }
          50% { transform: translate(60px, 50px) scale(0.95) rotate(180deg); }
          75% { transform: translate(-40px, -60px) scale(1.05) rotate(270deg); }
        }
        
        @keyframes blob-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-70px, 90px) scale(1.2) rotate(180deg); }
        }
        
        @keyframes blob-float-4 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          40% { transform: translate(80px, -70px) scale(1.1) rotate(144deg); }
          80% { transform: translate(-60px, 80px) scale(0.9) rotate(288deg); }
        }
        
        @keyframes particle-rise {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(20px) scale(1);
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) translateX(-20px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
      `}</style>
    </>
  );
}
