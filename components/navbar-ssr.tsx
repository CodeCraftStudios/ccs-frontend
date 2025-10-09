import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { NAME, FRONTEND, SERVER_ENDPOINT } from "@/lib/consts"
import { Service, fetchServices } from "@/lib/services"
import { getData } from "@/lib/axios"

interface NavigationItem {
  name: string;
  href?: string;
  dropdown?: Array<{
    name: string;
    href: string;
    logo?: string;
  }>;
}

async function NavbarSSR() {
  const services = await fetchServices();
  const fetchPartners:any = await getData("/api/partners/list")
  const partners = fetchPartners.data
  const fetchPortfolio:any = await getData("/api/portfolio/list")
  const portfolio = fetchPortfolio.data
  const fetchSolutions:any = await getData("/api/solution/list")
  const solutions = fetchSolutions.data

  // Build dynamic services dropdown
  const servicesDropdown = [
    { name: "All Services", href: "/services" },
    ...services.map(service => ({
      name: service.name,
      href: `/service/${service.slug}`,
    }))
  ];


  const partnersDropdown =[{ name : "All Partners", href: "/partners"}, ...partners.map((partner:any) => ({
      name: partner.name,
      href: `/partner/${partner.name.toLowerCase().replace(/\s+/g, '-')}`,
      logo: `${SERVER_ENDPOINT}${partner.logo}`
    }))
  ];

  const portfolioDropdown = [
    { name: "All Projects", href: "/portfolio" },
    ...portfolio.map((item:any) => ({
      name: item.name,
      href: `/project/${item.slug || item.name.toLowerCase().replace(/\s+/g, '-')}`,
      logo: item.logo ? `${SERVER_ENDPOINT}${item.logo}` : undefined
    }))
  ];

  const solutionsDropdown = [
    { name: "All Solutions", href: "/solutions" },
    ...solutions.map((solution:any) => ({
      name: solution.name,
      href: `/solution/${solution.slug}`,
    }))
  ];

  const navItems: NavigationItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      dropdown: servicesDropdown,
    },
    {
      name: "Portfolio",
      dropdown: portfolioDropdown,
    },
    {
      name: "Partners",
      dropdown: partnersDropdown,
    },
    {
      name: "Solutions",
      dropdown: solutionsDropdown,
    },
    {
      name: "Tools",
      dropdown: [
        { name: "Open Graph Checker", href: "/tools/open-graph-checker" },
        { name: "SEO Blog Checker", href: "/tools/seo-checker" },
        { name: "Charge Calculator", href: "/tools/calculator" },
        { name: "Website Test", href: "/tools/website-test" },
        { name: "Stripe Calculator", href: "/tools/stripe-calculator" },
      ],
    },
    { name: "Blogs", href: "/blogs" },
  ];

  // Generate JSON-LD schema for navigation
  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "hasPart": navItems.map(item => ({
      "@type": "WebPage",
      "name": item.name,
      "url": item.href ? `${FRONTEND}${item.href}` : undefined,
      ...(item.dropdown && {
        "hasPart": item.dropdown.map(dropdownItem => ({
          "@type": "WebPage",
          "name": dropdownItem.name,
          "url": `${FRONTEND}${dropdownItem.href}`,
        }))
      })
    }))
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": NAME,
    "url": FRONTEND,
    "logo": `${FRONTEND}/media/logo.svg`,
    "sameAs": [
      "https://twitter.com/codecraft_studios",
      "https://linkedin.com/company/codecraft-studios",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-954-398-0241",
      "contactType": "customer service",
      "email": "johnmolina@codecraftstudios.net"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "description": "Miami's premier IT and digital marketing agency specializing in web development, mobile apps, and innovative digital solutions.",
    "foundingDate": "2017",
    "founder": {
      "@type": "Person",
      "name": "John Molina"
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    },
    "makesOffer": services.map(service => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.name,
        "description": service.short_description || service.name,
        "provider": {
          "@type": "Organization",
          "name": NAME
        }
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([navigationSchema, organizationSchema])
        }}
      />

      {/* Mobile Menu Toggle Checkbox - CSS Only */}
      <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />

      {/* SSR Navigation Structure */}
      <nav
        className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="flex items-center space-x-2"
                aria-label={`${NAME} - Home`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <img
                    src="/media/logo.svg"
                    alt={`${NAME} logo`}
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-xl font-bold text-foreground superfont">{NAME}</span>
              </Link>
            </div>

            {/* Desktop Navigation - Static for SSR */}
            <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href || "#"}
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    aria-haspopup={item.dropdown ? "true" : "false"}
                    aria-expanded="false"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                  </Link>

                  {/* Static dropdown for SSR */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                          >
                            {dropdownItem.logo && (
                              <img
                                src={dropdownItem.logo}
                                alt={`${dropdownItem.name} logo`}
                                className="mr-3 w-6 h-6 object-contain"
                              />
                            )}
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Button - Right Side */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle Button - CSS Only */}
            <label
              htmlFor="mobile-menu-toggle"
              className="lg:hidden ml-auto p-2 cursor-pointer flex items-center"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </label>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Hidden by default, shown when checkbox is checked */}
      <div className="peer-checked:block hidden lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-background/95 backdrop-blur-sm border-t border-border overflow-y-auto z-40">
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            item.dropdown ? (
              <details key={item.name} className="border-b border-border pb-2">
                <summary className="flex items-center justify-between w-full py-2 cursor-pointer text-foreground hover:text-primary transition-colors font-medium list-none">
                  <span>{item.name}</span>
                  <ChevronDown className="w-5 h-5" />
                </summary>
                <div className="pl-4 mt-2 space-y-2">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className="flex items-center py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {dropdownItem.logo && (
                        <img
                          src={dropdownItem.logo}
                          alt={`${dropdownItem.name} logo`}
                          className="mr-3 w-5 h-5 object-contain"
                        />
                      )}
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <div key={item.name} className="border-b border-border pb-2">
                <Link
                  href={item.href || "#"}
                  className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              </div>
            )
          ))}

          {/* Contact Button in Mobile Menu */}
          <div className="pt-4">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

    </>
  );
}

export default NavbarSSR;