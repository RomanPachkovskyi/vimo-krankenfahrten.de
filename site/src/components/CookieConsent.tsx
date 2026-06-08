import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import config from "@/config";

const CONSENT_STORAGE_KEY = "onepage.consent.notice.v2";
const CONSENT_VERSION = "2026-03-11";
const OPEN_COOKIE_EVENT = "open-cookie-preferences";
const COOKIE_UPDATED_EVENT = "cookie-consent-updated";

export interface ConsentRecord {
  version: string;
  updatedAt: string;
  acknowledged: true;
}

export const CookieConsent = () => {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowPanel(false);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    setShowPanel(shouldRestorePanelOnClose(record));
  }, [record]);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setRecord(stored);
      setShowPanel(false);
      return;
    }

    setShowPanel(true);
  }, []);

  useEffect(() => {
    const handler = () => {
      openSettings();
    };

    window.addEventListener(OPEN_COOKIE_EVENT, handler);
    return () => window.removeEventListener(OPEN_COOKIE_EVENT, handler);
  }, [openSettings]);

  useEffect(() => {
    if (!showSettings) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSettings();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeSettings, showSettings]);

  const canShowUi = useMemo(() => showPanel || showSettings, [showPanel, showSettings]);
  if (!canShowUi) return null;

  const acknowledgeConsent = () => {
    const consent = createConsentRecord();

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    setRecord(consent);
    window.dispatchEvent(new CustomEvent(COOKIE_UPDATED_EVENT, { detail: consent }));
    setShowPanel(false);
    setShowSettings(false);
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    setRecord(null);
    setShowSettings(false);
    setShowPanel(true);
  };

  return (
    <>
      {showPanel ? (
        <div className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-4xl rounded-lg border border-border bg-background/95 shadow-subtle backdrop-blur-sm">
          <div className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-foreground">Datenschutz-Hinweis</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Diese Website setzt keine Analyse-, Marketing- oder Drittanbieter-Cookies. Im Browser wird nur ein
              lokaler Speicher-Eintrag gesichert, damit dein Hinweis-Status nicht bei jedem Besuch erneut erscheint.
              Details findest du jederzeit im Footer unter
              {" "}
              <span className="font-medium text-foreground">Cookie-Einstellungen</span>
              .
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={openSettings}
                className="inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Hinweise
              </button>
              <button
                type="button"
                onClick={acknowledgeConsent}
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Verstanden
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showSettings ? (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-foreground/45 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie-Einstellungen"
          onClick={closeSettings}
        >
          <div
            ref={dialogRef}
            className="w-full max-w-xl rounded-lg border border-border bg-background shadow-subtle"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-border px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Cookie-Einstellungen</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Anbieter:
                    {" "}
                    {config.company.name}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeSettings}
                  className="text-muted-foreground transition hover:text-foreground text-xl leading-none px-1"
                  aria-label="Cookie-Einstellungen schliessen"
                >
                  &#215;
                </button>
              </div>
            </div>

            <div className="space-y-3 px-5 py-4 text-sm">
              <StorageNotice
                title="Lokaler Speicher fuer Hinweis-Status"
                description="Gespeichert wird nur, dass du den Datenschutz-Hinweis bereits gesehen hast. Es werden keine Analyse-, Marketing- oder Drittanbieter-Cookies gesetzt."
              />
              <StorageNotice
                title="Keine optionalen Tracking-Tools aktiv"
                description="Der Generator liefert standardmaessig keine Google-Analytics-, reCAPTCHA-, Maps- oder Marketing-Skripte aus, solange diese nicht explizit integriert wurden."
              />
            </div>

            <div className="flex flex-col gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetConsent}
                className="inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Hinweis zuruecksetzen
              </button>
              <button
                type="button"
                onClick={closeSettings}
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Schliessen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const StorageNotice = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-md border border-border p-3">
    <span className="space-y-0.5">
      <span className="block font-medium text-foreground">{title}</span>
      <span className="block text-muted-foreground">{description}</span>
    </span>
  </div>
);

function readStoredConsent(): ConsentRecord | null {
  try {
    return parseStoredConsent(localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function createConsentRecord(now: Date = new Date()): ConsentRecord {
  return {
    version: CONSENT_VERSION,
    updatedAt: now.toISOString(),
    acknowledged: true,
  };
}

const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export function parseStoredConsent(raw: string | null): ConsentRecord | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.acknowledged !== true) return null;
    if (parsed.version !== CONSENT_VERSION) return null;

    const updatedAt = typeof parsed.updatedAt === "string" ? parsed.updatedAt : "";
    if (updatedAt && Date.now() - new Date(updatedAt).getTime() > CONSENT_MAX_AGE_MS) return null;

    return { version: parsed.version, updatedAt, acknowledged: true };
  } catch {
    return null;
  }
}

export function shouldRestorePanelOnClose(record: ConsentRecord | null): boolean {
  return record === null;
}
