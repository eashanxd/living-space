import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e7e0d7] bg-[#f8f5f0]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="LIVING SPACE home">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b2d32] text-sm font-semibold tracking-[0.22em] text-white">
            LS
          </div>
          <div>
            <div className="text-lg font-semibold tracking-[0.24em] text-[#1a2b2f]">
              LIVING SPACE
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-[#6d6259]">
              Property Advisory
            </div>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-[#364a4f] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#1a2b2f] after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#1a2b2f] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" variant="secondary" className="hidden sm:inline-flex">
            Call
          </Button>
          <Button href="/properties" className="hidden sm:inline-flex">
            Browse Homes
          </Button>
        </div>
      </div>
    </header>
  );
}
