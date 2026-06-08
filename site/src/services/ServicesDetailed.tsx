import type { ServiceItem } from "@/config";
import design from "@/design";

// ek-fussbodenheizung.de style — big light accent number on the left,
// bold title and muted description on the right. Grid layout.

interface Props {
  items: ServiceItem[];
}

export const ServicesDetailed = ({ items }: Props) => {
  const accentFull = design.visualTreatment.accentIntensity === "full";
  const numberColor = accentFull ? "text-accent/60" : "text-muted-foreground/30";

  // Adaptive columns: more items → wider grid
  const colsClass =
    items.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 ${colsClass} gap-x-10 gap-y-8`}>
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="flex items-start gap-5 opacity-0 animate-fade-in-delayed"
          style={{
            animationDelay: `${0.6 + index * 0.1}s`,
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            className={`flex-shrink-0 text-3xl sm:text-4xl font-light tabular-nums leading-none mt-0.5 ${numberColor}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="pt-1">
            <h3 className="text-[15px] sm:text-base font-bold text-foreground leading-snug">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground font-normal">
                {item.description}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};
