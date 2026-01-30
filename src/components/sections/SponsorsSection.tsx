const sponsors = [
  { name: "TECHCORP", tier: "platinum" },
  { name: "INNOVATE", tier: "platinum" },
  { name: "FUTUREDEV", tier: "gold" },
  { name: "CODEBASE", tier: "gold" },
  { name: "DATAFLOW", tier: "gold" },
  { name: "CLOUDNINE", tier: "silver" },
  { name: "DEVTOOLS", tier: "silver" },
  { name: "APIWORKS", tier: "silver" },
  { name: "STACKIFY", tier: "silver" },
  { name: "BUILDFAST", tier: "silver" },
];

const SponsorsSection = () => {
  return (
    <section className="relative py-32 overflow-hidden"
    id="sponsors">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-void-deep to-background" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 px-4">
          <h2 className="font-stranger text-5xl sm:text-6xl md:text-8xl text-foreground mb-4 gsap-fade-up">
          OUR <span className="text-crimson text-glow-red">PARTNERS</span>
        </h2>
        <p className="font-horror text-xl text-muted-foreground gsap-fade-up">
          Leading organizations powering our campus events
        </p>
        </div>

        {/* Infinite scroll marquee */}
        <div className="relative py-12 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Marquee track */}
          <div className="flex animate-marquee">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={index}
                className="group flex-shrink-0 mx-8 px-8 py-6 bg-card/20 border border-border/20 hover:border-crimson/30 transition-all duration-300 hoverable"
              >
                <span 
                  className={`font-stranger text-2xl sm:text-3xl tracking-widest transition-all duration-300 ${
                    sponsor.tier === 'platinum' 
                      ? 'text-foreground group-hover:text-glow-red' 
                      : sponsor.tier === 'gold'
                      ? 'text-muted-foreground group-hover:text-foreground'
                      : 'text-muted-foreground/70 group-hover:text-muted-foreground'
                  }`}
                >
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - opposite direction */}
        <div className="relative py-12 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-marquee" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
            {[...sponsors.reverse(), ...sponsors].map((sponsor, index) => (
              <div
                key={index}
                className="group flex-shrink-0 mx-8 px-8 py-6 bg-card/20 border border-border/20 hover:border-crimson/30 transition-all duration-300 hoverable"
              >
                <span 
                  className="font-stranger text-2xl sm:text-3xl tracking-widest text-muted-foreground/50 group-hover:text-muted-foreground transition-all duration-300"
                >
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Become a sponsor CTA */}
        <div className="text-center mt-12 px-4 gsap-fade-up">
          <button className="font-stranger text-lg tracking-widest text-muted-foreground hover:text-crimson underline-draw transition-colors hoverable">
            BECOME A SPONSOR
          </button>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;