import { useCallback } from "react";
import { useCanvasBg, type CanvasContext } from "./useCanvasBg";

interface Theme {
  bg: string;
  lineColor: string;
  baseAlpha: number;
  peakAlpha: number;
}

interface Vertex {
  bx: number;
  by: number;
  cx: number;
  cy: number;
}

interface MeshState {
  V: Vertex[][];
  cols: number;
  rows: number;
}

const SPACING = 28;
const INFLUENCE = 182;
const REPEL = 10;
const EASE = 0.09;
const LINE_W = 0.55;
const BUCKETS = 7;

const makeLineGrid = (theme: Theme) => {
  const init = ({ W, H }: CanvasContext): MeshState => {
    const cols = Math.ceil(W / SPACING) + 2;
    const rows = Math.ceil(H / SPACING) + 2;
    const V: Vertex[][] = [];
    for (let r = 0; r <= rows; r++) {
      V[r] = [];
      for (let c = 0; c <= cols; c++) {
        const bx = (c - 1) * SPACING;
        const by = (r - 1) * SPACING;
        V[r][c] = { bx, by, cx: bx, cy: by };
      }
    }
    return { V, cols, rows };
  };

  const draw = ({ ctx, W, H, mouse }: CanvasContext, { V, cols, rows }: MeshState) => {
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, W, H);

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const v = V[r][c];
        const dx = v.bx - mouse.x;
        const dy = v.by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tx = v.bx;
        let ty = v.by;
        if (dist < INFLUENCE && mouse.x > -9000) {
          const f = 1 - dist / INFLUENCE;
          const ang = Math.atan2(dy, dx);
          tx = v.bx + Math.cos(ang) * REPEL * f * f;
          ty = v.by + Math.sin(ang) * REPEL * f * f;
        }
        v.cx += (tx - v.cx) * EASE;
        v.cy += (ty - v.cy) * EASE;
      }
    }

    const paths = Array.from({ length: BUCKETS }, () => new Path2D());
    const bucket = (mx: number, my: number) => {
      if (mouse.x <= -9000) return 0;
      const d = Math.hypot(mx - mouse.x, my - mouse.y);
      if (d >= INFLUENCE) return 0;
      return Math.min(BUCKETS - 1, Math.floor(((1 - d / INFLUENCE) ** 2) * BUCKETS));
    };

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = V[r][c];
        const b = V[r][c + 1];
        const p = paths[bucket((a.cx + b.cx) / 2, (a.cy + b.cy) / 2)];
        p.moveTo(a.cx, a.cy);
        p.lineTo(b.cx, b.cy);
      }
    }
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r < rows; r++) {
        const a = V[r][c];
        const b = V[r + 1][c];
        const p = paths[bucket((a.cx + b.cx) / 2, (a.cy + b.cy) / 2)];
        p.moveTo(a.cx, a.cy);
        p.lineTo(b.cx, b.cy);
      }
    }

    ctx.lineWidth = LINE_W;
    for (let i = 0; i < BUCKETS; i++) {
      const al = theme.baseAlpha + (theme.peakAlpha - theme.baseAlpha) * (i / (BUCKETS - 1));
      ctx.strokeStyle = `rgba(${theme.lineColor},${al.toFixed(3)})`;
      ctx.stroke(paths[i]);
    }
  };

  return { init, draw };
};

const LineGridCanvas = ({ theme }: { theme: Theme }) => {
  const init = useCallback(makeLineGrid(theme).init, [theme.bg]);
  const draw = useCallback(makeLineGrid(theme).draw, [theme.bg, theme.lineColor, theme.baseAlpha, theme.peakAlpha]);
  const { wrapperRef, canvasRef } = useCanvasBg({ init, draw });

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export const LineGrid = () => (
  <LineGridCanvas
    theme={{ bg: "#0b0f19", lineColor: "255,255,255", baseAlpha: 0.1, peakAlpha: 0.72 }}
  />
);

export const LineGridLight = () => (
  <LineGridCanvas
    theme={{ bg: "#f9f9f9", lineColor: "0,0,0", baseAlpha: 0.1, peakAlpha: 0.55 }}
  />
);
