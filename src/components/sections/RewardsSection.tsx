import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { events } from '@/data/events';

gsap.registerPlugin(ScrollTrigger);

const RewardsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".event-card", { y: 50, opacity: 0 });

      gsap.to(".event-card", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="rewards" className="relative min-h-[80vh] py-32 px-4 overflow-hidden flex items-center justify-center">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-background via-zinc-950/90 to-background z-10" />
         <div className="absolute inset-0 bg-void-deep opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-['Kraken'] text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 gsap-fade-up">
            UPCOMING <span className="text-crimson text-glow-red">EVENTS</span>
          </h2>
          <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto gsap-fade-up leading-relaxed">
            Mark your calendar for these exciting opportunities to learn, compete, and connect with the community.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              className="event-card group relative bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2 will-change-transform cursor-pointer"
            >
              {/* Dynamic Gradient Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, crimson 0%, transparent 70%)`,
                }}
              />

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shine" />
              </div>

              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
              </div>

              {/* Event Content */}
              <div className="relative z-10 p-6 flex flex-col h-[calc(100%-12rem)]">
                <h3 className="font-stranger text-xl mb-3 tracking-wide text-white group-hover:text-crimson transition-colors duration-300 drop-shadow-md line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed font-sans mb-4 opacity-90 group-hover:opacity-100 transition-opacity line-clamp-3 flex-grow">
                  {event.shortDescription || event.description}
                </p>

                {/* Event Details */}
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={14} className="text-crimson" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={14} className="text-crimson" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;