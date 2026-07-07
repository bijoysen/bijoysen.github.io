"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "#home");
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const headerOffset = 80;

    const updateActiveSection = () => {
      const scrollPos = window.scrollY + headerOffset + 1;
      let current = navLinks[0]?.href ?? "#home";

      for (const link of navLinks) {
        const section = document.getElementById(link.href.slice(1));
        if (!section) continue;

        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPos) {
          current = link.href;
        }
      }

      setActiveHref(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    firstMenuLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    toggleButtonRef.current?.focus();
  };

  const renderNavLabel = (label: string, isActive: boolean) => {
    if (!isActive) return label;

    return (
      <span className="text-teal">
        <span className="mr-1 text-amber">(</span>
        {label}
        <span className="ml-1 text-amber">)</span>
      </span>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-cream/90 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-20 items-center justify-between">
        <a href="#home" className="font-display text-2xl font-extrabold tracking-tight">
          <span className="text-teal">B</span>
          <span className="text-navy">Sen.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative text-base font-medium text-navy transition-colors hover:text-teal"
                >
                  {renderNavLabel(link.label, isActive)}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <a href={profile.cvUrl} className="btn-primary" download>
            Download CV
          </a>
        </div>

        <button
          ref={toggleButtonRef}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-navy transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-navy transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-navy transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-black/5 bg-cream/95 backdrop-blur lg:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link, i) => {
              const isActive = link.href === activeHref;

              return (
                <li key={link.href}>
                  <a
                    ref={i === 0 ? firstMenuLinkRef : undefined}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                    className={`block rounded-lg px-2 py-2.5 hover:bg-black/5 hover:text-teal ${
                      isActive ? "font-semibold text-teal" : "text-navy"
                    }`}
                  >
                    {renderNavLabel(link.label, isActive)}
                  </a>
                </li>
              );
            })}
            <li className="pt-2">
              <a
                href={profile.cvUrl}
                download
                onClick={closeMenu}
                className="btn-primary w-full"
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
