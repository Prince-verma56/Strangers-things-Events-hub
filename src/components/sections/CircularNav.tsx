import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLenisContext } from "@/context/LenisContext";
import clsx from "clsx"; // Make sure to install: npm install clsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const navItems = [
  { label: "Home", sectionId: "home" },
  { label: "About", sectionId: "about" },
  { label: "Tracks", sectionId: "tracks" },
  { label: "Why Join", sectionId: "why-join" },
  { label: "Rewards", sectionId: "rewards" },
  { label: "Mentors", sectionId: "judges" },
  { label: "Partners", sectionId: "sponsors" },
  { label: "Join", sectionId: "register" },
];

const CircularNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  // --- AUDIO STATE ---
const [isAudioPlaying, setIsAudioPlaying] = useState(false);
const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { lenis } = useLenisContext();

  // --- AUDIO TOGGLE LOGIC ---
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

 // Auto play audio on load (with browser fallback)
useEffect(() => {
  const audio = audioElementRef.current;
  if (!audio) return;

  // Try autoplay immediately
  audio.volume = 0.4;
  audio.play().catch(() => {});

  // Fallback 1: Trigger audio after first scroll
  const unlockOnScroll = () => {
    audio.play().catch(() => {});
    window.removeEventListener("scroll", unlockOnScroll);
  };
  window.addEventListener("scroll", unlockOnScroll);

  // Fallback 2: Trigger on first click (mobile)
  const unlockOnClick = () => {
    audio.play().catch(() => {});
    document.removeEventListener("click", unlockOnClick);
  };
  document.addEventListener("click", unlockOnClick);

  return () => {
    window.removeEventListener("scroll", unlockOnScroll);
    document.removeEventListener("click", unlockOnClick);
  };
}, []);



