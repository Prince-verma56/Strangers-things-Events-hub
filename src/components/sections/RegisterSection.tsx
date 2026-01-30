
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const RegisterSection = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[70vh] flex flex-col items-center justify-center py-32 px-4 overflow-hidden"
      id="register"
    >
      {/* Intense background */}
      <div className="absolute inset-0 bg-void-deep" />
      
      {/* Pulsating background effect */}
      <div className="absolute inset-0 heartbeat">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, 
                hsl(0 100% 50% / 0.1) 0%, 
                transparent 60%
              )
            `,
          }}
        />
      </div>

      {/* Lightning effects in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-crimson via-transparent to-crimson opacity-20" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-crimson to-transparent opacity-20" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        
        {/* Main heading */}
        <h2 className="font-stranger text-5xl sm:text-7xl md:text-8xl text-foreground mb-6 gsap-fade-up text-glow-red">
          JOIN THE REVOLUTION
        </h2>

        <p className="font-horror text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto gsap-fade-up">
          Be the first to know about upcoming events, workshops, and tech fests.
        </p>

        {/* Register button */}
        <div className="gsap-scale-in">
          <button
            ref={buttonRef}
            className="group relative px-16 py-8 font-stranger text-2xl sm:text-3xl tracking-[0.2em] text-primary-foreground bg-crimson border-4 border-crimson overflow-hidden magnetic-btn hoverable pulse-glow"
          >
            {/* Shockwave rings */}
            <span className="absolute inset-0 border-4 border-crimson rounded-none opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
            <span className="absolute inset-0 border-2 border-crimson rounded-none opacity-0 group-hover:opacity-100 group-hover:scale-[2] transition-all duration-1000 delay-100" />
            
            {/* Button text */}
            <span className="relative z-10">JOIN COMMUNITY</span>

            {/* Gradient sweep on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>

        {/* Community stats */}
        <p className="mt-8 font-horror text-muted-foreground gsap-fade-up">
          <span className="text-crimson font-bold">5000+</span> active members
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l-2 border-t-2 border-crimson/30" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r-2 border-t-2 border-crimson/30" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l-2 border-b-2 border-crimson/30" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r-2 border-b-2 border-crimson/30" />
    </section>
  );
};

export default RegisterSection;
