import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, Variants } from "framer-motion";
import HeroCharModel from "../3d/HeroCharModel";

// Asset Imports
import dimag from "../../assets/mind.png";
import circut from "../../assets/circut.png";
import globeImg from "../../assets/globe.png";
import game from "../../assets/gameing.png";

// Typed ease curve
const SLOW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: SLOW_EASE }
  }
};

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const tracks = [
  {
    icon: dimag,
    name: "AI & MACHINE LEARNING",
    description: "Build intelligent systems that learn and adapt. Create something that thinks.",
    color: "hsl(0 100% 50%)",
  },
  {
    icon: circut,
    name: "WEB3 & BLOCKCHAIN",
    description: "Decentralize the future. Build on the next generation of the internet.",
    color: "hsl(185 100% 50%)",
  },
  {
    icon: game,
    name: "GAMING & INTERACTIVE",
    description: "Create captivating experiences. Games, simulations, immersive worlds.",
    color: "hsl(280 100% 60%)",
  },
  {
    icon: globeImg,
    name: "SOCIAL IMPACT",
    description: "Technology for good. Solve problems affecting real people.",
    color: "hsl(120 100% 40%)",
  },
];

// Professional Parallax Container
interface ParallaxTiltContainerProps {
  children: React.ReactNode;
}

const ParallaxTiltContainer: React.FC<ParallaxTiltContainerProps> = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - (rect.left + rect.width / 2);
    const yOffset = e.clientY - (rect.top + rect.height / 2);

    if (isHovering && sectionRef.current && contentRef.current) {
      // Container tilt
      gsap.to(sectionRef.current, {
        x: xOffset / 25,
        y: yOffset / 25,
        rotationY: xOffset / 30,
        rotationX: -yOffset / 30,
        transformPerspective: 1000,
        duration: 1.2,
        ease: "power2.out",
      });

      // Content parallax (reverse)
      gsap.to(contentRef.current, {
        x: -xOffset / 15,
        y: -yOffset / 15,
        duration: 1.2,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    if (!isHovering && sectionRef.current && contentRef.current) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
      });
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, [isHovering]);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full h-[65vh] rounded-xl border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={contentRef}
        className="w-[110%] h-[110%] absolute -top-[5%] -left-[5%]"
      >
        {children}
      </div>

      <div className="absolute inset-0 pointer-events-none z-30 border border-white/5 rounded-xl" />
    </div>
  );
};

const TracksSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const infiniteTracks = [...tracks, ...tracks];

  // Auto-scroll logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isHovered) {
        scrollPos += speed;
        if (scrollPos >= el.scrollHeight / 2) scrollPos = 0;
        el.scrollTop = scrollPos;
      } else {
        scrollPos = el.scrollTop;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section id="tracks" className="relative min-h-screen py-32 px-4 overflow-hidden">

      {/* Global Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />

      {/* Background Image with optimized loading */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: SLOW_EASE }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/Bg/AboutBg2.png"
          alt="Background"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover pointer-events-none"
          style={{
            opacity: 0.9,
            filter: 'brightness(1.1)',
            willChange: 'transform',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header - Staggered Entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={STAGGER_CONTAINER}
          className="text-center mb-20"
        >
          <motion.h2
            variants={FADE_UP_VARIANTS}
            className="font-['Kraken'] text-5xl sm:text-6xl md:text-8xl text-foreground mb-4"
          >
            CHOOSE YOUR{" "}
            <span
              className="text-crimson font-Kraken"
              style={{
                textShadow: "0 0 10px hsl(0 100% 50% / 1), 0 0 20px hsl(0 100% 50% / 0.8), 0 0 40px hsl(0 100% 50% / 0.6)"
              }}
            >
              PATH
            </span>
          </motion.h2>
          <motion.p variants={FADE_UP_VARIANTS} className="font-horror text-xl text-zinc-300">
            Four dimensions. Infinite possibilities.
          </motion.p>
        </motion.div>

        {/* Two-column Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT: Interactive 3D Parallax Container */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.5, ease: SLOW_EASE }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-20"
          >
            <ParallaxTiltContainer>
              {/* Background Media Layer */}
              <div className="absolute inset-0 z-0">
                {/* Video Background */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover scale-105"
                  style={{
                    filter: 'brightness(0.5)',
                    willChange: 'transform',
                  }}
                >
                  <source src="/videos/3D model BgVideo.mp4" type="video/mp4" />
                </video>

                {/* Fallback: Uncomment for image instead
                <img 
                  src="/images/Bg/3D model BgImage.png" 
                  alt="3D Environment"
                  loading="lazy"
                  className="w-full h-full object-cover scale-105"
                  style={{ filter: 'brightness(0.6) contrast(1.1)' }}
                />
                */}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

              {/* 3D Model Canvas */}
              <div className="absolute inset-0 z-20">
                <Canvas
                  camera={{ position: [0, 1.5, 4], fov: 25 }}
                  gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                  }}
                >
                  <ambientLight intensity={1} />
                  <directionalLight position={[4, 4, 4]} intensity={1} />
                  <directionalLight position={[-4, 2, -4]} intensity={0.5} />
                  <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={2.5}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                  />

                  <Suspense fallback={null}>
                    <HeroCharModel />
                  </Suspense>
                </Canvas>
              </div>

              {/* Decorative Borders */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-crimson/50 z-30 opacity-70" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-crimson/50 z-30 opacity-70" />
            </ParallaxTiltContainer>
          </motion.div>

          {/* RIGHT: Scrollable Track List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: SLOW_EASE, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative h-[65vh] w-full"
          >
            {/* Fade Masks */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background via-background/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/90 to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="h-full overflow-y-auto hide-scrollbar space-y-5 px-2 py-4"
              style={{ overscrollBehavior: "contain" }}
            >
              {infiniteTracks.map((track, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "50px", once: false }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="group relative p-5 rounded-xl border bg-black/20 backdrop-blur-md transition-all duration-500 hover:bg-black/40 cursor-pointer"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = track.color;
                    e.currentTarget.style.boxShadow = `0 0 25px ${track.color}20, inset 0 0 10px ${track.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center gap-5">
                    <div className="relative shrink-0 p-3 bg-white/5 rounded-lg border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={track.icon}
                        alt={track.name}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="w-10 h-10 object-contain"
                        style={{ filter: `drop-shadow(0 0 5px ${track.color})` }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-stranger text-lg sm:text-xl text-foreground mb-1 tracking-wider group-hover:text-white transition-colors duration-300">
                        {track.name}
                      </h3>
                      <p className="font-horror text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 line-clamp-2">
                        {track.description}
                      </p>
                    </div>
                  </div>
                  {/* Animated bottom line */}
                  <div
                    className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                    style={{
                      background: track.color,
                      boxShadow: `0 0 8px ${track.color}`
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          viewport={{ once: true }}
          className="text-center font-horror text-muted-foreground mt-16 text-lg"
        >
          Can't decide? Enter the <span className="text-crimson">Open Track</span> — build anything your heart desires.
        </motion.p>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-crimson/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle ${6 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 0 4px hsl(0 100% 50% / 0.8)',
            }}
          />
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes particle {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default TracksSection;