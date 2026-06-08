import { useState } from "react";
import config from "@/config";

export const Faq = () => {
  const { label, items } = config.faq;
  const [open, setOpen] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading">
      {label ? (
        <div
          className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em] mb-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.9s" }}
        >
          <span className="text-accent">—</span> {label}
        </div>
      ) : null}

      <dl className="flex flex-col gap-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          const answerId = `faq-answer-${i}`;
          return (
            <div
              key={i}
              className={`rounded-2xl border transition-colors duration-200 ${
                isOpen
                  ? "border-accent/30 bg-accent-soft/40"
                  : "border-border bg-card/70"
              }`}
            >
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground"
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full border border-border text-accent transition-transform duration-200 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
              </dt>
              <dd
                id={answerId}
                role="region"
                className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-5 pb-4 pt-0 text-[0.875rem] leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};
