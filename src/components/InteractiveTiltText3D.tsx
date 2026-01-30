import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";

const InteractiveTiltText3D = ({ children }) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  const handleMove = ({ clientX, clientY, currentTarget }) => {
    if (!hover) return;

    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);

    gsap.to(ref.current, {
      rotationY: x / 90,     // slower tilt
      rotationX: -y / 90,    // softer tilt
      y: y / 50,             // subtle parallax
      x: x / 50,
      duration: 0.85,        // smoother motion
      ease: "power3.out",    // softer easing
      transformPerspective: 1000,
    });
  };

  useEffect(() => {
    if (!hover) {
      gsap.to(ref.current, {
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [hover]);

  return (
    <section
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="inline-block select-none cursor-default"
      style={{ perspective: "1200px" }}
    >
      <div ref={ref} style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </section>
  );
};

export default InteractiveTiltText3D;
