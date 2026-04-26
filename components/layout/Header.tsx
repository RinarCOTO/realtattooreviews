"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Container from "./Container";

const nav = [
  {
    label: "Providers",
    href: "/providers",
    mega: {
      sections: [
        {
          heading: "By Need",
          links: [
            { label: "Complete Removal", href: "/categories/complete-removal" },
            { label: "Dark Skin", href: "/categories/dark-skin-removal" },
            { label: "Color Ink", href: "/categories/color-ink-removal" },
            { label: "Cover-Up Prep", href: "/categories/cover-up-prep" },
            { label: "Microblading Removal", href: "/categories/microblading-removal" },
            { label: "All Categories", href: "/categories" },
          ],
        },
        {
          heading: "By Provider",
          links: [
            { label: "All Providers", href: "/providers" },
            { label: "inkOUT", href: "/reviews/inkout" },
            { label: "Removery", href: "/reviews/removery" },
            { label: "MEDermis Laser Clinic", href: "/reviews/medermis-laser-clinic" },
            { label: "DermSurgery Associates", href: "/reviews/dermsurgery-associates" },
            { label: "InkFree, MD", href: "/reviews/inkfree-md" },
          ],
        },
        {
          heading: "By City",
          links: [
            { label: "Austin, TX", href: "/cities/austin" },
            { label: "Chicago, IL", href: "/cities/chicago" },
            { label: "Houston, TX", href: "/cities/houston" },
            { label: "Tampa, FL", href: "/cities/tampa" },
            { label: "Draper, UT", href: "/cities/draper" },
            { label: "All Cities", href: "/cities" },
          ],
        },
      ],
      featured: {
        label: "What does it cost?",
        description: "Average session pricing, package deals, and what affects your total.",
        href: "/cost",
      },
    },
  },
  {
    label: "Compare",
    href: "/comparisons",
    mega: {
      sections: [
        {
          heading: "Provider vs Provider",
          links: [
            { label: "All Comparisons", href: "/comparisons" },
            { label: "inkOUT vs Removery", href: "/comparisons/inkout-vs-removery" },
            { label: "inkOUT vs LaserAway", href: "/comparisons/inkout-vs-laseraway" },
            { label: "Removery vs LaserAway", href: "/comparisons/removery-vs-laseraway" },
          ],
        },
        {
          heading: "Method vs Method",
          links: [
            { label: "PicoWay vs Q-Switch", href: "/comparisons/picoway-vs-q-switch" },
            { label: "Saline vs Laser", href: "/comparisons/saline-vs-laser-tattoo-removal" },
            { label: "Best Removal Method", href: "/comparisons/best-tattoo-removal-method" },
          ],
        },
      ],
      featured: {
        label: "inkOUT vs Removery",
        description: "The most-compared matchup on the site: TEPR vs PicoWay, price vs session count.",
        href: "/comparisons/inkout-vs-removery",
      },
    },
  },
  {
    label: "Guides",
    href: "/guides",
    mega: {
      sections: [
        {
          heading: "Treatment Guides",
          links: [
            { label: "All Guides", href: "/guides" },
            { label: "Aftercare", href: "/guides/tattoo-removal-aftercare" },
            { label: "Healing Process", href: "/guides/tattoo-removal-healing-process" },
            { label: "Side Effects", href: "/guides/tattoo-removal-side-effects" },
            { label: "Scarring", href: "/guides/tattoo-removal-scarring" },
            { label: "Saline Removal", href: "/guides/saline-tattoo-removal" },
          ],
        },
        {
          heading: "About This Site",
          links: [
            { label: "How We Rate Providers", href: "/methodology" },
            { label: "Editorial Policy", href: "/editorial-policy" },
            { label: "About", href: "/about" },
          ],
        },
      ],
      featured: {
        label: "Before and after photos",
        description: "Real patient results across laser and non-laser methods.",
        href: "/before-and-after",
      },
    },
  },
  { label: "Cost", href: "/cost" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  function isSectionActive(item: (typeof nav)[number]) {
    if (isActive(item.href)) return true;
    if (item.mega) {
      return item.mega.sections.some((s) =>
        s.links.some((l) => isActive(l.href))
      );
    }
    return false;
  }

  function handleMegaKeyDown(e: React.KeyboardEvent, label: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenMega(openMega === label ? null : label);
    } else if (e.key === "Escape") {
      setOpenMega(null);
    }
  }

  function handleEscapeClose(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpenMega(null);
    }
  }

  function closeMobile() {
    setMobileOpen(false);
    setOpenMobileSection(null);
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-surface"
      onMouseLeave={() => setOpenMega(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpenMega(null);
        }
      }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-sm font-bold tracking-tight text-heading rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            RealTattooReviews
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active = isSectionActive(item);
              const open = openMega === item.label;
              const isCompareMenu = item.label === "Compare";

              return item.mega ? (
                <div key={item.label} onMouseEnter={() => setOpenMega(item.label)}>
                  <button
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenMega(open ? null : item.label)}
                    onFocus={() => setOpenMega(item.label)}
                    onKeyDown={(e) => handleMegaKeyDown(e, item.label)}
                    className={`relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                      open
                        ? "bg-accent-light text-accent"
                        : active
                        ? "text-accent"
                        : "text-muted hover:bg-accent-light hover:text-accent"
                    }`}
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {active && !open && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent" />
                    )}
                  </button>

                  {open && (
                    <div
                      className="absolute top-full left-0 w-full border-b border-border bg-surface shadow-lg"
                      onKeyDown={handleEscapeClose}
                    >
                      <Container>
                        <div className="flex gap-8 py-10">
                          <div className="flex flex-1 gap-8">
                            {item.mega.sections.map((section) => (
                              <div key={section.heading} className="min-w-0 flex-1">
                                <p className="mb-5 text-[13px] font-bold uppercase tracking-wider text-heading">
                                  {section.heading}
                                </p>
                                <ul className="space-y-1">
                                  {section.links.map((link) => {
                                    const linkActive = isActive(link.href);
                                    const isNeedSection = section.heading === "By Need";
                                    const isBestRemovalMethod =
                                      isCompareMenu && link.label === "Best Removal Method";
                                    return (
                                      <li
                                        key={link.href}
                                        className={
                                          isBestRemovalMethod
                                            ? "mt-2 border-t border-[#E8E4E0] pt-3"
                                            : undefined
                                        }
                                      >
                                        <Link
                                          href={link.href}
                                          className={`-ml-2 block rounded border-l-2 border-transparent py-0.5 pl-2 text-sm leading-[1.8] transition-all duration-150 hover:translate-x-[3px] hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
                                            linkActive
                                              ? "font-semibold text-accent"
                                              : isNeedSection
                                              ? "font-medium text-heading hover:text-accent"
                                              : "text-muted hover:text-accent"
                                          }`}
                                          onClick={() => setOpenMega(null)}
                                        >
                                          {linkActive && (
                                            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
                                          )}
                                          {isBestRemovalMethod && (
                                            <span className="mr-1 text-accent">→</span>
                                          )}
                                          {link.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Featured card: always a different destination than the nav label */}
                          <div className="w-56 shrink-0">
                            <Link
                              href={item.mega.featured.href}
                              className={`group flex h-full flex-col justify-between rounded-lg bg-[#FAF7F4] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                                isCompareMenu
                                  ? "border-l-[3px] border-l-accent"
                                  : "border border-[#E8D8D0]"
                              }`}
                              onClick={() => setOpenMega(null)}
                            >
                              <div>
                                {isCompareMenu && (
                                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                                    MOST COMPARED
                                  </p>
                                )}
                                <p className="text-sm font-semibold text-heading">
                                  {item.mega.featured.label}
                                </p>
                                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                                  {item.mega.featured.description}
                                </p>
                              </div>
                              <span
                                className={`mt-4 text-xs font-medium text-accent ${
                                  isCompareMenu ? "group-hover:underline" : ""
                                }`}
                              >
                                Go →
                              </span>
                            </Link>
                          </div>
                        </div>
                      </Container>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onFocus={() => setOpenMega(null)}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    active
                      ? "text-accent"
                      : "text-muted hover:bg-accent-light hover:text-accent"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/providers"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Find a Provider
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex items-center justify-center rounded-md p-2 text-muted hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <svg aria-hidden="true" focusable="false" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg aria-hidden="true" focusable="false" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-border bg-surface lg:hidden">
          <Container>
            <nav aria-label="Mobile navigation" className="flex flex-col py-2">
              {nav.map((item) => {
                const active = isSectionActive(item);
                const sectionOpen = openMobileSection === item.label;

                return (
                  <div key={item.label}>
                    {item.mega ? (
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          className={`flex-1 rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                            active ? "text-accent" : "text-body hover:text-accent"
                          }`}
                          onClick={closeMobile}
                        >
                          {item.label}
                        </Link>
                        <button
                          aria-expanded={sectionOpen}
                          aria-label={`${sectionOpen ? "Collapse" : "Expand"} ${item.label} links`}
                          onClick={() => setOpenMobileSection(sectionOpen ? null : item.label)}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-accent-light hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            className={`h-4 w-4 transition-transform duration-200 ${sectionOpen ? "rotate-180" : ""}`}
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                          active ? "text-accent" : "text-body hover:text-accent"
                        }`}
                        onClick={closeMobile}
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.mega && sectionOpen && (
                      <div className="mb-1 ml-3 border-l-2 border-border pl-3">
                        {item.mega.sections.map((section) => (
                          <div key={section.heading} className="mb-3 last:mb-1">
                            <p className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-muted">
                              {section.heading}
                            </p>
                            {section.links.map((link) => {
                              const linkActive = isActive(link.href);
                              return (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className={`block rounded px-1 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
                                    linkActive
                                      ? "font-semibold text-accent"
                                      : "text-muted hover:text-accent"
                                  }`}
                                  onClick={closeMobile}
                                >
                                  {link.label}
                                </Link>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mt-2 border-t border-border pt-3 pb-1">
                <Link
                  href="/providers"
                  className="block rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  onClick={closeMobile}
                >
                  Find a Provider
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
