import config from "@/config";

const linkClass =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-no-repeat bg-left-bottom transition-[background-size,color] duration-300 hover:bg-[length:100%_1px] hover:text-accent";

export const Footer = () => (
  <footer className="relative z-10 border-t border-border/50">
    <div className="absolute top-0 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="px-6 sm:px-12 lg:px-20 py-6">
      <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">

        <span className="font-mono text-muted-foreground/70 order-3 sm:order-1">
          {config.footer.copyrightLine}
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 order-1 sm:order-2">
          <a href="/impressum" className={linkClass}>
            {config.legal.impressum.title}
          </a>
          <span className="w-px h-3 bg-border" aria-hidden="true" />
          <a href="/datenschutz" className={linkClass}>
            {config.legal.datenschutz.title}
          </a>
          <span className="w-px h-3 bg-border" aria-hidden="true" />
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
            className={`cursor-pointer bg-transparent p-0 text-inherit ${linkClass}`}
          >
            Cookie-Einstellungen
          </button>
        </nav>

        <span className="opacity-80 order-2 sm:order-3">
          Digitales Handwerk mit &#9829;{" "}
          <a
            href="https://munas-print.de/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            bei Munas-Print
          </a>
        </span>

      </div>
    </div>
  </footer>
);
