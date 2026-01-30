
import React from "react";
import { motion, Variants } from "framer-motion";
import InteractiveTilt3D from "../InteractiveTilt3D";

// Cinematic easing curve - smooth and premium
const SLOW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: SLOW_EASE },
  },
};

const card3DVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: SLOW_EASE,
    },
  },
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-[80vh] py-32 px-4 overflow-hidden bg-background"
      style={{ perspective: '1200px' }}
    >
      {/* Optimized Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />

      {/* Background Image - Optimized */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 1.8, ease: SLOW_EASE }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img
          src="/images/Bg/AboutBg2.png"
          alt="Background"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover pointer-events-none"
          style={{
            filter: 'brightness(1.1)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />

      {/* Radial glow effects */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, hsl(0 100% 50% / 0.25) 0%, transparent 55%),
            radial-gradient(circle at 70% 60%, hsl(0 100% 50% / 0.25) 0%, transparent 55%)
          `,
        }}
      />

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px", amount: 0.2 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={headerVariants}
          style={{ willChange: 'transform' }}
        >
          <h2 className="font-stranger-outline text-red-300 text-5xl sm:text-6xl md:text-7xl text-foreground mb-4">
            <span
              style={{
                textShadow: `
                  0 0 10px hsl(0 100% 50% / 1),
                  0 0 20px hsl(0 100% 50% / 0.8),
                  0 0 40px hsl(0 100% 50% / 0.6)
                `
              }}
            >
              OUR MISSION
            </span>
          </h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-crimson to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: SLOW_EASE }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={headerVariants}
          className="font-horror text-xl sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed text-center"
          style={{ willChange: 'transform' }}
        >
          Empowering the next generation of innovators. We organize premier events, hackathons, and workshops to help you
          <span className="text-crimson font-semibold"> Build, Connect, and Grow</span>.
        </motion.p>

        {/* Top Cards Grid */}
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <motion.div
            variants={card3DVariants}
            style={{ willChange: 'transform' }}
          >
            <InteractiveTilt3D>
              <div className="p-8 bg-card/20 backdrop-blur-md border border-red-400 border-border/30 rounded-xl transition-all duration-500 hover:border-crimson/50 hover:bg-card/40 hover:shadow-xl hover:shadow-crimson/10 relative overflow-hidden h-full">
                {/* Shiny effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <h3 className="font-empire text-2xl text-crimson mb-4 tracking-wider relative z-10">
                  WHAT WE DO
                </h3>
                <p className="font-horror text-muted-foreground leading-relaxed relative z-10">
                  From intense competitions to tech summits and cultural fests, we bring the campus alive with energy and innovation.
                  We provide the platform; you provide the talent.
                </p>
              </div>
            </InteractiveTilt3D>
          </motion.div>

          <motion.div
            variants={card3DVariants}
            style={{ willChange: 'transform' }}
          >
            <InteractiveTilt3D>
              <div className=" border-red-400 p-8 bg-card/20 backdrop-blur-md border border-border/30 rounded-xl transition-all duration-500 hover:border-crimson/50 hover:bg-card/40 hover:shadow-xl hover:shadow-crimson/10 relative overflow-hidden h-full">
                {/* Shiny effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <h3 className="font-empire text-2xl text-crimson mb-4 tracking-wider relative z-10">
                  WHY JOIN US?
                </h3>
                <p className="font-horror text-muted-foreground leading-relaxed relative z-10">
                  Connect with industry mentors, win exciting rewards, and showcase your skills on a national stage.
                  <span className="text-foreground font-semibold">
                    &nbsp;Experience the thrill of competition.
                  </span>
                </p>
              </div>
            </InteractiveTilt3D>
          </motion.div>
        </div>

        {/* Bottom Details Grid */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6 mt-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        >
          {[
            { title: "COMMUNITY", desc: "5000+ Students Strong" },
            { title: "EVENTS", desc: "10+ Annual Flagship Events" },
            { title: "OPPORTUNITIES", desc: "Internships & Networking" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={card3DVariants}
              style={{ willChange: 'transform' }}
            >
              <InteractiveTilt3D>
                <div className="p-6 bg-card/10 border border-white/5 rounded-lg hover:bg-card/20 transition-colors">
                    <h4 className="font-empire text-lg text-crimson mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </InteractiveTilt3D>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
