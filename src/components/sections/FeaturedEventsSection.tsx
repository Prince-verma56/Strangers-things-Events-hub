
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { events } from '@/data/events';

gsap.registerPlugin(ScrollTrigger);

const FeaturedEventsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const featuredEvents = events.filter(event => event.isFeatured);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate elements on scroll
      gsap.from(".featured-card", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      gsap.from(".featured-content", {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeEvent = featuredEvents[activeEventIndex];

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 px-4 flex items-center bg-background overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10" />
         <img 
            src={activeEvent.image} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 transition-opacity duration-1000 ease-in-out"
         />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-['Kraken'] text-foreground mb-4">
                FEATURED <span className="text-crimson">EVENTS</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover the most anticipated events happening on campus.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section: Event Card */}
          <div className="featured-card group relative cursor-pointer" onClick={() => navigate(`/event/${activeEvent.id}`)}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border/20 transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src={activeEvent.image} 
                alt={activeEvent.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex gap-2 mb-3">
                    <span className="bg-crimson/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                        {activeEvent.category}
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 font-stranger tracking-wide">{activeEvent.title}</h3>
                <div className="h-1 w-0 bg-crimson group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </div>
            
            {/* Navigation Dots (Carousel-like) */}
            <div className="flex gap-2 mt-6 justify-center md:justify-start">
                {featuredEvents.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveEventIndex(idx);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeEventIndex ? 'bg-crimson w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground'}`}
                    />
                ))}
            </div>
          </div>

          {/* Right Section: Event Details */}
          <div className="featured-content space-y-6">
            <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold font-stranger text-foreground">
                    {activeEvent.title}
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {activeEvent.description}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/10">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-crimson/10 text-crimson">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold">{activeEvent.date}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-crimson/10 text-crimson">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-semibold">{activeEvent.location}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <p className="font-semibold text-lg">Event Highlights:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeEvent.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                            {highlight}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pt-4">
                <Button 
                    onClick={() => navigate(`/event/${activeEvent.id}`)}
                    className="bg-crimson hover:bg-crimson/90 text-white text-lg px-8 py-6 rounded-full group transition-all duration-300 shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.7)]"
                >
                    View Event Details
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;
