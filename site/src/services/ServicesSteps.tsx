import type { ServiceItem } from "@/config";

// Minimal direction style — process steps in a horizontal grid with
// borders between columns. Small "01" eyebrow + title + description.
// Hover: subtle background tint + scaleX underline bottom.
// Lifted 1:1 from design-directions-demo.html → #minimal .steps

interface Props {
  items: ServiceItem[];
}

export const ServicesSteps = ({ items }: Props) => {
  // Responsive grid: 1 col → 2 cols → up to 4 cols
  const colsClass =
    items.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : items.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 ${colsClass} gap-0`}>
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="group relative overflow-hidden px-8 py-10 border-border/60 sm:border-r sm:last:border-r-0 opacity-0 animate-fade-in-delayed transition-colors duration-300 hover:bg-foreground/[0.025]"
          style={{
            animationDelay: `${0.6 + index * 0.1}s`,
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50 mb-5">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="text-base font-medium text-foreground mb-2.5 leading-snug">
            {item.title}
          </h3>
          {item.description ? (
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          ) : null}
          {/* bottom underline reveal on hover (Minimal direction signature) */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          />
        </div>
      ))}
    </div>
  );
};
