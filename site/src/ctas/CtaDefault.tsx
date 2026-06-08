import type { ReactNode } from "react";
import { ExternalLink, Mail, MessageCircle, Phone, Smartphone } from "lucide-react";
import config from "@/config";
import design from "@/design";

// CTA "default" — lifted 1:1 from design-directions-demo.html → #cta page.
// Single canonical CTA design system. Themed light/dark based on background.

const DARK_BACKGROUNDS = new Set(["dot-grid", "line-grid", "particles"]);
const isDarkTheme = () => DARK_BACKGROUNDS.has(design.background.variant);

const detectCtaType = (url: string) => {
  if (/^https:\/\/wa\.me\//i.test(url)) return "whatsapp" as const;
  if (/^tel:/i.test(url)) return "phone" as const;
  if (/^https?:\/\//i.test(url)) return "external" as const;
  return null;
};

// ─── Primary action buttons ─────────────────────────────────────────

const WhatsAppButton = ({ url, text, dark }: { url: string; text: string; dark: boolean }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-[11px] px-7 py-[14px] rounded-lg text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 ${
      dark
        ? "bg-[#1aad52] shadow-[0_4px_20px_rgba(37,211,102,0.15)] hover:bg-[#25d366] hover:shadow-[0_8px_32px_rgba(37,211,102,0.3)]"
        : "bg-[#25d366] shadow-[0_4px_20px_rgba(37,211,102,0.2)] hover:bg-[#1ebe5d] hover:shadow-[0_8px_32px_rgba(37,211,102,0.35)]"
    }`}
  >
    <MessageCircle className="w-[18px] h-[18px] flex-shrink-0" />
    {text}
  </a>
);

const PhoneButton = ({ url, text, dark }: { url: string; text: string; dark: boolean }) => (
  <a
    href={url}
    className={`inline-flex items-center gap-[11px] px-7 py-[14px] rounded-lg text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] ${
      dark
        ? "bg-white text-[#18181a] hover:bg-[#f0f0f0]"
        : "bg-[#18181a] text-white hover:bg-[#2d2d30]"
    }`}
  >
    <Phone className="w-[18px] h-[18px] flex-shrink-0" />
    {text}
  </a>
);

const ExternalButton = ({ url, text, dark }: { url: string; text: string; dark: boolean }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-[11px] px-7 py-[14px] rounded-lg text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] ${
      dark
        ? "bg-white text-[#18181a] hover:bg-[#f0f0f0]"
        : "bg-[#18181a] text-white hover:bg-[#2d2d30]"
    }`}
  >
    <ExternalLink className="w-[18px] h-[18px] flex-shrink-0" />
    {text}
  </a>
);

// ─── Secondary text links ───────────────────────────────────────────

interface TextLinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  dark: boolean;
}

const TextLink = ({ href, icon, children, dark }: TextLinkProps) => (
  <a
    href={href}
    className={`group relative inline-flex items-center gap-[9px] pb-[3px] text-[16px] font-normal w-fit ${
      dark ? "text-white/70" : "text-[#18181a]"
    }`}
  >
    <span className="opacity-55 transition-opacity duration-200 group-hover:opacity-80">
      {icon}
    </span>
    <span>{children}</span>
    <span className="opacity-0 -translate-x-[6px] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:opacity-60 group-hover:translate-x-0 text-[14px]">
      →
    </span>
    <span
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-px bg-current opacity-40 origin-left scale-x-0 transition-transform duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
    />
  </a>
);

// ─── Composition ────────────────────────────────────────────────────

export const CtaDefault = () => {
  const dark = isDarkTheme();
  const ctaType = config.cta.enabled ? detectCtaType(config.cta.url) : null;

  const hasPhone = !!config.contact.phoneE164;
  const hasMobile = !!config.contact.phoneMobileE164;
  const hasEmail = !!config.contact.email;
  const hasPhones = hasPhone || hasMobile;

  return (
    <div
      className="flex flex-col gap-6 opacity-0 animate-fade-in"
      style={{ animationDelay: "1.4s" }}
    >
      {/* Рядок 1: кнопка + телефони поруч на десктопі */}
      {(ctaType || hasPhones) && (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-[30px]">
          {ctaType && (
            <div className="flex-shrink-0">
              {ctaType === "whatsapp" && (
                <WhatsAppButton url={config.cta.url} text={config.cta.text} dark={dark} />
              )}
              {ctaType === "phone" && (
                <PhoneButton url={config.cta.url} text={config.cta.text} dark={dark} />
              )}
              {ctaType === "external" && (
                <ExternalButton url={config.cta.url} text={config.cta.text} dark={dark} />
              )}
            </div>
          )}
          {hasPhone && (
            <TextLink
              href={`tel:${config.contact.phoneE164}`}
              icon={<Phone className="w-[15px] h-[15px]" />}
              dark={dark}
            >
              {config.contact.phoneDisplay}
            </TextLink>
          )}
          {hasMobile && (
            <TextLink
              href={`tel:${config.contact.phoneMobileE164}`}
              icon={<Smartphone className="w-[15px] h-[15px]" />}
              dark={dark}
            >
              {config.contact.phoneMobileDisplay!}
            </TextLink>
          )}
        </div>
      )}

      {/* Рядок 2: пошта завжди окремо */}
      {hasEmail && (
        <TextLink
          href={`mailto:${config.contact.email}`}
          icon={<Mail className="w-[15px] h-[15px]" />}
          dark={dark}
        >
          {config.contact.email}
        </TextLink>
      )}
    </div>
  );
};
