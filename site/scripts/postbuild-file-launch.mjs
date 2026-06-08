import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.resolve(__dirname, "../dist/index.html");

let html = fs.readFileSync(indexPath, "utf8");

// Make the production build portable for both static hosting and direct file opening.
html = html.replace(
  /<script type="module"\s+crossorigin\s+src="([^"]+)"><\/script>/,
  '<script defer src="$1"></script>',
);
html = html.replace(/<link rel="stylesheet"\s+crossorigin\s+href="([^"]+)">/, '<link rel="stylesheet" href="$1">');
html = html.replace(/<link rel="modulepreload"\s+crossorigin\s+href="[^"]+">\s*/g, "");

fs.writeFileSync(indexPath, html, "utf8");
console.log("postbuild-file-launch: patched dist/index.html for portable usage");
