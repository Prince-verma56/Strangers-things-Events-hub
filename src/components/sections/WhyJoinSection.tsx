import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Assets
import demon from "../../assets/demon1.png";
import User from "../../assets/team.png";
import Trophys from "../../assets/winner.png";
import zaps from "../../assets/loght.png";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: demon,
    title: "FACE YOUR DEMONS",
    description:
      "Push beyond your comfort zone. The best code is written under pressure.",
  },
  {
    icon: User,
    title: "FIND YOUR PARTY",
    description:
      "Connect with developers who share your passion. Form alliances that last beyond the event.",
  },
  {
    icon: Trophys,
    title: "CLAIM YOUR GLORY",
    description:
      "Win prizes worth $10,000+. But more importantly, prove what you're capable of.",
  },
  {
    icon: zaps,
    title: "LEVEL UP",
    description:
      "Learn from industry experts. Gain skills that will accelerate your career.",
  },
];

// Enhanced Floating Card Component with Parallax
interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className }) => {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !contentRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xOffset = e.clientX - (rect.left + rect.width / 2);
    const yOffset = e.clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      // Container moves with cursor (3D tilt)
      gsap.to(containerRef.current, {
        x: xOffset / 10,
        y: yOffset / 10,
        rotationY: xOffset / 15,
        rotationX: -yOffset / 15,
        transformPerspective: 1000,
        duration: 0.6,
        ease: "power2.out",
      });

      // Content moves opposite (parallax depth)
      gsap.to(contentRef.current, {
        x: -xOffset / 20,
        y: -yOffset / 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    if (!isHovering && containerRef.current && contentRef.current) {
      gsap.to(containerRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [isHovering]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={className}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={contentRef}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
};

const WhyJoinSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // FIXED: Using ref arrays instead of querySelector
  const headerWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const footerLineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Card refs - one ref object per card containing all its elements
  const cardRefs = useRef<Array<{
    card: HTMLDivElement | null;
    icon: HTMLDivElement | null;
    titleWords: (HTMLSpanElement | null)[];
    description: HTMLParagraphElement | null;
    border: HTMLDivElement | null;
  }>>(reasons.map(() => ({
    card: null,
    icon: null,
    titleWords: [],
    description: null,
    border: null,
  })));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Main Title Animation - FIXED with refs
      const titleWords = headerWordRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (titleWords.length > 0) {
        gsap.fromTo(
          titleWords,
          {
            opacity: 0,
            y: 80,
            rotateX: -40,
            skewX: 20,
            transformOrigin: "bottom center",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            skewX: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: mainTitleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 2. Subtitle Animation
      if (subtitleRef.current && mainTitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: mainTitleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 3. Complex Card Animation Sequence - FIXED with refs
      cardRefs.current.forEach((cardRef, index) => {
        const { card, icon, titleWords, description, border } = cardRef;

        if (!card) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        });

        // Card body reveal
        tl.fromTo(card,
          { opacity: 0, y: 50, rotateX: 15, scale: 0.9 },
          { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
          index * 0.15
        );

        // Bottom border grows
        if (border) {
          tl.fromTo(border,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.4"
          );
        }

        // Icon pops in
        if (icon) {
          tl.fromTo(icon,
            { scale: 0, rotation: -45, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
            "-=0.3"
          );
        }

        // Title words stagger - FIXED with refs
        const validTitleWords = titleWords.filter(Boolean) as HTMLSpanElement[];
        if (validTitleWords.length > 0) {
          tl.fromTo(validTitleWords,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
            "-=0.6"
          );
        }

        // Description fades in
        if (description) {
          tl.fromTo(description,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
        }
      });

      // 4. Footer Animation - FIXED with refs
      const footerLines = footerLineRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (footerLines.length > 0) {
        gsap.fromTo(
          footerLines,
          {
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.3,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 px-4 overflow-hidden"
      id="why-join"
    >
      {/* Background Layer - Optimized */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform"
        style={{
          backgroundImage: "url('/images/Bg/WhyToChooseBg.png')",
          filter: "brightness(1.2)",
          zIndex: 0,
        }}
        initial={{ opacity: 0, scale: 1.15 }}
        whileInView={{ opacity: 0.82, scale: 1 }}
        transition={{
          duration: 2.5,
          delay: 0.2,
          ease: "easeOut"
        }}
        viewport={{ once: true, amount: 0.3 }}
      />

      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, hsl(0 100% 50% / 0.25) 0%, transparent 55%),
            radial-gradient(circle at 70% 60%, hsl(0 100% 50% / 0.25) 0%, transparent 55%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20" style={{ perspective: '1000px' }}>
          <h2
            ref={mainTitleRef}
            className="font-kraken text-5xl lg:text-8xl sm:text-6xl md:text-8xl text-foreground mb-4 overflow-hidden"
          >
            <span
              ref={(el) => (headerWordRefs.current[0] = el)}
              className="header-word font-kraken inline-block mr-3 tracking-wider will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              FACE
            </span>
            <span
              ref={(el) => (headerWordRefs.current[1] = el)}
              className="header-word font-kraken inline-block mr-3 tracking-wider will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              YOUR
            </span>
            <span
              ref={(el) => (headerWordRefs.current[2] = el)}
              className="header-word inline-block us tracking-wider will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
                textShadow: `
                  0 0 10px hsl(0 100% 50% / 1),
                  0 0 20px hsl(0 100% 50% / 0.8),
                  0 0 40px hsl(0 100% 50% / 0.6)
                `
              }}
            >
              FEARS
            </span>
          </h2>
          <p ref={subtitleRef} className="font-horror text-xl text-muted-foreground opacity-0 will-change-opacity">
            Why should you enter the Upside Down?
          </p>
        </div>

        {/* Cards Grid with Enhanced Floating Effect */}
        <div className="cards-grid grid sm:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <FloatingCard key={index} className="reason-card">
              <Card
                ref={(el) => (cardRefs.current[index].card = el)}
                className="group relative overflow-hidden bg-black/60 border-2 border-crimson/20 backdrop-blur-sm hover:border-crimson/50 transition-colors duration-500 cursor-pointer will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <CardContent className="p-8 relative z-10">
                  {/* Icon with glow */}
                  <div
                    ref={(el) => (cardRefs.current[index].icon = el)}
                    className="card-icon mb-6 relative w-fit origin-center will-change-transform"
                  >
                    <img
                      src={reason.icon}
                      alt={reason.title}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="w-14 h-14 object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] 
                                 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500"
                    />
                    <div className="absolute inset-0 w-14 h-14 bg-crimson/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Title */}
                  <h3
                    className="card-title-container font-empire text-2xl sm:text-3xl text-foreground mb-4 tracking-wider group-hover:text-crimson transition-colors duration-300"
                    style={{ perspective: '500px' }}
                  >
                    {reason.title.split(" ").map((word, i) => (
                      <span
                        key={i}
                        ref={(el) => (cardRefs.current[index].titleWords[i] = el)}
                        className="animated-card-word inline-block mr-2 will-change-transform"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {word}
                      </span>
                    ))}
                  </h3>

                  {/* Description */}
                  <p
                    ref={(el) => (cardRefs.current[index].description = el)}
                    className="card-desc font-horror text-muted-foreground text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 will-change-opacity"
                  >
                    {reason.description}
                  </p>
                </CardContent>

                {/* Hover effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Bottom accent line */}
                <div
                  ref={(el) => (cardRefs.current[index].border = el)}
                  className="card-border-line absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-crimson to-transparent origin-left will-change-transform"
                >
                  <div className="absolute inset-0 blur-sm bg-crimson" />
                </div>

                {/* Corner glows */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-crimson/0 group-hover:bg-crimson/10 blur-2xl transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-crimson/0 group-hover:bg-crimson/10 blur-2xl transition-all duration-500" />
              </Card>
            </FloatingCard>
          ))}
        </div>

        {/* Footer Statement */}
        <div ref={footerRef} className="mt-24 text-center">
          <p className="font-kraken text-3xl sm:text-4xl md:text-6xl text-foreground leading-tight">
            <span
              ref={(el) => (footerLineRefs.current[0] = el)}
              className="footer-line block animate-flicker will-change-opacity"
            >
              THE DARKNESS CALLS.
            </span>
            <span
              ref={(el) => (footerLineRefs.current[1] = el)}
              className="footer-line block text-crimson mt-2 will-change-opacity"
              style={{
                textShadow: `
                  0 0 10px hsl(0 100% 50% / 1), 
                  0 0 20px hsl(0 100% 50% / 0.8),
                  0 0 40px hsl(0 100% 50% / 0.6)
                `
              }}
            >
              WILL YOU ANSWER?
            </span>
          </p>
        </div>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-crimson/5 rounded-full blur-3xl animate-float will-change-transform" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-crimson/5 rounded-full blur-3xl animate-float will-change-transform"
        style={{ animationDelay: '1s', animationDuration: '4s' }}
      />

      {/* Custom Styles */}
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
          51% { opacity: 0.9; }
          52% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        
        .animate-flicker { 
          animation: flicker 3s infinite; 
        }
        
        .animate-float { 
          animation: float 3s ease-in-out infinite; 
        }
        
        .font-kraken {
          font-family: 'Kraken', sans-serif;
        }
        
        .font-the-last-of-us {
          font-family: 'The Last of Us', sans-serif;
        }
        
        .font-empire {
          font-family: 'empire', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default WhyJoinSection;