"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CommonGroundFAQ1Data } from "@/types/content";
import { faqData } from "@/lib/content";

interface FAQProps {
  data?: CommonGroundFAQ1Data;
  className?: string;
}

export default function FAQ({ data = faqData, className = "" }: FAQProps) {
  const items = data?.items || [];
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className={`scroll-mt-24 relative py-8 bg-[#143323] text-[#FAFBF7] border-t border-[#1F4532] overflow-hidden ${className}`}
    >
      <div
        className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D0EA87]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 left-10 w-72 h-72 rounded-full bg-[#1C412E]/60 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute -right-12 -bottom-16 pointer-events-none text-[#D0EA87]/[0.06] select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="w-72 h-72 sm:w-96 sm:h-96"
        >
          <path d="M40 180 C40 110, 110 40, 180 40 C180 110, 110 180, 40 180 Z" />
          <path d="M40 180 C80 140, 130 90, 180 40" />
          <path d="M90 130 C120 130, 140 110, 150 90" />
          <path d="M70 150 C95 150, 115 135, 125 120" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            {data?.eyebrow && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D0EA87]/15 border border-[#D0EA87]/30 text-[#D0EA87] text-xs font-bold tracking-[0.14em] uppercase mb-4 shadow-xs font-sans">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#D0EA87] animate-pulse"
                  aria-hidden="true"
                />
                <span>{data.eyebrow}</span>
              </div>
            )}

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5">
              {data?.headingPart1}
              {data?.headingPart1 && <br />}
              <span className="italic font-serif font-normal text-[#D4EAA2]">
                {data?.headingItalic}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#FAFBF7]/80 leading-relaxed max-w-md font-sans">
              Find clear answers on our grassroots initiatives, transparent fund
              allocation, and how you can take part.
            </p>
          </motion.div>

          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {items.map((item, idx) => {
              const isOpen = openId === item.id;
              const triggerId = `faq-home-trigger-${item.id}`;
              const panelId = `faq-home-panel-${item.id}`;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-[#183D2A] border-[#D0EA87]/70 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-[#D0EA87]/30"
                      : "bg-white/[0.05] hover:bg-white/[0.09] border-white/10 hover:border-[#D0EA87]/30 shadow-xs"
                  }`}
                >
                  <button
                    id={triggerId}
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between text-left gap-4 p-5 sm:p-6 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0EA87] rounded-2xl"
                  >
                    <div className="flex items-start gap-4 pr-2">
                      <span
                        className={`mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full font-mono text-xs font-bold tracking-wider shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-[#D0EA87] text-[#143323] shadow-xs"
                            : "bg-white/[0.08] text-[#D0EA87] border border-white/10 group-hover:bg-[#D0EA87] group-hover:text-[#143323]"
                        }`}
                        aria-hidden="true"
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className={`font-editorial text-lg sm:text-xl font-bold tracking-tight transition-colors leading-snug ${
                          isOpen
                            ? "text-white"
                            : "text-[#FAFBF7]/90 group-hover:text-white"
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shrink-0 transition-all shadow-xs ${
                        isOpen
                          ? "bg-[#D0EA87] text-[#143323] border-[#D0EA87]"
                          : "bg-white/[0.08] text-[#D0EA87] border-white/15 group-hover:bg-[#D0EA87] group-hover:text-[#143323] group-hover:border-[#D0EA87]"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.4}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-0">
                          <div className="pt-4 border-t border-white/10 pl-12 sm:pl-12">
                            <p className="text-[15px] sm:text-base text-[#FAFBF7]/85 leading-relaxed font-sans">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
