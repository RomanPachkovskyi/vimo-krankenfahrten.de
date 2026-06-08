// ============================================================
// Service icon registry — maps iconKey strings to Lucide icons.
// Used by ServicesCards and ServicesCardsList.
// AI agent picks iconKey per service in design-pack.json.
// ============================================================

import {
  Wrench,
  Home,
  Car,
  Droplets,
  ShieldCheck,
  Sparkles,
  Zap,
  Hammer,
  Paintbrush,
  Truck,
  Scissors,
  HeartPulse,
  Leaf,
  Sun,
  Building2,
  Users,
  Calendar,
  Star,
  CheckCircle,
  Settings,
  Phone,
  MapPin,
  Clock,
  Package,
  Flame,
  Ruler,
  BriefcaseMedical,
  Sofa,
  TreePine,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  // Handwerk & Bau
  wrench:       Wrench,
  hammer:       Hammer,
  ruler:        Ruler,
  paintbrush:   Paintbrush,
  flame:        Flame,
  zap:          Zap,

  // Immobilien & Innenraum
  home:         Home,
  sofa:         Sofa,
  building:     Building2,

  // Transport & Mobilität
  car:          Car,
  truck:        Truck,

  // Reinigung & Pflege
  droplets:     Droplets,
  sparkles:     Sparkles,
  waves:        Waves,
  scissors:     Scissors,

  // Gesundheit & Soziales
  "heart-pulse": HeartPulse,
  "medical":    BriefcaseMedical,

  // Natur & Energie
  leaf:         Leaf,
  "tree-pine":  TreePine,
  sun:          Sun,

  // Service & Organisation
  users:        Users,
  calendar:     Calendar,
  clock:        Clock,
  phone:        Phone,
  package:      Package,
  settings:     Settings,
  "map-pin":    MapPin,
  star:         Star,
  "check-circle": CheckCircle,
  shield:       ShieldCheck,
};

/** Returns the Lucide icon component for a given key, or null if key is unknown. */
export function getServiceIcon(iconKey: string | undefined): LucideIcon | null {
  if (!iconKey) return null;
  return SERVICE_ICONS[iconKey] ?? null;
}
