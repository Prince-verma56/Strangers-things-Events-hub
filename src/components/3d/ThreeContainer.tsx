import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HeroCharModel from "./HeroCharModel"; // your GLB model component

import dimag from "../../assets/mind.png";
import circut from "../../assets/circut.png";
import globeImg from "../../assets/globe.png";
import game from "../../assets/gameing.png";

const tracks = [
  {
    icon: dimag,
    name: "AI & MACHINE LEARNING",
    description:
      "Build intelligent systems that learn and adapt. Create something that thinks.",
    color: "hsl(0 100% 50%)",
  },
  {
    icon: circut,
    name: "WEB3 & BLOCKCHAIN",
    description:
      "Decentralize the future. Build on the next generation of the internet.",
    color: "hsl(185 100% 50%)",
  },
  {
    icon: game,
    name: "GAMING & INTERACTIVE",
    description:
      "Create captivating experiences. Games, simulations, immersive worlds.",
    color: "hsl(280 100% 60%)",
  },
  {
    icon: globeImg,
    name: "SOCIAL IMPACT",
    description:
      "Technology for good. Solve problems affecting real people.",
    color: "hsl(120 100% 40%)",
  },
];

const TracksSection = () => {
  return (
    <section
      className="relative min-h-screen py-32 px-4 overflow-hidden"
      id="tracks"
    >
      {/* Gradient BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-20 px-6">
          <h2 className="font-['empire']  text-5xl sm:text-6xl md:text-8xl text-foreground mb-4">
            CHOOSE YOUR <span className="text-crimson text-glow-red">PATH</span>
          </h2>
          <p className="font-horror text-xl text-muted-foreground">
            Four dimensions. Infinite possibilities.
          </p>
        </div>

        {/* GRID: LEFT MODEL + RIGHT SCROLL */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* LEFT — 3D MODEL */}
          <div className="relative flex justify-center items-center w-full">
            <div className="aspect-square w-full max-w-[430px] mx-auto rounded-xl bg-black/10 border border-white/10 backdrop-blur-sm overflow-hidden">
              <Canvas
                camera={{ position: [0, 1.4, 2.8], fov: 50 }}
                className="rounded-xl"
              >
                <ambientLight intensity={0.9} />
                <directionalLight intensity={1.1} position={[3, 3, 5]} />

                {/* Wrapping HeroCharModel in <group> allows scale & position safely */}
                <group scale={1.6} position={[0, -0.8, 0]}>
                  <HeroCharModel />
                </group>

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
              </Canvas>
            </div>
          </div>

          {/* RIGHT — Scrollable Tracks */}
          <div className="max-h-[70vh] overflow-y-auto pr-3 custom-scroll space-y-6">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="group relative p-8 bg-card/50 border border-border/30 rounded-lg backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]"
                style={{ boxShadow: "0 0 0 transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${track.color}40, inset 0 0 40px ${track.color}15`;
                  e.currentTarget.style.borderColor = track.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 transparent";
                  e.currentTarget.style.borderColor = "hsl(var(--border) / .3)";
                }}
              >
                {/* ICON */}
                <div className="relative mb-6">
                  <img
                    src={track.icon}
                    className="w-14 h-14 object-contain transition-all duration-500 group-hover:scale-125 group-hover:rotate-6"
                    style={{ filter: `drop-shadow(0 0 18px ${track.color})` }}
                  />
                </div>

                {/* TITLE */}
                <h3 className="font-stranger text-2xl sm:text-3xl text-foreground mb-3 tracking-wider">
                  {track.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="font-sans text-muted-foreground leading-relaxed">
                  {track.description}
                </p>

                {/* Animated Bottom Line */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: track.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center font-horror text-muted-foreground mt-12">
          Can't decide? Enter the Open Track — build anything you desire.
        </p>
      </div>

      {/* Scrollbar CSS */}
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: hsl(0 100% 50% / .3); border-radius: 100px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </section>
  );
};

export default TracksSection;
