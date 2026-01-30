import { useEffect, useState } from 'react';

interface LightningFlashProps {
  scrollTriggered?: boolean;
}

const LightningFlash = ({ scrollTriggered = true }: LightningFlashProps) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashPosition, setFlashPosition] = useState({ x: 50, y: 0 });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeout: NodeJS.Timeout;

    const triggerFlash = () => {
      if (isFlashing) return;
      
      setFlashPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 30,
      });
      setIsFlashing(true);
      
      setTimeout(() => setIsFlashing(false), 200);
    };

    const handleScroll = () => {
      if (!scrollTriggered) return;
      
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;

      // Trigger flash on significant scroll
      if (scrollDelta > 100 && Math.random() > 0.7) {
        triggerFlash();
      }
    };

    // Random periodic flashes
    const randomFlash = () => {
      if (Math.random() > 0.85) {
        triggerFlash();
      }
      timeout = setTimeout(randomFlash, Math.random() * 8000 + 4000);
    };

    window.addEventListener('scroll', handleScroll);
    randomFlash();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [isFlashing, scrollTriggered]);

  if (!isFlashing) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {/* Main flash */}
      <div 
        className="absolute inset-0 animate-lightning"
        style={{
          background: `radial-gradient(ellipse 30% 80% at ${flashPosition.x}% ${flashPosition.y}%, 
            rgba(255, 50, 50, 0.3) 0%, 
            rgba(255, 100, 100, 0.15) 30%,
            transparent 70%
          )`,
        }}
      />

      {/* Lightning bolt effect */}
      <svg 
        className="absolute animate-lightning"
        style={{ 
          left: `${flashPosition.x}%`, 
          top: `${flashPosition.y}%`,
          width: '200px',
          height: '400px',
          transform: 'translate(-50%, 0)',
        }}
        viewBox="0 0 100 200"
      >
        <path
          d="M50 0 L45 60 L60 60 L40 120 L55 120 L30 200 L40 130 L25 130 L50 70 L35 70 Z"
          fill="rgba(255, 100, 100, 0.6)"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Screen flash */}
      <div 
        className="absolute inset-0 bg-crimson/5 animate-lightning"
      />
    </div>
  );
};

export default LightningFlash;