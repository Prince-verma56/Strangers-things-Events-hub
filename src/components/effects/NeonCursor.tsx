import { useEffect } from 'react';

const useCanvasCursor = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = false;
    let frame = 0;
    
    const pos = { x: 0, y: 0 };
    let lines: Line[] = [];
    
    const E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

    class Node {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
    }

    class Line {
      spring: number;
      friction: number;
      nodes: Node[];

      constructor(config: { spring: number }) {
        this.spring = config.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let i = 0; i < E.size; i++) {
          const node = new Node();
          node.x = pos.x || 0;
          node.y = pos.y || 0;
          this.nodes.push(node);
        }
      }

      update() {
        let spring = this.spring;
        let node = this.nodes[0];
        
        node.vx += (pos.x - node.x) * spring;
        node.vy += (pos.y - node.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
          node = this.nodes[i];
          if (i > 0) {
            const prev = this.nodes[i - 1];
            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * E.dampening;
            node.vy += prev.vy * E.dampening;
          }
          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;
          spring *= E.tension;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        let curr: Node, next: Node;
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;

        context.beginPath();
        context.moveTo(x, y);

        for (let i = 1; i < this.nodes.length - 2; i++) {
          curr = this.nodes[i];
          next = this.nodes[i + 1];
          x = 0.5 * (curr.x + next.x);
          y = 0.5 * (curr.y + next.y);
          context.quadraticCurveTo(curr.x, curr.y, x, y);
        }
        
        curr = this.nodes[this.nodes.length - 2];
        next = this.nodes[this.nodes.length - 1];
        context.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
        context.stroke();
        context.closePath();
      }
    }

    class Oscillator {
      phase: number;
      offset: number;
      frequency: number;
      amplitude: number;
      val: number;

      constructor(config: { phase?: number; offset?: number; frequency?: number; amplitude?: number }) {
        this.phase = config.phase || 0;
        this.offset = config.offset || 0;
        this.frequency = config.frequency || 0.001;
        this.amplitude = config.amplitude || 1;
        this.val = 0;
      }

      update(): number {
        this.phase += this.frequency;
        this.val = this.offset + Math.sin(this.phase) * this.amplitude;
        return this.val;
      }
    }

    const f = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    function render() {
      if (!ctx || !running) return;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < E.trails; i++) {
        if (lines[i]) {
            lines[i].update();
            lines[i].draw(ctx);
        }
      }
      
      frame++;
      window.requestAnimationFrame(render);
    }

    function resizeCanvas() {
      if (!ctx) return;
      ctx.canvas.width = window.innerWidth - 20;
      ctx.canvas.height = window.innerHeight;
    }

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
        if ('touches' in e) {
            pos.x = e.touches[0].pageX;
            pos.y = e.touches[0].pageY;
        } else {
            pos.x = (e as MouseEvent).clientX;
            pos.y = (e as MouseEvent).clientY;
        }
    };
    
    const onTouchStart = (e: TouchEvent) => {
         if (e.touches.length === 1) {
            pos.x = e.touches[0].pageX;
            pos.y = e.touches[0].pageY;
        }
    }

    const initLines = () => {
        lines = [];
        for (let i = 0; i < E.trails; i++) {
            lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
        }
    };

    const init = (e: MouseEvent | TouchEvent) => {
        document.removeEventListener('mousemove', init as EventListener);
        document.removeEventListener('touchstart', init as EventListener);
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchstart', onTouchStart);
        
        onMouseMove(e);
        initLines();
        render();
    };

    const onFocus = () => {
        if (!running) {
            running = true;
            render();
        }
    };

    const onBlur = () => {
        running = false;
    };

    // Start
    running = true;
    
    // Initial listeners
    document.addEventListener('mousemove', init as EventListener);
    document.addEventListener('touchstart', init as EventListener);
    
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    
    resizeCanvas();

    return () => {
      running = false;
      document.removeEventListener('mousemove', init as EventListener);
      document.removeEventListener('touchstart', init as EventListener);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchstart', onTouchStart);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);
};

export default useCanvasCursor;
