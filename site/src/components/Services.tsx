import type { ComponentType } from "react";
import config from "@/config";
import design from "@/design";
import type { ServicesVariant, ServiceItem } from "@/config";
import { ServicesChecklist } from "@/services/ServicesChecklist";
import { ServicesDetailed } from "@/services/ServicesDetailed";
import { ServicesSteps } from "@/services/ServicesSteps";
import { ServicesCards } from "@/services/ServicesCards";
import { ServicesCardsList } from "@/services/ServicesCardsList";

const REGISTRY: Record<ServicesVariant, ComponentType<{ items: ServiceItem[] }>> = {
  checklist: ServicesChecklist,
  detailed: ServicesDetailed,
  steps: ServicesSteps,
  cards: ServicesCards,
  "cards-list": ServicesCardsList,
};

export const Services = () => {
  const { variant, label, items } = config.services;

  if (!Array.isArray(items) || items.length === 0) return null;

  const accentFull = design.visualTreatment.accentIntensity === "full";
  const markerColor = accentFull ? "text-accent" : "text-muted-foreground/40";
  const Component = REGISTRY[variant] ?? ServicesChecklist;

  return (
    <section className="relative">
      {label ? (
        <div
          className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em] mb-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <span className={markerColor}>—</span> {label}
        </div>
      ) : null}

      <Component items={items} />

      <div
        className="hidden sm:block absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 animate-fade-in"
        style={{ animationDelay: "1.5s" }}
      />
    </section>
  );
};
