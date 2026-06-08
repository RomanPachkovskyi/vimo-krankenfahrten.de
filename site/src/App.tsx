import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import Index from "./pages/Index";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import design from "./design";

type Route = "home" | "impressum" | "datenschutz";

function getRouteFromPath(): Route {
  if (typeof window === "undefined") return "home";
  const p = window.location.pathname.replace(/\/+$/, "");
  if (p === "/impressum") return "impressum";
  if (p === "/datenschutz") return "datenschutz";
  return "home";
}

const App = () => {
  const [route, setRoute] = useState<Route>(getRouteFromPath);

  useEffect(() => {
    const onPop = () => setRoute(getRouteFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const themeVars = {
    "--accent": design.colors.primary,
    "--accent-hover": design.colors.primaryHover,
    "--accent-soft": design.colors.primarySoft,
    "--accent-foreground": design.colors.primaryForeground,
    "--ring": design.colors.primary,
    "--shadow-button": `0 10px 24px -12px hsl(${design.colors.primary} / 0.42)`,
  } as CSSProperties;

  return (
    <div style={themeVars}>
      {route === "impressum" && <Impressum />}
      {route === "datenschutz" && <Datenschutz />}
      {route === "home" && <Index />}
    </div>
  );
};

export default App;
