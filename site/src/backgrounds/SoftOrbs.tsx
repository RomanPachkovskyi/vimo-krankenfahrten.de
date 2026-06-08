import { useCallback } from "react";
import { useCanvasBg, type CanvasContext } from "./useCanvasBg";

// Lifted 1:1 from design-directions-demo.html (initSoft).
// Slow, organic glowing orbs over a warm cream background.

const ORBS = [
  { x: 0.3, y: 0.25, r: 0.38, color: [255, 180, 150], speed: 1 },
  { x: 0.7, y: 0.7, r: 0.32, color: [210, 160, 230], speed: 0.7 },
  { x: 0.55, y: 0.4, r: 0.28, color: [255, 220, 190], speed: 1.3 },
  { x: 0.15, y: 0.65, r: 0.22, color: [240, 200, 180], speed: 0.9 },
];

const BG_COLOR = "#faf5f0";

interface State {
  t: number;
}

export const SoftOrbs = () => {
  const init = useCallback((): State => ({ t: 0 }), []);

  const draw = useCallback(({ ctx, W, H }: CanvasContext, state: State) => {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, W, H);
    state.t += 0.006;

    ORBS.forEach((o, i) => {
      const ox = (o.x + Math.sin(state.t * o.speed + i) * 0.08) * W;
      const oy = (o.y + Math.cos(state.t * o.speed * 0.7 + i * 1.2) * 0.07) * H;
      const r = o.r * Math.min(W, H);
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
      g.addColorStop(0, `rgba(${o.color[0]},${o.color[1]},${o.color[2]},0.18)`);
      g.addColorStop(1, `rgba(${o.color[0]},${o.color[1]},${o.color[2]},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ox, oy, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  const { wrapperRef, canvasRef } = useCanvasBg({ init, draw });

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
