import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLenisContext } from "@/context/LenisContext";
import clsx from "clsx";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

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

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Auto play audio logic
  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    const unlock = () => {
      audio.play().catch(() => {});
      window.removeEventListener("scroll", unlock);
      document.removeEventListener("click", unlock);
    };

    window.addEventListener("scroll", unlock);
    document.addEventListener("click", unlock);

    return () => {
      window.removeEventListener("scroll", unlock);
      document.removeEventListener("click", unlock);
    };
  }, []);

  useEffect(() => {
    const audio = audioElementRef.current;
    if (audio) {
      if (isAudioPlaying) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
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

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  // Handle Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* --- AUDIO BUTTON (Shifted Left) --- */}
      <button
        onClick={toggleAudioIndicator}
        aria-label="Toggle Audio"
        className={`fixed top-6 right-32 md:right-40 z-[100] h-14 px-4 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-black/60 ${
          isVisible && hasAnimated ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        }`}
      >
        <audio
          ref={audioElementRef}
          className="hidden"
          src="/music/Stranger thing bg music.mp3"
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
              style={{ animationDelay: `${bar * 0.1}s` }}
            />
          ))}
        </div>
        <span className="ml-3 font-sans text-xs font-bold hidden sm:block">
          {isAudioPlaying ? "SOUND ON" : "SOUND OFF"}
        </span>
      </button>

      {/* --- AUTH BUTTONS (Shifted Left) --- */}
      <div
        className={`fixed top-6 right-64 lg:right-80 z-[100] hidden md:flex items-center gap-4 transition-all duration-500 ${
          isVisible && hasAnimated ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        }`}
      >
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-black/40 text-white border border-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-xs font-bold shadow-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
              LOG IN
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-crimson text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-lg hover:bg-red-700 hover:scale-105 hover:shadow-red-600/40 transition-all duration-300">
              REGISTER
            </button>
          </SignUpButton>
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

      {/* --- MENU TRIGGER --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 right-6 z-[100] w-14 h-14 rounded-full bg-crimson text-white flex items-center justify-center shadow-lg transition-all duration-500 ${
          isVisible && hasAnimated ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        } ${isOpen ? "scale-110 rotate-90 shadow-red-600/60" : "hover:scale-110"}`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* --- LOGO --- */}
      <div
        onClick={() => handleScroll("home")}
        className={`fixed top-2 left-4 z-[100] cursor-pointer transition-all duration-500 ${
          isVisible && hasAnimated ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        }`}
      >
        <img
          src="/images/GFG redish logo 2.png"
          alt="Geekverse Logo"
          className={`h-24 w-auto object-contain transition-all duration-500 hover:scale-110 ${logoLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLogoLoaded(true)}
        />
      </div>

      {/* --- OVERLAY MENU --- */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[90] transition-all duration-700 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsOpen(false)} />

        <nav className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[500px] max-w-[90vw] max-h-[90vh]">
            
            {/* Mobile Auth in Center */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
               <div className="flex flex-col items-center gap-4">
                  <SignedOut>
                    <div className="md:hidden flex flex-col gap-3">
                      <SignInButton mode="modal">
                        <button className="bg-white/10 text-white px-8 py-2 rounded-full border border-white/20 text-[10px] font-bold tracking-widest">LOGIN</button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="bg-crimson text-white px-8 py-2 rounded-full text-[10px] font-bold tracking-widest">JOIN NOW</button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <UserButton appearance={{ elements: { avatarBox: "w-16 h-16 border-4 border-crimson" } }} />
                  </SignedIn>
               </div>
            </div>

            {/* Circular Nav Items */}
            {navItems.map((item, i) => {
              const angle = (i * 360) / navItems.length - 90;
              const r = typeof window !== "undefined" && window.innerWidth < 640 ? 130 : 180;
              const x = r * Math.cos((angle * Math.PI) / 180);
              const y = r * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={item.sectionId}
                  className="absolute top-1/2 left-1/2 transition-all duration-700"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    transitionDelay: isOpen ? `${i * 60 + 200}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <button
                    onClick={() => handleScroll(item.sectionId)}
                    className="group relative px-5 py-2.5 rounded-full bg-black/60 border border-red-600/40 text-red-500 font-bold text-[10px] tracking-widest backdrop-blur-sm transition-all hover:scale-110 hover:border-red-500 hover:text-white"
                  >
                    {item.label.toUpperCase()}
                  </button>
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-music-bar { animation: music-bar 0.5s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default CircularNav;