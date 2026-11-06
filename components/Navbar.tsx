"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { CommonGroundHeader1Data } from "@/types/content";
import { headerData } from "@/lib/content";

interface NavbarProps {
  data?: CommonGroundHeader1Data;
}

export default function Navbar({ data = headerData }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = [
      "hero",
      "about",
      "causes",
      "team",
      "gallery",
      "faq",
      "contact",
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 180) {
        setActiveSection("hero");
        return;
      }

      let current = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 160) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      const targetId = href.replace(/^#/, "");
      if (pathname === "/") {
        e.preventDefault();
        if (targetId === "hero" || targetId === "") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${targetId}`);
          }
        }
        setMobileMenuOpen(false);
      }
    }
  };

  const donateDestination =
    pathname === "/"
      ? data.button?.href?.startsWith("#")
        ? data.button.href
        : "#contact"
      : data.button?.href?.startsWith("#")
        ? `/${data.button.href}`
        : "/#contact";

  return (
    <header className="sticky top-0 z-50 bg-[#F7F7F0]/95 backdrop-blur-md border-b border-[#E2E6DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
              }
            }}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323] rounded-lg"
            aria-label={`${data.logo?.name || "common ground"} home`}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex items-center"
            >
              <Image
                src={data.logo?.image || "/images/logo.png"}
                alt={data.logo?.name || "common ground"}
                width={175}
                height={50}
                priority
                className="h-11 sm:h-12 md:h-14 w-auto object-contain"
              />
            </motion.div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-6"
            aria-label="Main Navigation"
          >
            {data.navLinks.map((link) => {
              const targetId = link.href.replace(/^#/, "").replace(/^\/#/, "");
              const isAnchor =
                link.href.startsWith("#") || link.href.startsWith("/#");
              const destination =
                pathname === "/"
                  ? link.href.startsWith("#")
                    ? link.href
                    : `#${targetId}`
                  : `/#${targetId}`;

              const isActive =
                pathname === "/"
                  ? activeSection === targetId ||
                    (targetId === "hero" && activeSection === "hero")
                  : link.href === pathname;

              return (
                <Link
                  key={link.name}
                  href={destination}
                  onClick={(e) => handleNavClick(e, destination)}
                  className={`relative text-sm py-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323] rounded-xs px-1 ${
                    isActive
                      ? "text-[#143323] font-semibold after:absolute after:bottom-0 after:left-1 after:right-1 after:h-[2px] after:bg-[#143323] after:rounded-full"
                      : "text-[#4A5D50] hover:text-[#143323] font-medium"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={donateDestination}
                onClick={(e) => handleNavClick(e, donateDestination)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[40px] rounded-full bg-[#D4EAA2] text-[#143323] text-sm font-semibold tracking-tight hover:bg-[#C2E073] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323] focus-visible:ring-offset-2"
              >
                <span>{data.button?.text || "Donate"}</span>
                <svg
                  className="w-4 h-4 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#143323] hover:bg-[#E2E6DA]/60 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="lg:hidden overflow-hidden py-4 border-t border-[#E2E6DA] bg-[#F7F7F0] space-y-1"
            >
              {data.navLinks.map((link) => {
                const targetId = link.href
                  .replace(/^#/, "")
                  .replace(/^\/#/, "");
                const destination =
                  pathname === "/"
                    ? link.href.startsWith("#")
                      ? link.href
                      : `#${targetId}`
                    : `/#${targetId}`;
                const isActive =
                  pathname === "/"
                    ? activeSection === targetId
                    : link.href === pathname;

                return (
                  <Link
                    key={link.name}
                    href={destination}
                    onClick={(e) => handleNavClick(e, destination)}
                    className={`flex items-center min-h-[44px] px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#D4EAA2]/60 text-[#143323] font-bold"
                        : "text-[#4A5D50] hover:bg-[#E2E6DA]/50 hover:text-[#143323]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 px-3">
                <Link
                  href={donateDestination}
                  onClick={(e) => handleNavClick(e, donateDestination)}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-full bg-[#D4EAA2] text-[#143323] font-semibold text-sm hover:bg-[#C2E073] transition-colors shadow-xs"
                >
                  <span>{data.button?.text || "Donate"}</span>
                  <svg
                    className="w-4 h-4 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
