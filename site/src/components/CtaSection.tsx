import type { ComponentType } from "react";
import design from "@/design";
import type { CtaStyle } from "@/design";
import { CtaDefault } from "@/ctas/CtaDefault";

const REGISTRY: Record<CtaStyle, ComponentType> = {
  default: CtaDefault,
};

export const CtaSection = () => {
  const Component = REGISTRY[design.cta.style] ?? CtaDefault;
  return <Component />;
};
