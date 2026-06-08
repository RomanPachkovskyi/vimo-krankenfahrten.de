import config from "@/config";

const hasStatusBadge = (text: string) => {
  const trimmed = text.trim();
  return trimmed.length > 0 && !/^[—–\-]+$/.test(trimmed);
};

export const Header = () => (
  <header className="relative z-10 px-6 sm:px-12 lg:px-20 py-8">
    <div className="flex items-center justify-between">
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {config.company.logoSrc ? (
          <div className="flex items-center gap-4">
            <a href="/" aria-label={config.company.name}>
              <img
                src={config.company.logoSrc}
                alt={config.company.name}
                className="h-36 sm:h-[7.5rem] w-auto max-w-[85vw] sm:max-w-[450px] object-contain"
                loading="eager"
              />
            </a>
          </div>
        ) : (
          <a href="/" className="text-base font-semibold tracking-tight text-foreground">
            {config.company.name}
          </a>
        )}
      </div>

      {hasStatusBadge(config.company.statusBadgeText) ? (
        <div
          className="hidden sm:flex items-center gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.75)]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            {config.company.statusBadgeText}
          </span>
        </div>
      ) : null}
    </div>
  </header>
);
