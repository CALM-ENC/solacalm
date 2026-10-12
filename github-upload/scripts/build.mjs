import { build } from "vite";
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Render the same React routes at build time, so crawlers receive real content.
const modeIndex = process.argv.indexOf("--mode");
const mode = modeIndex >= 0 ? process.argv[modeIndex + 1] : "production";
await build({ mode });
await build({
  mode,
  build: {
    ssr: "src/entry-server.tsx",
    outDir: ".prerender",
    emptyOutDir: true,
    copyPublicDir: false,
  },
});

const { PAGE_SEO, SITE_URL, getPageSeo, renderPage } = await import(
  pathToFileURL(resolve(".prerender/entry-server.js")).href
);
const template = await readFile("dist/index.html", "utf8");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

for (const pathname of [...Object.keys(PAGE_SEO), "/404"]) {
  const seo = getPageSeo(pathname);
  // Replace shell metadata to avoid duplicate homepage titles on subpages.
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\b[^>]*(?:name="(?:description|robots)"|property="og:(?:title|description|url|type|site_name|locale)")[^>]*>/gi, "")
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, "");
  const tags = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}">`,
    `<meta name="robots" content="${seo.robots}">`,
    `<meta property="og:title" content="${escape(seo.title)}">`,
    `<meta property="og:description" content="${escape(seo.description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="솔라캄">`,
    `<meta property="og:locale" content="ko_KR">`,
  ];
  if (pathname !== "/404") {
    tags.push(`<link rel="canonical" href="${escape(seo.canonical)}">`);
    tags.push(`<meta property="og:url" content="${escape(seo.canonical)}">`);
  }
  html = html.replace("</head>", `${tags.join("\n    ")}\n  </head>`);
  html = html.replace('<div id="root"></div>', () => `<div id="root">${renderPage(pathname)}</div>`);
  const filename = pathname === "/" ? "index" : pathname.slice(1);
  await writeFile(`dist/${filename}.html`, html);
}

const paths = Object.keys(PAGE_SEO);
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n")}\n</urlset>\n`);
await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await writeFile("dist/_redirects", paths.filter((path) => path !== "/").map((path) => `${path} ${path}.html 200`).join("\n") + "\n");
await rm(".prerender", { recursive: true, force: true });
console.log(`Built ${paths.length} prerendered pages, a 404 page, sitemap.xml, robots.txt and Netlify route rules.`);
