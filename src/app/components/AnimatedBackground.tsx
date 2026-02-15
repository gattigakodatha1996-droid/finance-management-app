export function AnimatedBackground() {
  return (
    <>
      <div className="animated-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
      
      <style>{`
        .animated-bg {
          position: fixed;
          inset: 0;
          z-index: -10;
          overflow: hidden;
          background: linear-gradient(to bottom, #fefce8, #ffffff);
        }
        
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: blob-float 20s ease-in-out infinite;
        }
        
        .blob-1 {
          width: 400px;
          height: 400px;
          background: #EAB308;
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }
        
        .blob-2 {
          width: 500px;
          height: 500px;
          background: #FCD34D;
          bottom: -150px;
          right: -150px;
          animation-delay: -7s;
        }
        
        .blob-3 {
          width: 350px;
          height: 350px;
          background: #FBBF24;
          top: 50%;
          left: 50%;
          animation-delay: -14s;
        }
        
        @keyframes blob-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </>
  );
}
