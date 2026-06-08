import { useCallback } from "react";
import { useCanvasBg, type CanvasContext } from "./useCanvasBg";

interface Theme {
  bg: string;
  dotColor: string;     // "r,g,b"
  baseAlpha: number;
  peakAlpha: number;
}

interface Dot {
  bx: number;
  by: number;
  cx: number;
  cy: number;
  a: number;
}

const SPACING = 20;
const INFLUENCE = 130;
const REPEL = 12;
const EASE = 0.09;
const RADIUS = 1.28;

const makeDotGrid = (theme: Theme) => {
  // Stable callbacks so the hook's effect deps stay stable
  const init = ({ W, H }: CanvasContext): Dot[] => {
    const dots: Dot[] = [];
    for (let x = SPACING / 2; x < W + SPACING; x += SPACING) {
      for (let y = SPACING / 2; y < H + SPACING; y += SPACING) {
        dots.push({ bx: x, by: y, cx: x, cy: y, a: theme.baseAlpha });
      }
    }
    return dots;
  };

  const draw = ({ ctx, W, H, mouse }: CanvasContext, dots: Dot[]) => {
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, W, H);
    for (const d of dots) {
      const dx = d.bx - mouse.x;
      const dy = d.by - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let ta = theme.baseAlpha;
      let tx = d.bx;
      let ty = d.by;
      if (dist < INFLUENCE && mouse.x > -9000) {
        const f = 1 - dist / INFLUENCE;
        ta = theme.baseAlpha + (theme.peakAlpha - theme.baseAlpha) * f * f;
        const ang = Math.atan2(dy, dx);
        tx = d.bx + Math.cos(ang) * REPEL * f;
        ty = d.by + Math.sin(ang) * REPEL * f;
      }
      d.a += (ta - d.a) * EASE;
      d.cx += (tx - d.cx) * EASE;
      d.cy += (ty - d.cy) * EASE;
      ctx.fillStyle = `rgba(${theme.dotColor},${d.a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(d.cx, d.cy, RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return { init, draw };
};

const DotGridCanvas = ({ theme }: { theme: Theme }) => {
  const init = useCallback(makeDotGrid(theme).init, [theme.baseAlpha, theme.bg, theme.dotColor]);
  const draw = useCallback(makeDotGrid(theme).draw, [theme.bg, theme.dotColor, theme.baseAlpha, theme.peakAlpha]);
  const { wrapperRef, canvasRef } = useCanvasBg({ init, draw });

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export const DotGrid = () => (
  <DotGridCanvas
    theme={{ bg: "#0b0f19", dotColor: "255,255,255", baseAlpha: 0.1, peakAlpha: 0.88 }}
  />
);

export const DotGridLight = () => (
  <DotGridCanvas
    theme={{ bg: "#f9f9f9", dotColor: "0,0,0", baseAlpha: 0.17, peakAlpha: 0.65 }}
  />
);
