import { useEffect, useRef } from "react";

export interface CanvasMouse {
  x: number;
  y: number;
}

export interface CanvasContext {
  ctx: CanvasRenderingContext2D;
  W: number;
  H: number;
  mouse: CanvasMouse;
}

interface UseCanvasBgArgs<S> {
  /** Called on mount and on every resize. Returns per-variant state. */
  init: (ctx: CanvasContext) => S;
  /** Called every animation frame. */
  draw: (ctx: CanvasContext, state: S) => void;
}

/**
 * Hook that wires up a full-screen canvas background with:
 * - DPR (Retina) handling
 * - Resize observer
 * - Mouse tracking inside the wrapper
 * - requestAnimationFrame loop
 *
 * Returns refs for the wrapper div and canvas element.
 */
export function useCanvasBg<S>({ init, draw }: UseCanvasBgArgs<S>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    let W = 0;
    let H = 0;
    let raf = 0;
    let state: S;
    const mouse: CanvasMouse = { x: -9999, y: -9999 };

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      state = init({ ctx, W, H, mouse });
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);

    const tick = () => {
      draw({ ctx, W, H, mouse }, state);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, [init, draw]);

  return { wrapperRef, canvasRef };
}
