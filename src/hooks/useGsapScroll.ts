import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapScroll = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Configure ScrollTrigger for better performance
    ScrollTrigger.config({
      limitCallbacks: true, // Limit callback frequency for better performance
      syncInterval: 150, // Sync less frequently (default is 17ms)
    });

    // Fade in up animations
    gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
            // Performance optimization
            fastScrollEnd: true,
          },
        }
      );
    });

    // Scale in animations
    gsap.utils.toArray<HTMLElement>('.gsap-scale-in').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            invalidateOnRefresh: true,
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          },
        }
      );
    });

    // Slide in from left
    gsap.utils.toArray<HTMLElement>('.gsap-slide-left').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            invalidateOnRefresh: true,
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          },
        }
      );
    });

    // Slide in from right
    gsap.utils.toArray<HTMLElement>('.gsap-slide-right').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            invalidateOnRefresh: true,
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          },
        }
      );
    });

    // Stagger children animations
    gsap.utils.toArray<HTMLElement>('.gsap-stagger').forEach((container) => {
      const children = Array.from(container.children) as HTMLElement[];
      gsap.fromTo(children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            invalidateOnRefresh: true,
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          },
        }
      );
    });

    // Parallax effect - optimized with scrub
    gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
      gsap.to(el, {
        yPercent: -30,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // Smooth scrubbing with 1 second delay
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export default useGsapScroll;

