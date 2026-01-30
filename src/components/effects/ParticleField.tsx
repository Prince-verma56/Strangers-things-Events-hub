import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let lastTime = 0;
    const fps = 45;
    const interval = 1000 / fps;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth / 1);
      canvas.height = Math.floor(window.innerHeight / 1);
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.005 + 0.002,
    });

    const initParticles = () => {
      particles = Array.from({ length: 100 }, createParticle);
    };

    const animate = (time?: number) => {
      if (typeof time !== 'number') {
        animationId = requestAnimationFrame(animate);
        return;
      }
      const elapsed = time - lastTime;
      if (elapsed >= interval) {
        lastTime = time;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          particle.opacity -= particle.fadeSpeed;

          if (particle.opacity <= 0 || particle.y < -10) {
            particles[index] = createParticle();
            particles[index].y = canvas.height + 10;
            particles[index].opacity = Math.random() * 0.5 + 0.1;
          }

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 50, 50, ${particle.opacity})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 50, 50, ${particle.opacity * 0.3})`;
          ctx.fill();
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate(0);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.6, width: '100%', height: '100%' }}
    />
  );
};

export default ParticleField;
