import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import bgclip from "/videos/Landing 2 video.mp4";
import InteractiveTiltText3D from "../InteractiveTiltText3D";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for glow circle
  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 1. SCROLL-LINKED VIDEO MASK ANIMATION
  useGSAP(() => {
    if (!videoRef.current || !containerRef.current) return;

    // End State (Masked)
    gsap.set(videoRef.current, {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0% 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    // Start State (Full Screen) -> Animate to Mask
    gsap.from(videoRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 20%",
        scrub: 1,
      },
    });

    // Entrance Fade
    gsap.fromTo(
      videoRef.current,
      { opacity: 0, scale: 1.15 },
      { opacity:0.6, scale: 1, duration: 1.4, ease: "power3.out" }
    );
  }, { scope: containerRef });

  // 2. Text Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return;

      const tl = gsap.timeline({ delay: 0.4 });

      const letters = titleRef.current.querySelectorAll(".letter");
      if (letters.length > 0) {
        tl.fromTo(
          letters,
          { opacity: 0, y: 100, rotateX: -90, filter: "blur(20px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.07,
            ease: "back.out(1.7)",
          }
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.92 },
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.1, ease: "power3.out" },
        "-=0.6"
      );

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 20, filter: "blur(5px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power2.out" },
          "-=0.7"
        );
      }

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.85, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "elastic.out(1, 0.6)" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Strange Events";
  const subtitleText = "YOUR GATEWAY TO CAMPUS LIFE";

  return (
    <section
      ref={containerRef}
      id="home"
      // Changed bg-black to bg-zinc-900 for a slightly lighter fallback
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-zinc-900"
    >
      {/* 1. BRIGHTER VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{
            // REMOVED FILTERS for performance - using overlay div instead
            willChange: "clip-path, border-radius, transform"
          }}
        >
          <source src={bgclip} type="video/mp4" />
        </video>

        {/* Overlay for brightness/contrast effect - GPU efficient */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* LIGHTER GRADIENT: Reduced opacity from 80% to 40% */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" /> */}

        {/* LIGHTER RED TINT: Reduced opacity */}
        <div className="absolute inset-0  pointer-events-none" />
      </div>

      {/* Mouse Glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none hidden md:block z-10 top-0 left-0"
        style={{
          // Hardware accelerated transform instead of left/top
          transform: `translate(-500px, -500px)`, 
          // background: "radial-gradient(circle, rgba(220, 38, 38, 0.2) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto w-full">

        {/* Title */}
        <div className="w-full flex justify-center items-center px-2 mb-2">
          <InteractiveTiltText3D>
            <h1
              ref={titleRef}
              className="font-stranger-outline scale-y-150 origin-bottom text-transparent [-webkit-text-stroke:4px_red] text-red-500 whitespace-nowrap leading-none tracking-tight text-center drop-shadow-2xl"
              style={{
                perspective: "1000px",
                fontSize: "clamp(3rem, 10vw, 11rem)",
                // Kept strong shadow stack so text is readable against brighter video
                textShadow: `
                  3px 3px 0px rgba(0,0,0, 0.8),
                  0 0 20px rgba(220, 38, 38, 0.5),
                  0 0 40px rgba(220, 38, 38, 0.3)
                `,
              }}
            >
              <span className="relative inline-block">
                {titleText.split("").map((letter, index) => (
                  <span
                    key={index}
                    className="letter inline-block hover:scale-110 transition-transform duration-300 will-change-transform"
                    style={{
                      animation: `flicker ${2 + Math.random() * 3}s infinite`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h1>
          </InteractiveTiltText3D>
        </div>

        {/* Subtitle */}
        <h2
          ref={subtitleRef}
          className="font-stranger text-lg sm:text-2xl md:text-3xl lg:text-4xl text-crimson tracking-[0.3em] mt-4 will-change-transform"
          style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}
        >
          {subtitleText}
        </h2>

        {/* Tagline - Made lighter for visibility */}
        <p
          ref={taglineRef}
          className="font-horror text-base sm:text-xl md:text-2xl text-zinc-200 mt-8 leading-relaxed will-change-transform"
        >
        Friends Don't lie About Hackathons | Events <br />
          <span className="text-red-500 font-semibold drop-shadow-md">
            Will you survive?
          </span>
        </p>

        {/* CTA Button */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full px-4 mt-12"
        >
          <Button
            size="lg"
            className="
              group relative
              w-full md:w-auto
              px-8 py-6
              text-lg md:text-xl
              font-stranger tracking-widest
              bg-crimson text-white 
              border-2 border-crimson/50
              hover:scale-105 hover:border-crimson hover:bg-red-700
              transition-all duration-300
              shadow-[0_0_20px_rgba(220,38,38,0.4)]
              hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]
              will-change-transform
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-3 font-['Kraken'] " >
              <Sparkles className="w-6 h-6 animate-pulse " />
              ENTER THE UPSIDE DOWN
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-red-500/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle ${4 + Math.random() * 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; text-shadow: 3px 3px 0px rgba(0,0,0,0.8), 0 0 20px rgba(220,38,38,0.5), 0 0 40px rgba(220,38,38,0.3); }
          50% { opacity: 0.9; text-shadow: 3px 3px 0px rgba(0,0,0,0.8), 0 0 10px rgba(220,38,38,0.3), 0 0 20px rgba(220,38,38,0.1); }
          51% { opacity: 0.7; }
          52% { opacity: 1; }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          20% { opacity: 1; scale: 1; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;