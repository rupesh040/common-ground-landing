"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { CommonGroundHero1Data } from "@/types/content";
import { heroData } from "@/lib/content";

interface HeroProps {
  data?: CommonGroundHero1Data;
  className?: string;
  breadcrumb?: string;
}

export default function Hero({
  data = heroData,
  className = "",
  breadcrumb: breadcrumbProp,
}: HeroProps) {
  const pathname = usePathname();
  const heroBgColor = data.bgColor || "#F7F7F0";

  const breadcrumbString =
    breadcrumbProp || data.breadcrumb || "Seeking Justice, Nurturing Peace";
  const rawParts = breadcrumbString.split("/").map((p) => p.trim());
  const breadcrumbParts =
    rawParts.length === 1 && rawParts[0] !== "Home"
      ? ["", rawParts[0]]
      : rawParts;

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  };

  const handleScrollToTarget = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace(/^#/, "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  const badgeWords = (
    data.circularBadge?.badgeText || "Good things grow together."
  ).split(" ");
  const badgeFirstPart = badgeWords.slice(0, 2).join(" ");
  const badgeSecondPart = badgeWords.slice(2).join(" ");

  return (
    <section
      id="hero"
      className={`relative overflow-hidden scroll-mt-24 py-8 bg-[#F7F7F0] ${className}`}
      style={{ backgroundColor: heroBgColor }}
    >
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(208,234,135,0.2),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6"
          >
            <motion.nav
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              aria-label="Breadcrumb"
              className="mb-6 sm:mb-8"
            >
              <ol className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFE6D6] shadow-[0_1px_3px_rgba(20,51,35,0.04)] text-xs font-medium text-[#4A5D50]">
                <li className="flex items-center">
                  <Link
                    href="/"
                    onClick={handleHomeClick}
                    className="flex items-center gap-1.5 text-[#546E5D] hover:text-[#143323] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323] rounded font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#143323]" />
                    <span>{breadcrumbParts[0]}</span>
                  </Link>
                </li>
                {breadcrumbParts.slice(1).map((part, idx) => {
                  const isLast = idx === breadcrumbParts.length - 2;
                  return (
                    <li key={idx} className="flex items-center gap-2">
                      <span
                        aria-current={isLast ? "page" : undefined}
                        className={`font-semibold tracking-wide ${
                          isLast ? "text-[#143323]" : "text-[#4A5D50]"
                        }`}
                      >
                        {part}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </motion.nav>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#143323] leading-[1.08] mb-5 sm:mb-6"
            >
              {data.headingPart1}
              <br />
              <span className="relative inline-block italic font-serif font-normal text-[#143323]">
                <span className="relative z-10">{data.headingPart2}</span>
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-[105%] h-3.5 sm:h-4 text-[#CDE87B] pointer-events-none select-none"
                  viewBox="0 0 200 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                    d="M 3 8 C 60 2.5, 140 2.5, 197 7"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[#4A5D50] text-base sm:text-lg lg:text-xl leading-relaxed font-sans max-w-xl mb-7 sm:mb-9"
            >
              {data.description ||
                "Empowering rural communities through grassroots action, sustainable stewardship, and compassionate care for a resilient future."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <Link
                href={data.primaryButton.href}
                onClick={(e) =>
                  handleScrollToTarget(e, data.primaryButton.href)
                }
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[46px] rounded-full bg-[#143323] text-[#FAFBF7] font-semibold text-sm hover:bg-[#0D2218] transition-all duration-200 shadow-[0_4px_14px_rgba(20,51,35,0.15)] hover:shadow-[0_6px_20px_rgba(20,51,35,0.22)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323] focus-visible:ring-offset-2"
              >
                <span>{data.primaryButton.text}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5]">
              <div className="absolute -inset-2 rounded-t-[208px] rounded-b-[38px] border border-[#143323]/10 pointer-events-none" />
              <div className="relative w-full h-full rounded-t-[200px] rounded-b-[32px] overflow-hidden shadow-[0_12px_40px_rgba(20,51,35,0.09)] border-4 border-white bg-[#E8EDE2]">
                <Image
                  src={data.image}
                  alt="Hands holding rich fertile soil with sprouting green seedling"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{
                duration: 0.6,
                delay: 0.45,
                type: "spring",
                stiffness: 180,
              }}
              className="absolute -bottom-4 -left-2 sm:bottom-4 sm:-left-8 z-20 cursor-default"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#D4EAA2] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xl border border-[#143323]/20 overflow-hidden">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <path
                    id="heroBadgePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.2px] uppercase font-bold tracking-[0.18em] fill-[#143323]/70">
                    <textPath href="#heroBadgePath" startOffset="0%">
                      {data.circularBadge?.curvedText ||
                        "HOPE & HEALING FOR COMMUNITIES • HOPE & HEALING •"}
                    </textPath>
                  </text>
                </svg>

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="text-[#143323] mb-0.5" aria-hidden="true">
                    <Image
                      src="/images/sub-logo.png"
                      alt=""
                      width={16}
                      height={16}
                      className="w-7 h-7 sm:w-9 sm:h-9 object-contain shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#143323] leading-tight font-sans">
                    {badgeFirstPart}
                    {badgeSecondPart && (
                      <>
                        <br />
                        <span className="italic font-serif font-normal text-[11px] sm:text-xs">
                          {badgeSecondPart}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
