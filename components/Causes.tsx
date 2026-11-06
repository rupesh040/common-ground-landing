"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CommonGroundCauses1Data } from "@/types/content";
import { causesData } from "@/lib/content";

interface CausesProps {
  data?: CommonGroundCauses1Data;
  className?: string;
  hideTopLink?: boolean;
  eyebrow?: string;
  headingPart1?: string;
  headingItalic?: string;
}

function renderTagIcon(tagIcon?: string) {
  if (tagIcon === "leaf") {
    return (
      <svg
        className="w-3.5 h-3.5 text-[#D4EAA2]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
        />
      </svg>
    );
  }
  if (tagIcon === "book") {
    return (
      <svg
        className="w-3.5 h-3.5 text-[#D4EAA2]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    );
  }
  if (tagIcon === "users") {
    return (
      <svg
        className="w-3.5 h-3.5 text-[#D4EAA2]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    );
  }
  return (
    <svg
      className="w-3.5 h-3.5 text-[#D4EAA2]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
    </svg>
  );
}

export default function Causes({
  data = causesData,
  className = "",
  eyebrow,
  headingPart1,
  headingItalic,
}: CausesProps) {
  const displayEyebrow = eyebrow || data.eyebrow;
  const displayHeadingPart1 = headingPart1 || data.headingPart1;
  const displayHeadingItalic = headingItalic || data.headingItalic;

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
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
      id="causes"
      className={`scroll-mt-24 py-8 bg-[#FAF9F5] border-y border-[#E2E8DC] relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(208,234,135,0.15),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-[#E2E8DC]"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EED6] border border-[#CCE0B2] text-[#143323] text-xs font-bold tracking-[0.14em] uppercase mb-4 shadow-2xs font-sans">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#143323]"
              aria-hidden="true"
            />
            <span>{displayEyebrow}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143323] leading-[1.15]">
            {displayHeadingPart1}
            <br />
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
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.items.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-3xl border border-[#E2E8DC] hover:border-[#143323]/25 shadow-[0_2px_12px_rgba(20,51,35,0.03)] hover:shadow-[0_20px_40px_rgba(20,51,35,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden relative transform-gpu"
            >
              <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#E8EDE2]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/25 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#143323]/85 backdrop-blur-md text-[#D4EAA2] text-[11px] font-mono font-bold tracking-widest uppercase shadow-sm select-none border border-white/10">
                  {renderTagIcon(item.tagIcon)}
                  <span>{item.category}</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-[1.65rem] font-bold text-[#143323] leading-[1.2] group-hover:text-[#0C2216] transition-colors mb-2.5">
                    <Link
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href)}
                      className="focus:outline-none focus-visible:underline decoration-[#D4EAA2] decoration-2 underline-offset-4"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-[#4A5D50] group-hover:text-[#2D4536] text-sm sm:text-[14.5px] leading-relaxed font-sans transition-colors mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDF1E7]">
                  <Link
                    href={item.href}
                    onClick={(e) => handleScrollToSection(e, item.href)}
                    className="group/btn flex items-center justify-between w-full px-5 py-3 rounded-full bg-[#F3F6EC] group-hover:bg-[#143323] text-[#143323] group-hover:text-white transition-all duration-300 text-sm font-semibold shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323]"
                  >
                    <span className="tracking-wide font-sans">
                      {item.linkText}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white group-hover/btn:bg-[#D4EAA2] text-[#143323] flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-1 shadow-2xs">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
