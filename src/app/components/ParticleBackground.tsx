export function ParticleBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      <style>{`
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #EAB308;
          border-radius: 50%;
          opacity: 0;
          animation: float-up linear infinite;
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}