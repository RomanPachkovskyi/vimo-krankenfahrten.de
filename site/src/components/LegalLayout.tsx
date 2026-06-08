import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import config from "@/config";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

const LegalLayout = ({ title, children }: LegalLayoutProps) => (
  <div className="flex min-h-dvh flex-col bg-background text-foreground">
    <header className="relative z-10 border-b border-border/50 px-6 sm:px-12 lg:px-20 py-5">
      <div className="flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Zurück zur Startseite
        </a>
        <span className="text-xs font-mono text-muted-foreground/60 hidden sm:block">
          {config.company.name}
        </span>
      </div>
    </header>

    <main className="relative z-[1] flex-1 px-6 py-10 sm:px-12 lg:px-20">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <div className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-foreground/85 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-accent [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2:first-child]:mt-0 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3:first-child]:mt-0 [&_h4]:text-sm [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-5 [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
          {children}
        </div>
      </article>
    </main>

    <Footer />
    <CookieConsent />
  </div>
);

export default LegalLayout;
