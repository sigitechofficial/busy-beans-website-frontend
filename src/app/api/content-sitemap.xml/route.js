import { NextResponse } from "next/server";

const ORIGIN = "https://www.busybeancoffee.com";

const PAGES = [
  { loc: "/our-story", lastmod: "2025-10-07", changefreq: "monthly", priority: 0.6 },
  { loc: "/recepies", lastmod: "2025-10-07", changefreq: "monthly", priority: 0.6 },
  { loc: "/subscriptions", lastmod: "2025-10-07", changefreq: "monthly", priority: 0.6 },
  { loc: "/contact-us", lastmod: "2025-10-07", changefreq: "monthly", priority: 0.6 },
  { loc: "/order-history", lastmod: "2025-10-07", changefreq: "monthly", priority: 0.6 },
  { loc: "/profile/personal-details", lastmod: "2025-10-07", changefreq: "monthly", priority: 0.6 },
];

export const runtime = "edge";
export const revalidate = 3600 * 24;

export async function GET() {
  const xmlItems = PAGES
    .map(page => {
      const loc = `${ORIGIN}${page.loc}`;
      return `
        <url>
          <loc>${loc}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlItems}
  </urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
