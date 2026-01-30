import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";

const InteractiveTilt3D = ({ children }) => {
  const [hover, setHover] = useState(false);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);

    velocity.current = { x: x - lastPos.current.x, y: y - lastPos.current.y };
    lastPos.current = { x, y };

    if (!hover) return;

    gsap.to(cardRef.current, {
      rotationY: x / 18,
      rotationX: -y / 18,
      x: x / 20,
      y: y / 20,
      duration: 0.45,
      ease: "power2.out",
      transformPerspective: 900,
    });

    gsap.to(contentRef.current, {
      x: -x / 18,
      y: -y / 18,
      duration: 0.45,
      ease: "power2.out",
    });

    const speed = Math.min(Math.abs(velocity.current.x) + Math.abs(velocity.current.y), 60);

    gsap.to(glowRef.current, {
      opacity: 0.12 + speed / 100,
      scale: 1 + speed / 200,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  useEffect(() => {
    if (!hover) {
      gsap.to([cardRef.current, contentRef.current], {
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      });

      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [hover]);

  return (
    <section
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-full h-full rounded-xl"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={contentRef}
        className="w-full h-full origin-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-44 h-10 bg-crimson rounded-full blur-3xl opacity-0"
      />
    </section>
  );
};

export default InteractiveTilt3D;
