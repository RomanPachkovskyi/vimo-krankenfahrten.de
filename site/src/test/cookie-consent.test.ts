import { describe, expect, it } from "vitest";
import {
  createConsentRecord,
  parseStoredConsent,
  shouldRestorePanelOnClose,
} from "@/components/CookieConsent";

describe("CookieConsent helpers", () => {
  it("creates a current-version consent record", () => {
    const now = new Date("2026-03-11T10:15:00.000Z");

    expect(createConsentRecord(now)).toEqual({
      version: "2026-03-11",
      updatedAt: "2026-03-11T10:15:00.000Z",
      acknowledged: true,
    });
  });

  it("accepts only the current acknowledged record from storage", () => {
    expect(
      parseStoredConsent(
        JSON.stringify({
          version: "2026-03-11",
          updatedAt: "2026-03-11T10:15:00.000Z",
          acknowledged: true,
        }),
      ),
    ).toEqual({
      version: "2026-03-11",
      updatedAt: "2026-03-11T10:15:00.000Z",
      acknowledged: true,
    });

    expect(
      parseStoredConsent(
        JSON.stringify({
          version: "2026-03-09",
          updatedAt: "2026-03-09T08:00:00.000Z",
          acknowledged: true,
        }),
      ),
    ).toBeNull();

    expect(
      parseStoredConsent(
        JSON.stringify({
          version: "2026-03-11",
          updatedAt: "2026-03-11T10:15:00.000Z",
          acknowledged: false,
        }),
      ),
    ).toBeNull();
  });

  it("ignores malformed cookie storage values", () => {
    expect(parseStoredConsent(null)).toBeNull();
    expect(parseStoredConsent("not-json")).toBeNull();
    expect(parseStoredConsent(JSON.stringify({ version: "2026-03-11" }))).toBeNull();
  });

  it("restores the banner only when consent does not exist yet", () => {
    expect(shouldRestorePanelOnClose(null)).toBe(true);
    expect(shouldRestorePanelOnClose(createConsentRecord(new Date("2026-03-11T10:15:00.000Z")))).toBe(false);
  });
});
