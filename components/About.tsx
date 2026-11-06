"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CommonGroundAbout1Data, AboutCardItem } from "@/types/content";
import { aboutData } from "@/lib/content";

interface AboutProps {
  data?: CommonGroundAbout1Data;
  className?: string;
  eyebrow?: string;
  headingPart1?: string;
  headingPart2?: string;
  headingItalic?: string;
}

export default function About({
  data = aboutData,
  className = "",
  eyebrow: eyebrowProp,
  headingPart1: headingPart1Prop,
  headingPart2: headingPart2Prop,
  headingItalic: headingItalicProp,
}: AboutProps) {
  const cards: AboutCardItem[] = data.cards || [];

  const displayHeadingPart1 = headingPart1Prop || data.headingPart1;
  const displayHeadingPart2 =
    headingPart2Prop !== undefined ? headingPart2Prop : data.headingPart2;
  const displayHeadingItalic =
    headingItalicProp !== undefined ? headingItalicProp : data.headingItalic;

  const handleScrollToTarget = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href?: string,
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

  return (
    <section
      id="about"
      className={`scroll-mt-24 py-8 bg-[#FAF9F5] border-y border-[#E2E8DC] relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(208,234,135,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl pb-8 sm:pb-10 border-b border-[#E2E8DC]"
        >
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#143323] leading-[1.16]">
            {displayHeadingPart1} {displayHeadingPart2 ? `${displayHeadingPart2} ` : ""}
            {displayHeadingItalic && (
              <span className="relative inline-block italic font-serif font-normal text-[#143323]">
                <span>{displayHeadingItalic}</span>
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-[105%] h-3 sm:h-3.5 text-[#CDE87B] pointer-events-none select-none"
                  viewBox="0 0 170 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 3 9 C 50 2.5, 115 3.5, 167 7.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            )}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10">
          {cards.map((card, idx) => {
            const isLast = idx === cards.length - 1 && cards.length % 2 !== 0;
            return (
              <motion.div
                key={card.id || idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
                className={`group relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-white hover:bg-[#FAFBF7] border border-[#E2E8DC] hover:border-[#143323]/25 shadow-[0_2px_8px_rgba(20,51,35,0.03)] hover:shadow-[0_16px_32px_rgba(20,51,35,0.06)] transition-all duration-300 flex flex-col justify-between cursor-default transform-gpu ${
                  isLast ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F6EC] group-hover:bg-[#143323] text-xs font-mono font-bold tracking-widest text-[#143323] group-hover:text-white transition-colors duration-250 uppercase">
                      <span>{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-[#143323]/40 group-hover:text-white/50">/</span>
                      <span>{card.tag}</span>
                    </span>
                    {card.icon && (
                      <span
                        className="w-9 h-9 rounded-full bg-[#FAFBF7] border border-[#E2E8DC] flex items-center justify-center transition-all duration-300 group-hover:bg-[#143323] group-hover:border-[#143323] group-hover:scale-105 group-hover:rotate-12 shadow-2xs"
                        aria-hidden="true"
                      >
                        <Image
                          src="/images/sub-logo-bw.png"
                          alt=""
                          width={18}
                          height={18}
                          className="w-4 h-4 object-contain grayscale contrast-125 transition-all duration-300 group-hover:invert"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#143323] group-hover:text-[#0C2216] transition-colors mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#4A5D50] group-hover:text-[#2D4536] text-sm sm:text-base leading-relaxed font-sans transition-colors">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EDF1E7] group-hover:border-[#DDE5D4] transition-colors flex items-center justify-between">
                  {card.badges && card.badges.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {card.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2.5 py-1 rounded-full bg-[#F5F7F0] group-hover:bg-[#EBF2DC] text-xs font-bold text-[#143323] tracking-wider uppercase border border-[#E0E6D8] shadow-2xs font-sans transition-all duration-200"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  ) : card.bottomTag ? (
                    <span className="text-xs sm:text-sm font-semibold text-[#143323] flex items-center gap-2 font-sans">
                      <span className="w-2 h-2 rounded-full bg-[#143323] ring-4 ring-[#143323]/10" />
                      {card.bottomTag}
                    </span>
                  ) : null}

                  {card.href ? (
                    <Link
                      href={card.href}
                      onClick={(e) => handleScrollToTarget(e, card.href)}
                      aria-label={`Get involved with ${card.title}`}
                      className="text-[#143323]/40 hover:text-[#143323] group-hover:text-[#143323] group-hover:translate-x-1 transition-all duration-300 ml-auto pl-2 p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323] rounded-xs"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <span
                      className="text-[#143323]/30 group-hover:text-[#143323] group-hover:translate-x-1 transition-all duration-300 ml-auto pl-2"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
