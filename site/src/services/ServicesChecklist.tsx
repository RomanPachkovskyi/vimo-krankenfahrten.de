import { Check } from "lucide-react";
import type { ServiceItem } from "@/config";
import design from "@/design";

// vimo / Soft direction style — quiet 2-column list with check icons.
// Smooth: organic easing, soft icon halo, gentle stagger.

interface Props {
  items: ServiceItem[];
}

export const ServicesChecklist = ({ items }: Props) => {
  const accentFull = design.visualTreatment.accentIntensity === "full";
  const iconBg = accentFull ? "bg-accent-soft" : "bg-muted";
  const iconColor = accentFull ? "text-accent" : "text-muted-foreground";

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
      {items.map((item, index) => (
        <li
          key={`${item.title}-${index}`}
          className="group flex items-start gap-3.5 py-1.5 cursor-default opacity-0 animate-fade-in-delayed text-foreground/75 transition-[transform,color] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1.5 hover:text-foreground"
          style={{
            animationDelay: `${0.6 + index * 0.08}s`,
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            className={`flex-shrink-0 mt-[3px] flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-inset ring-accent/30 ${iconBg} transition-[background-color,border-color] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-accent/20 group-hover:ring-accent`}
          >
            <Check className={`h-3 w-3 ${iconColor}`} strokeWidth={2.5} />
          </span>
          <span className="text-[15px] sm:text-base leading-relaxed bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  );
};
