import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Properties", href: "/properties" },
    { label: "Contact", href: "/contact" },
  ],
  Listings: [
    { label: "Apartments", href: "/properties" },
    { label: "Villas", href: "/properties" },
    { label: "Commercial", href: "/properties" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e7e0d7] bg-[#f3efe9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/images/loving-space-logo.jpg"
            alt="LIVING SPACE"
            width={160}
            height={40}
            className="mb-4 h-auto w-40"
          />
          <p className="max-w-sm text-sm leading-6 text-[#5f5a56]">
            Helping buyers, investors, and families discover homes that match their needs, location, and long-term goals.
          </p>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#1a2b2f]">
              {heading}
            </h2>
            <ul className="space-y-3 text-sm text-[#55686c]">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-[#1a2b2f]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#e3dace]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-[#5f5a56] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 LIVING SPACE. All rights reserved.</p>
          <p>livingspace.del@gmail.com • +91 92662 39923</p>
        </div>
      </div>
    </footer>
  );
}
