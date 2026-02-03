export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /account/
Disallow: /api/
Disallow: /checkout/

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
