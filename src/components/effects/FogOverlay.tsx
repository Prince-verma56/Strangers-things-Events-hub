const FogOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Fog layer 1 */}
      <div
        className="absolute inset-0 w-[200%] animate-fog-1"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 50%, 
              rgba(50, 50, 80, 0.15) 0%, 
              transparent 50%
            ),
            radial-gradient(ellipse 60% 40% at 70% 60%, 
              rgba(30, 30, 50, 0.12) 0%, 
              transparent 50%
            )
          `,
          willChange: 'transform',
        }}
      />

      {/* Fog layer 2 */}
      <div
        className="absolute inset-0 w-[200%] animate-fog-2"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 40% 40%, 
              rgba(40, 40, 60, 0.1) 0%, 
              transparent 50%
            ),
            radial-gradient(ellipse 50% 30% at 80% 70%, 
              rgba(60, 40, 50, 0.08) 0%, 
              transparent 50%
            )
          `,
          willChange: 'transform',
        }}
      />

      {/* Bottom fog gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30vh]"
        style={{
          background: 'linear-gradient(to top, rgba(5, 5, 10, 0.8) 0%, transparent 100%)',
        }}
      />

      {/* Top vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />

      <style>{`
        @keyframes fogMove {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-fog-1 {
          animation: fogMove 60s linear infinite;
        }
        .animate-fog-2 {
          animation: fogMove 80s linear infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default FogOverlay;
