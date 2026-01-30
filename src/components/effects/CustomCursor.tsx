import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Use refs to avoid re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Optimized lerp (linear interpolation) for smoother following
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic-btn') ||
        target.classList.contains('hoverable')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
      
      // Check if we're still over an interactive element
      if (
        relatedTarget &&
        (relatedTarget.tagName === 'A' ||
          relatedTarget.tagName === 'BUTTON' ||
          relatedTarget.closest('a') ||
          relatedTarget.closest('button') ||
          relatedTarget.classList.contains('magnetic-btn') ||
          relatedTarget.classList.contains('hoverable'))
      ) {
        return;
      }
      setIsHovering(false);
    };

    // Smooth cursor animation with optimized easing
    const animate = () => {
      // Adaptive easing factor - faster when far, slower when close
      const distance = Math.hypot(
        mousePos.current.x - cursorPos.current.x,
        mousePos.current.y - cursorPos.current.y
      );
      
      // Dynamic easing: faster catch-up when far away, smoother when close
      const easingFactor = Math.min(0.2, 0.08 + (distance * 0.001));
      
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, easingFactor);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, easingFactor);

      // Use transform for GPU acceleration
      cursor.style.transform = `translate3d(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px, 0)`;
      cursorDot.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;

      rafId.current = requestAnimationFrame(animate);
    };

    // Event listeners with passive option for better scroll performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });

    // Start animation
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[10000] mix-blend-difference transition-all duration-300 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        <div 
          className={`w-full h-full rounded-full border-2 border-crimson transition-all duration-300 ${
            isHovering ? 'bg-crimson/20' : ''
          }`} 
          style={{
            boxShadow: isHovering 
              ? '0 0 30px hsl(0 100% 50% / 0.6), 0 0 60px hsl(0 100% 50% / 0.3)' 
              : '0 0 15px hsl(0 100% 50% / 0.4)'
          }} 
        />
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10001]"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        <div 
          className={`w-full h-full rounded-full bg-crimson transition-all duration-150 ${
            isClicking ? 'scale-150' : 'scale-100'
          }`}
          style={{
            boxShadow: '0 0 10px hsl(0 100% 50% / 0.8)'
          }} 
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        /* Optimize for performance */
        #root, body {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;