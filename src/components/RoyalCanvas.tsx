import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface RoyalCanvasHandle {
  triggerBlessingShower: () => void;
}

interface RoyalCanvasProps {
  isDark: boolean;
}

interface DustParticle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  swayPhase: number;
  kind: 'dot' | 'star' | 'petal';
  rotation: number;
  rotSpeed: number;
  colorIndex: number;
}

interface BlessingSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  isStar: boolean;
}

export const RoyalCanvas = forwardRef<RoyalCanvasHandle, RoyalCanvasProps>(
  function RoyalCanvas({ isDark }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const sparksRef = useRef<BlessingSpark[]>([]);
    const isDarkRef = useRef(isDark);

    useEffect(() => {
      isDarkRef.current = isDark;
    }, [isDark]);

    useImperativeHandle(ref, () => ({
      triggerBlessingShower() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const prefersReduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;
        if (prefersReduced) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const palette = isDarkRef.current
          ? ['#FF9EC7', '#FFD7EA', '#FFF5FA', '#D9A7FF']
          : ['#D63D7F', '#A84384', '#F06292', '#BA68C8'];

        const origins = [
          { x: width * 0.25, y: height * 0.35 },
          { x: width * 0.5, y: height * 0.24 },
          { x: width * 0.75, y: height * 0.35 },
        ];

        origins.forEach((origin, oIdx) => {
          const count = width < 640 ? 16 : 26;
          for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.28;
            const speed = 1.4 + Math.random() * 2.9;
            sparksRef.current.push({
              x: origin.x,
              y: origin.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.6,
              size: 1.8 + Math.random() * 2.4,
              life: -oIdx * 5,
              maxLife: 58 + Math.random() * 32,
              color: palette[Math.floor(Math.random() * palette.length)],
              isStar: i % 3 === 0,
            });
          }
        });
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      let width = window.innerWidth;
      let height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resize();
      window.addEventListener('resize', resize, { passive: true });

      const count = width < 640 ? 18 : 32;
      const particles: DustParticle[] = Array.from({ length: count }, (_, i) => {
        const kind: DustParticle['kind'] =
          i % 7 === 0 ? 'petal' : i % 4 === 0 ? 'star' : 'dot';
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: kind === 'petal' ? 3.0 + Math.random() * 1.8 : 0.9 + Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.16,
          vy: kind === 'petal' ? 0.18 + Math.random() * 0.22 : -0.1 - Math.random() * 0.18,
          alpha: 0.26 + Math.random() * 0.44,
          twinkleSpeed: 0.016 + Math.random() * 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          swayPhase: Math.random() * Math.PI * 2,
          kind,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.015,
          colorIndex: i % 3,
        };
      });

      const drawFourPointStar = (
        cx: number,
        cy: number,
        radius: number,
        color: string,
        alpha: number
      ) => {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(cx, cy - radius * 2.1);
        ctx.quadraticCurveTo(cx, cy, cx + radius * 2.1, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy + radius * 2.1);
        ctx.quadraticCurveTo(cx, cy, cx - radius * 2.1, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy - radius * 2.1);
        ctx.fill();
      };

      const drawPetal = (
        cx: number,
        cy: number,
        size: number,
        rot: number,
        color: string,
        alpha: number
      ) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.globalAlpha = alpha * 0.72;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 1.1, size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      let rafId = 0;

      const renderFrame = () => {
        if (document.hidden) {
          rafId = window.requestAnimationFrame(renderFrame);
          return;
        }

        ctx.clearRect(0, 0, width, height);
        const darkMode = isDarkRef.current;
        const darkColors = ['#FF9EC7', '#FFD7EA', '#D9A7FF'];
        const lightColors = ['#D63D7F', '#A84384', '#F06292'];

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!prefersReduced) {
            p.swayPhase += 0.012;
            p.x += p.vx + (p.kind === 'petal' ? Math.sin(p.swayPhase) * 0.24 : 0);
            p.y += p.vy;
            p.twinklePhase += p.twinkleSpeed;
            p.rotation += p.rotSpeed;

            if (p.y < -16) p.y = height + 16;
            if (p.y > height + 16) p.y = -16;
            if (p.x < -16) p.x = width + 16;
            if (p.x > width + 16) p.x = -16;
          }

          const twinkle = 0.55 + 0.45 * Math.sin(p.twinklePhase);
          const alpha = p.alpha * twinkle * (darkMode ? 0.85 : 0.52);
          const color = darkMode
            ? darkColors[p.colorIndex]
            : lightColors[p.colorIndex];

          if (p.kind === 'petal') {
            drawPetal(p.x, p.y, p.r, p.rotation, color, alpha);
          } else if (p.kind === 'star') {
            drawFourPointStar(p.x, p.y, p.r * 1.12, color, alpha);
          } else {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        const sparks = sparksRef.current;
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.life += 1;
          if (s.life < 0) continue;
          if (s.life >= s.maxLife) {
            sparks.splice(i, 1);
            continue;
          }

          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.028;
          s.vx *= 0.986;

          const progress = s.life / s.maxLife;
          const alpha = Math.max(0, 1 - progress);

          if (s.isStar) {
            drawFourPointStar(s.x, s.y, s.size * 1.12, s.color, alpha);
          } else {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.globalAlpha = 1;

        if (!prefersReduced) {
          rafId = window.requestAnimationFrame(renderFrame);
        }
      };

      renderFrame();

      return () => {
        window.removeEventListener('resize', resize);
        if (rafId) window.cancelAnimationFrame(rafId);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
      />
    );
  }
);
