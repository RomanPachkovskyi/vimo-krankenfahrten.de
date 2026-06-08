// Lifted 1:1 from design-directions-demo.html (#minimal background).
// Pure CSS — no canvas, no motion.

export const MinimalFlat = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ background: "var(--bg-base)", backgroundImage: "var(--bg-mesh)" }}
  />
);
