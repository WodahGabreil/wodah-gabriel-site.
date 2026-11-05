/**
 * OPTIONAL sandbox helper, not needed for normal use.
 * Builds the site with only esbuild + Tailwind's compiler API, for environments
 * where Vite cannot be installed. On your own machine use `npm run build`.
 *
 * Usage: node scripts/build-local.mjs   (set TOOLS=/path/to/node_modules if needed)
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(dirname(new URL(import.meta.url).pathname), "..");
const TOOLS = process.env.TOOLS || "/opt/npm-tools/node_modules";
const dist = join(root, "dist");

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "assets"), { recursive: true });

// 1. Tailwind CSS
const { compile } = await import(pathToFileURL(join(TOOLS, "tailwindcss/dist/lib.mjs")).href);
const twDir = join(TOOLS, "tailwindcss");
const cssSource = readFileSync(join(root, "src/index.css"), "utf8");
const compiler = await compile(cssSource, {
  base: join(root, "src"),
  onDependency() {},
  async loadStylesheet(id, base) {
    let path;
    if (id === "tailwindcss") path = join(twDir, "index.css");
    else if (id.startsWith("tailwindcss/")) path = join(twDir, id.slice("tailwindcss/".length) + (id.endsWith(".css") ? "" : ".css"));
    else path = resolve(base, id);
    return { path, base: dirname(path), content: readFileSync(path, "utf8") };
  },
});

const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|html)$/.test(f)) files.push(p);
  }
};
walk(join(root, "src"));
files.push(join(root, "index.html"));
const candidates = new Set();
for (const f of files) for (const t of readFileSync(f, "utf8").split(/[\s"'`]+/)) if (t) candidates.add(t);
writeFileSync(join(dist, "assets/app.css"), compiler.build([...candidates]));

// 2. JS bundle
const esbuild = await import(pathToFileURL(join(TOOLS, "esbuild/lib/main.js")).href);
await esbuild.build({
  entryPoints: [join(root, "src/main.tsx")],
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2020",
  jsx: "automatic",
  outfile: join(dist, "assets/app.js"),
  nodePaths: [TOOLS],
  define: { "import.meta.env.BASE_URL": '"./"', "import.meta.env.DEV": "false", "process.env.NODE_ENV": '"production"' },
  loader: { ".css": "empty" },
  logLevel: "warning",
});

// 3. HTML + public files
const env = existsSync(join(root, ".env")) ? readFileSync(join(root, ".env"), "utf8") : "";
const siteUrl = (env.match(/^VITE_SITE_URL=(.*)$/m)?.[1] || "").trim().replace(/\/$/, "");
let html = readFileSync(join(root, "index.html"), "utf8").replaceAll("%VITE_SITE_URL%", siteUrl);
html = html
  .replace('<script type="module" src="/src/main.tsx"></script>', '<script type="module" src="./assets/app.js"></script>')
  .replace("</head>", '    <link rel="stylesheet" href="./assets/app.css" />\n  </head>');
writeFileSync(join(dist, "index.html"), html);
cpSync(join(root, "public"), dist, { recursive: true });
console.log("Built dist/ (", (readFileSync(join(dist, "assets/app.js")).length / 1024).toFixed(0), "KB JS,",
  (readFileSync(join(dist, "assets/app.css")).length / 1024).toFixed(0), "KB CSS )");
