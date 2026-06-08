import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "@/App";
import config from "@/config";

describe("App", () => {
  it("renders the generated config content", () => {
    const html = renderToStaticMarkup(<App />);

    if (config.hero.headlineBefore) {
      expect(html).toContain(config.hero.headlineBefore);
    }
    expect(html).toContain(config.hero.headlineEmphasis);

    if (config.cta.enabled) {
      expect(html).toContain(config.cta.text);
    }
  });
});
