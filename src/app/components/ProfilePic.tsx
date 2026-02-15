interface ProfilePicProps {
  name: string;
  imageUrl: string;
  role?: 'loki' | 'vasu';
  size?: 'small' | 'medium' | 'large';
  showHeart?: boolean;
}

export function ProfilePic({ name, imageUrl, role = 'loki', size = 'medium', showHeart = false }: ProfilePicProps) {
  const sizes = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };
  
  const gradients = {
    loki: 'from-amber-400 via-orange-400 to-rose-400',
    vasu: 'from-pink-400 via-rose-400 to-purple-400'
  };
  
  return (
    <>
      <div className={`profile-container ${size}`}>
        <div className={`profile-ring gradient-${role}`}>
          <div className="profile-image">
            <img src={imageUrl} alt={name} />
          </div>
          {showHeart && (
            <div className="heart-badge">
              <span className="heart">💕</span>
            </div>
          )}
        </div>
        <div className="profile-name">{name}</div>
      </div>
      
      <style>{`
        .profile-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: profile-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .profile-ring {
          position: relative;
          padding: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gradient));
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.15),
            0 0 40px rgba(234, 179, 8, 0.3);
          animation: ring-pulse 3s ease-in-out infinite;
        }
        
        .gradient-loki {
          --gradient: linear-gradient(135deg, #FBBF24, #F59E0B, #FB923C);
        }
        
        .gradient-vasu {
          --gradient: linear-gradient(135deg, #F472B6, #EC4899, #DB2777);
        }
        
        .profile-image {
          border-radius: 50%;
          overflow: hidden;
          background: white;
          position: relative;
        }
        
        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .small .profile-image {
          width: 48px;
          height: 48px;
        }
        
        .medium .profile-image {
          width: 64px;
          height: 64px;
        }
        
        .large .profile-image {
          width: 96px;
          height: 96px;
        }
        
        .heart-badge {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: white;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          animation: heart-beat 1.5s ease-in-out infinite;
        }
        
        .heart {
          font-size: 16px;
          animation: heart-pulse 1.5s ease-in-out infinite;
        }
        
        .profile-name {
          font-size: 14px;
          font-weight: 600;
          color: #1F2937;
          text-align: center;
        }
        
        @keyframes profile-entrance {
          from {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes ring-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 
              0 8px 24px rgba(0, 0, 0, 0.15),
              0 0 40px rgba(234, 179, 8, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 
              0 12px 32px rgba(0, 0, 0, 0.2),
              0 0 60px rgba(234, 179, 8, 0.5);
          }
        }
        
        @keyframes heart-beat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.2);
          }
          20%, 40% {
            transform: scale(1);
          }
        }
        
        @keyframes heart-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
      `}</style>
    </>
  );
}

// Couple Display Component
export function CoupleDisplay({ lokiImage, vasuImage }: { lokiImage: string; vasuImage: string }) {
  return (
    <>
      <div className="couple-container">
        <ProfilePic name="Loki" imageUrl={lokiImage} role="loki" size="large" showHeart />
        <div className="heart-connector">
          <div className="heart-icon">❤️</div>
          <div className="connecting-line"></div>
        </div>
        <ProfilePic name="Vasu" imageUrl={vasuImage} role="vasu" size="large" showHeart />
      </div>
      
      <style>{`
        .couple-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          padding: 20px;
          position: relative;
        }
        
        .heart-connector {
          position: relative;
          display: flex;
          align-items: center;
          animation: connector-float 3s ease-in-out infinite;
        }
        
        .heart-icon {
          font-size: 32px;
          z-index: 10;
          animation: heart-rotate 4s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(236, 72, 153, 0.4));
        }
        
        .connecting-line {
          position: absolute;
          top: 50%;
          left: -40px;
          right: -40px;
          height: 2px;
          background: linear-gradient(90deg, 
            #FBBF24 0%, 
            #F472B6 50%, 
            #DB2777 100%);
          transform: translateY(-50%);
          opacity: 0.6;
          animation: line-shimmer 2s ease-in-out infinite;
        }
        
        @keyframes connector-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes heart-rotate {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(-10deg) scale(1.2);
          }
          75% {
            transform: rotate(10deg) scale(1.2);
          }
        }
        
        @keyframes line-shimmer {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
