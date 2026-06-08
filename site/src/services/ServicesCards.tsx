import type { ServiceItem } from "@/config";
import { getServiceIcon } from "./serviceIcons";

// Grid of cards — icon above title. Subtle lift on hover.

interface Props {
  items: ServiceItem[];
}

export const ServicesCards = ({ items }: Props) => (
  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item, index) => {
      const Icon = getServiceIcon(item.iconKey);
      return (
        <li
          key={`${item.title}-${index}`}
          className="group relative rounded-2xl border border-border bg-card/70 p-6 shadow-subtle opacity-0 animate-fade-in-delayed transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card hover:border-accent/40"
          style={{
            animationDelay: `${0.6 + index * 0.08}s`,
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            aria-hidden="true"
            className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft/80 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground"
          >
            {Icon
              ? <Icon className="h-5 w-5" strokeWidth={1.8} />
              : <span className="block h-2.5 w-2.5 rounded-full bg-accent group-hover:bg-accent-foreground" />
            }
          </span>
          <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug">
            {item.title}
          </h3>
          {item.description ? (
            <p className="mt-2 text-[0.93rem] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          ) : null}
        </li>
      );
    })}
  </ul>
);
