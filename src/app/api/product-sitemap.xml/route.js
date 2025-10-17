import { NextResponse } from 'next/server';

const ORIGIN = "https://www.busybeancoffee.com";
const PRODUCTS_API = "https://backendbb.trimworldwide.com/api/v1/products";

async function fetchProductData() {
  console.log("Fetching product data...");
  const res = await fetch(PRODUCTS_API, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }

  const data = await res.json();
  console.log('Fetched products:', data);
  return data.data || []; 
}

export const runtime = 'edge'; 
export const revalidate = 3600 * 24; 

// Edge function to generate and return the XML sitemap
export async function GET() {
  try {
    console.log("Fetching products...");

    const products = await fetchProductData();
    console.log("Products fetched:", products);

    // If no products are found, return an empty sitemap
    if (products.length === 0) {
      return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      });
    }

    // Generate the XML for the sitemap
    const xmlItems = products
      .map(product => {
        const loc = `${ORIGIN}/product/${encodeURIComponent(product.slug)}`;
        const lastmod = (product.updatedAt ? new Date(product.updatedAt) : new Date()).toISOString().slice(0, 10); 

        return `
          <url>
            <loc>${loc}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
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

  } catch (e) {
    // Handle any errors and return an empty sitemap as fallback
    console.error('Error generating sitemap:', e);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
    return new NextResponse(fallback, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
      status: 200,
    });
  }
}
