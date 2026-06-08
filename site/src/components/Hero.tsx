import config from "@/config";
import design from "@/design";

const HERO_WEIGHT_CLASS = {
  light: "font-light",
  regular: "font-semibold",
  bold: "font-bold",
} as const;

const HeroEmphasis = ({ text }: { text: string }) => {
  const accent = design.visualTreatment.heroAccent;

  if (accent === "color") {
    return <span className="text-accent">{text}</span>;
  }

  if (accent === "underline") {
    return (
      <span className="relative inline-block">
        {text}
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-accent to-transparent" />
      </span>
    );
  }

  return <>{text}</>;
};

export const Hero = () => {
  const heroWeight = HERO_WEIGHT_CLASS[design.visualTreatment.heroWeight];
  const accentFull = design.visualTreatment.accentIntensity === "full";

  return (
    <div className="max-w-[66rem]">
      {config.hero.sectionMarker ? (
        <div
          className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <span className={accentFull ? "text-accent" : "text-muted-foreground/40"}>—</span>{" "}
          {config.hero.sectionMarker}
        </div>
      ) : null}

      <h1
        className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl ${heroWeight} leading-[1.1] text-foreground mb-6 text-balance opacity-0 animate-fade-in`}
        style={{ animationDelay: "0.3s" }}
      >
        {config.hero.headlineBefore ? (
          <>
            {config.hero.headlineBefore}
            <br />
          </>
        ) : null}
        <HeroEmphasis text={config.hero.headlineEmphasis} />
        {config.hero.headlineAfter ? <> {config.hero.headlineAfter}</> : null}
      </h1>

      <p
        className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl opacity-0 animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        {config.hero.subheadline}
      </p>
    </div>
  );
};
