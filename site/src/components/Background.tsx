import type { ComponentType } from "react";
import design from "@/design";
import type { BackgroundVariant } from "@/design";
import { DotGrid, DotGridLight } from "@/backgrounds/DotGrid";
import { LineGrid, LineGridLight } from "@/backgrounds/LineGrid";
import { Particles, ParticlesLight } from "@/backgrounds/Particles";
import { SoftOrbs } from "@/backgrounds/SoftOrbs";
import { MinimalFlat } from "@/backgrounds/MinimalFlat";

const REGISTRY: Record<BackgroundVariant, ComponentType> = {
  "dot-grid": DotGrid,
  "dot-grid-light": DotGridLight,
  "line-grid": LineGrid,
  "line-grid-light": LineGridLight,
  particles: Particles,
  "particles-light": ParticlesLight,
  "soft-orbs": SoftOrbs,
  "minimal-flat": MinimalFlat,
};

export const Background = () => {
  const Component = REGISTRY[design.background.variant] ?? DotGrid;
  return <Component />;
};