useEffect(() => {
  const audio = audioElementRef.current;
  if (!audio) return;

  if (isAudioPlaying) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}, [isAudioPlaying]);


  const handleScroll = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll direction detection
  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  // Outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", close);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", close);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      {/* --- AUDIO BUTTON (Positioned next to Menu) --- */}
      <button
        onClick={toggleAudioIndicator}
        aria-label="Toggle Audio"
        className={`fixed top-6 right-24 z-[100] h-14 px-4 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-black/60 ${isVisible && hasAnimated
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0"
          }`}
        style={{ transitionDelay: hasAnimated ? "100ms" : "150ms" }}
      >
        <audio
          ref={audioElementRef}
          className="hidden"
          src="/music/Stranger thing bg music.mp3" // <--- CHANGE YOUR MUSIC PATH HERE
          loop
        />
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={clsx("w-1 h-4 bg-white rounded-full transition-all duration-200", {
                "animate-music-bar bg-crimson": isIndicatorActive,
                "opacity-50 h-2": !isIndicatorActive
              })}
              style={{
                animationDelay: `${bar * 0.1}s`,
              }}
            />
          ))}
        </div>
        <span className="ml-3 font-horror text-sm hidden sm:block">
          {isAudioPlaying ? "SOUND ON" : "SOUND OFF"}
        </span>
      </button>

       {/* AUTH BUTTONS */}
      <div
        className={`fixed top-6 right-24 z-[100] flex items-center gap-4 transition-all duration-500 ${
          isVisible && hasAnimated
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0"
        }`}
        style={{ transitionDelay: hasAnimated ? "0ms" : "150ms" }}
      >
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-crimson text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-red-600/40 transition-all duration-300">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 border-2 border-crimson",
              }
            }}
          />
        </SignedIn>
      </div>

      {/* MENU BUTTON */}
     

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className={`fixed top-6 right-6 z-[100] w-14 h-14 rounded-full bg-crimson text-white flex items-center justify-center shadow-lg transition-all duration-500 ${isVisible && hasAnimated
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0"
          } ${isOpen
            ? "scale-110 rotate-90 shadow-[0_0_30px_rgba(220,38,38,0.6)]"
            : "hover:scale-110 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          }`}
        style={{ transitionDelay: hasAnimated ? "0ms" : "200ms" }}
      >
        {isOpen ? (
          <X size={24} className="animate-in spin-in-180 duration-300" />
        ) : (
          <Menu size={24} className="animate-in fade-in duration-300" />
        )}
      </button>

      {/* LOGO - Optimized for Performance */}
      <div
        onClick={() => handleScroll("home")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleScroll("home")}
        aria-label="Go to home"
        className={`fixed top-6 left-6 z-[100] cursor-pointer group transition-all duration-500 ${isVisible && hasAnimated
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0"
          }`}
        style={{ transitionDelay: hasAnimated ? "0ms" : "100ms" }}
      >
        {/* Logo container with hover effects */}
        <div className="relative">
          {/* Glow effect container */}
          <div className="absolute 
          shadow-lg  shadow-red-600
          -inset-2 bg-crimson/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Logo image with optimizations */}
          <img
            src="/images/GFG redish logo 2.png"
            alt="Geekverse Logo"
            width={20}
            height={20}
            loading="eager"
            decoding="async"
            onLoad={() => setLogoLoaded(true)}
            className={`relative h-28 -top-5 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] ${logoLoaded ? "opacity-100" : "opacity-0"
              }`}
            style={{
              imageRendering: 'crisp-edges',
              willChange: 'transform',
            }}
          />

          {/* Loading placeholder */}
          {!logoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-crimson/20 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* OVERLAY MENU */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[90] transition-all duration-700 ${isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        {/* ANIMATED BACKGROUND */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-all duration-700"
          onClick={() => setIsOpen(false)}
        >
          {/* Animated gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 transition-opacity duration-1000 ${isOpen ? "opacity-100" : "opacity-0"
              }`}
          />

          {/* Radial glow effect */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-600/10 blur-[100px] transition-all duration-1000 ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
          />
        </div>

        {/* CIRCULAR NAVIGATION */}
        <nav className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[500px] max-w-[90vw] max-h-[90vh]">
            {/* CENTER GLOW */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
            >
              <div className="relative w-24 h-24">
                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-full border-2 border-red-600 animate-ping opacity-20" />
                <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-pulse" />

                {/* Center glow */}
                <div className="absolute inset-0 rounded-full bg-red-600/20 blur-xl" />

                {/* Logo in center */}
                <div className="absolute inset-0 rounded-full border border-red-600/50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
                  <img
                    src="/images/GFG redish logo 2.png" // Updated to match your logo path
                    alt="Geekverse"
                    width={60}
                    height={60}
                    loading="lazy"
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
              </div>
            </div>

            {/* NAVIGATION ITEMS */}
            {navItems.map((item, i) => {
              const angle = (i * 360) / navItems.length - 90;
              const r = 180;
              const x = r * Math.cos((angle * Math.PI) / 180);
              const y = r * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={item.sectionId}
                  className={`absolute top-1/2 left-1/2 transition-all duration-700 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    transitionDelay: isOpen ? `${i * 70 + 200}ms` : "0ms",
                  }}
                >
                  <button
                    onClick={() => handleScroll(item.sectionId)}
                    className="relative group px-6 py-3 rounded-full bg-black/60 border-2 border-red-600/50 text-red-500 font-semibold backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-110 hover:border-red-500 hover:text-white"
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/50 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-300" />

                    {/* Text */}
                    <span className="relative z-10">{item.label}</span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </button>
                </div>
              );
            })}

            {/* ROTATING OUTER RING */}
            <svg
              className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              viewBox="0 0 500 500"
              style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
            >
              {/* Outer dashed circle */}
              <circle
                cx="250"
                cy="250"
                r="180"
                fill="none"
                stroke="#dc2626"
                strokeWidth="1.5"
                strokeDasharray="10 10"
                opacity="0.4"
                className="animate-spin-slow"
                style={{ transformOrigin: "center" }}
              />

              {/* Inner solid circle */}
              <circle
                cx="250"
                cy="250"
                r="170"
                fill="none"
                stroke="#dc2626"
                strokeWidth="0.5"
                opacity="0.2"
                className="animate-spin-reverse"
                style={{ transformOrigin: "center" }}
              />

              {/* Glow circle */}
              <circle
                cx="250"
                cy="250"
                r="180"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                opacity="0.1"
                filter="blur(4px)"
              />
            </svg>

            {/* DECORATIVE DOTS */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const r = 200;
              const x = 250 + r * Math.cos((angle * Math.PI) / 180);
              const y = 250 + r * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={angle}
                  className={`absolute transition-all duration-700 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transitionDelay: isOpen ? `${i * 50 + 300}ms` : "0ms",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-600/50 animate-pulse" />
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes music-bar {
            0% { height: 4px; }
            50% { height: 16px; }
            100% { height: 4px; }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-music-bar {
            animation: music-bar 0.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default CircularNav;