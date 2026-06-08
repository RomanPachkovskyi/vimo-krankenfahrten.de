import { useCallback } from "react";
import { useCanvasBg, type CanvasContext } from "./useCanvasBg";

interface Theme {
  bg: string;
  dotColor: string;
  lineColor: string;
  baseAlpha: number;
  lineAlpha: number;
  mouseAlpha: number;
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const COUNT = 80;
const SPEED = 0.5;
const THRESH = 90;
const MOUSE_THRESH = 120;

const makeParticles = (theme: Theme) => {
  const init = ({ W, H }: CanvasContext): Point[] =>
    Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 0.8 + 0.4,
    }));

  const draw = ({ ctx, W, H, mouse }: CanvasContext, pts: Point[]) => {
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, W, H);

    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < THRESH) {
          ctx.strokeStyle = `rgba(${theme.lineColor},${((1 - d / THRESH) * theme.lineAlpha).toFixed(3)})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    if (mouse.x > -9000) {
      for (const p of pts) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < MOUSE_THRESH) {
          ctx.strokeStyle = `rgba(${theme.lineColor},${((1 - d / MOUSE_THRESH) * theme.mouseAlpha).toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }
    }

    for (const p of pts) {
      const near = mouse.x > -9000 && Math.hypot(p.x - mouse.x, p.y - mouse.y) < MOUSE_THRESH;
      ctx.fillStyle = `rgba(${theme.dotColor},${near ? theme.baseAlpha + 0.5 : theme.baseAlpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + (near ? 0.5 : 0), 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return { init, draw };
};

const ParticlesCanvas = ({ theme }: { theme: Theme }) => {
  const init = useCallback(makeParticles(theme).init, [theme.bg]);
  const draw = useCallback(makeParticles(theme).draw, [theme]);
  const { wrapperRef, canvasRef } = useCanvasBg({ init, draw });

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export const Particles = () => (
  <ParticlesCanvas
    theme={{
      bg: "#0b0f19",
      dotColor: "180,200,255",
      lineColor: "180,210,255",
      baseAlpha: 0.22,
      lineAlpha: 0.12,
      mouseAlpha: 0.35,
    }}
  />
);

export const ParticlesLight = () => (
  <ParticlesCanvas
    theme={{
      bg: "#f9f9f9",
      dotColor: "40,60,120",
      lineColor: "60,80,160",
      baseAlpha: 0.25,
      lineAlpha: 0.1,
      mouseAlpha: 0.3,
    }}
  />
);
