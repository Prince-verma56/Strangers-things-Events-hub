import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Twitter, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const judges = [
  {
    name: "Mr. Prince Verma",
    role: "FullStack .NextJs.Mern Developer",
    company: "TechCorp",
    image: "/images/Mentors/Prince.png",
    bio: "Pioneer in neural networks with 15+ years of experience in machine learning and artificial intelligence.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sneha Aggrawal",
    role: "FullStack .NextJs.Mern Developer",
    company: "StartupX",
    image: "/images/Mentors/SnehaDii.jpeg",
    bio: "Serial entrepreneur who built 3 unicorn startups. Expert in scaling tech products from zero to millions of users.",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Om Lashkar",
    role: "GenAi Developer",
    company: "BigTech Inc",
    image: "/images/Mentors/OmBhaiya.jpeg",
    bio: "Led engineering teams building products used by billions. 20+ years of experience in software architecture.",
    linkedin: "#",
    twitter: "#",
  },
];

// Enhanced Floating Card Component
interface FloatingCardProps {
  children: React.ReactNode;
  index: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, index }) => {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !contentRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xOffset = e.clientX - (rect.left + rect.width / 2);
    const yOffset = e.clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      gsap.to(containerRef.current, {
        x: xOffset / 10,
        y: yOffset / 10,
        rotationY: xOffset / 15,
        rotationX: -yOffset / 15,
        transformPerspective: 1000,
        duration: 0.6,
        ease: "power2.out",
      });

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
      className="judge-card-wrapper h-full"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={contentRef}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full"
      >
        {children}
      </div>
    </div>
  );
};

const JudgesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Card stagger animation
      const validCards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: validCards[0],
              start: "top 85%",
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
      className="relative min-h-[90vh] py-32 px-4 overflow-hidden"
      id="judges"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-zinc-950/90 to-background z-0" />
      
      <div className="absolute inset-0 bg-black/10 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="font-['Kraken'] text-5xl sm:text-6xl md:text-8xl text-foreground mb-6"
          >
            OUR <span className="text-crimson text-glow-red">MENTORS</span>
          </h2>
          <p className="font-sans text-xl text-muted-foreground">
            Industry legends who guide our community
          </p>
        </div>

        {/* Judge cards - 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {judges.map((judge, index) => (
             <div ref={el => { cardRefs.current[index] = el; }} key={index}>
              <FloatingCard index={index}>
                  <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-crimson/50 transition-colors duration-500 h-full flex flex-col group relative shadow-2xl">
                      {/* Gradient Overlay on Card */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none z-10" />

                      {/* Image Area */}
                      <div className="h-64 overflow-hidden relative bg-zinc-800">
                         <img 
                            src={judge.image} 
                            alt={judge.name}
                            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-0" />
                      </div>

                      <div className="p-6 relative z-20 -mt-12 flex flex-col flex-grow">
                          <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 p-4 rounded-xl mb-4 text-center transform group-hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                              <h3 className="font-stranger text-2xl text-white tracking-wide mb-1">{judge.name}</h3>
                              <p className="text-crimson text-xs font-bold uppercase tracking-wider">{judge.role}</p>
                              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">{judge.company}</p>
                          </div>

                          <p className="text-zinc-400 text-sm leading-relaxed mb-6 text-center line-clamp-4 flex-grow">
                              {judge.bio}
                          </p>

                          <div className="flex justify-center gap-4 mt-auto pt-4 border-t border-white/5">
                              <a href={judge.linkedin} className="text-zinc-500 hover:text-crimson transition-colors transform hover:scale-110">
                                  <Linkedin size={18} />
                              </a>
                              {judge.twitter && judge.twitter !== "#" && (
                                  <a href={judge.twitter} className="text-zinc-500 hover:text-crimson transition-colors transform hover:scale-110">
                                      <Twitter size={18} />
                                  </a>
                              )}
                              {judge.github && judge.github !== "#" && (
                                  <a href={judge.github} className="text-zinc-500 hover:text-crimson transition-colors transform hover:scale-110">
                                      <Github size={18} />
                                  </a>
                              )}
                          </div>
                      </div>
                  </div>
              </FloatingCard>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JudgesSection;