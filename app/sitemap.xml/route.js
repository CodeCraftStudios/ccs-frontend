import { FRONTEND, SERVER_ENDPOINT } from "@/lib/consts";

const BASE_URL = FRONTEND;
const API = `${SERVER_ENDPOINT}/api/sitemap`;

export async function GET() {
	try {
		const [servicesRes, portfolioRes, partnersRes, solutionsRes, blogsRes] = await Promise.all([
			fetch(`${API}/services`),
			fetch(`${API}/portfolio`),
			fetch(`${API}/partners`),
			fetch(`${API}/solutions`),
			fetch(`${API}/blogs`),
		]);

		const [services, portfolio, partners, solutions, blogs] = await Promise.all([
			servicesRes.json(),
			portfolioRes.json(),
			partnersRes.json(),
			solutionsRes.json(),
			blogsRes.json(),
		]);

		const staticUrls = [
			"/",
			
            "/about",
			
            "/services",
			
            "/portfolio",
			
            "/partners",
			
            "/solutions",
			
            "/tools/open-graph-checker",
			"/tools/seo-checker",
			"/tools/calculator",
			"/tools/website-test",
			"/tools/stripe-calculator",
			
            "/blogs",
			

			"/contact",
			
		].map((path) => `
            <url>
                <loc>${BASE_URL}${path}</loc>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>`).join('');

	

		const serviceUrls = services.map(b => `
            <url>
                <loc>${BASE_URL}/service/${b.slug}</loc>${b.created ? `
                <lastmod>${b.created.split('T')[0]}</lastmod>` : ''}
                <changefreq>weekly</changefreq>
                <priority>0.9</priority>
            </url>`).join('');

		const portfolioUrls = portfolio.map(p => `
            <url>
                <loc>${BASE_URL}/project/${p.slug}</loc>
                <changefreq>monthly</changefreq>
                <priority>0.9</priority>
            </url>`).join('');

		const partnerUrls = partners.map(p => `
            <url>
                <loc>${BASE_URL}/partner/${p.slug}</loc>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
            </url>`).join('');

		const solutionUrls = solutions.map(s => `
            <url>
                <loc>${BASE_URL}/solution/${s.slug}</loc>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>`).join('');

		const blogUrls = blogs.map(b => `
            <url>
                <loc>${BASE_URL}/blog/${b.slug}</loc>${b.created_at ? `
                <lastmod>${b.created_at.split('T')[0]}</lastmod>` : ''}
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>`).join('');

		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${staticUrls}
            ${serviceUrls}
            ${portfolioUrls}
            ${partnerUrls}
            ${solutionUrls}
            ${blogUrls}
        </urlset>`;

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
			},
		});
	} catch (err) {
		console.error("Error generating sitemap:", err);
		return new Response("Error building sitemap", { status: 500 });
	}
}