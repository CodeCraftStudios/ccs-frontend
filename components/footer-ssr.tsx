import { Code, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { NAME, EMAIL, PHONE, FRONTEND, SERVER_ENDPOINT, linkedinLink, twittweLink, instagramLink } from "@/lib/consts"
import { fetchServices } from "@/lib/services"
import { getData } from "@/lib/axios"
import { ThemeToggle } from "@/components/theme-toggle"

async function FooterSSR() {
  const services = await fetchServices();
  const fetchPortfolio:any = await getData("/api/portfolio/list")
  const portfolio = fetchPortfolio.data
  const fetchSolutions:any = await getData("/api/solution/list")
  const solutions = fetchSolutions.data

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: instagramLink, label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: twittweLink, label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: linkedinLink, label: "LinkedIn" },
  ];

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "All Services", href: "/services" },
        ...services.map(service => ({
          name: service.name,
          href: `/service/${service.slug}`,
        }))
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "All Solutions", href: "/solutions" },
        ...solutions.map((solution:any) => ({
          name: solution.name,
          href: `/solution/${solution.slug}`,
        }))
      ],
    },
    {
      title: "Tools",
      links: [
        { name: "Open Graph Checker", href: "/tools/open-graph-checker" },
        { name: "SEO Blog Checker", href: "/tools/seo-checker" },
        { name: "Charge Calculator", href: "/tools/calculator" },
        { name: "Website Test", href: "/tools/website-test" },
        { name: "Stripe Calculator", href: "/tools/stripe-calculator" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Blog", href: "/blogs" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  // Footer schema markup
  const footerSchema = {
    "@context": "https://schema.org",
    "@type": "WPFooter",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Organization",
      "name": NAME,
      "url": FRONTEND
    },
    "mainEntity": {
      "@type": "Organization",
      "name": NAME,
      "url": FRONTEND,
      "logo": `${FRONTEND}/media/logo.svg`,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": PHONE,
          "contactType": "customer service",
          "email": EMAIL,
          "areaServed": "US",
          "availableLanguage": "English"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "sameAs": socialLinks.map(link => link.href).filter(href => href !== "#")
    }
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Services",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": service.name,
      "description": service.short_description || service.name,
      "url": `${FRONTEND}/services/${service.slug}`
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([footerSchema, servicesSchema])
        }}
      />

      {/* SSR Footer Structure */}
      <footer
        className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-muted/30"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-22  rounded-lg flex items-center justify-center">
                  <img
                    src="/media/logo.svg"
                    alt={`${NAME} logo`}
                    width={60}
                    height={60}
                  />
                </div>
                <span className="text-xl font-bold text-foreground">{NAME}</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                We are {NAME} LLC, proudly based in Miami, Florida. We deliver innovative digital solutions
                that help your business grow with smart, scalable technology and strategic marketing.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="hover:text-primary transition-colors"
                    aria-label={`Email ${NAME}`}
                  >
                    {EMAIL}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <a
                    href={`tel:${PHONE}`}
                    className="hover:text-primary transition-colors"
                    aria-label={`Call ${NAME}`}
                  >
                    {PHONE}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Miami, Florida</span>
                </div>
              </div>

              {/* Social Links & Theme Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex space-x-4" role="list" aria-label="Social media links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <div className="border-l border-border h-10" />
                <ThemeToggle />
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <nav aria-label={`${section.title} navigation`}>
                  <ul className="space-y-3" role="list">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} {NAME} LLC. All rights reserved.
            </p>
            
          </div>
        </div>
      </footer>

    </>
  );
}

export default FooterSSR;