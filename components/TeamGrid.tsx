"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TeamSectionData } from "@/types/content";
import { teamSectionData } from "@/lib/content";

interface TeamGridProps {
  data?: TeamSectionData;
  className?: string;
}

export default function TeamGrid({
  data = teamSectionData,
  className = "",
}: TeamGridProps) {
  return (
    <section
      id="team"
      className={`scroll-mt-24 py-8 bg-[#F4F3EE] border-t border-[#E8EDE2] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EED6] border border-[#CCE0B2] text-[#143323] text-xs font-bold tracking-[0.14em] uppercase mb-4 shadow-xs font-sans">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#143323]"
                aria-hidden="true"
              />
              <span>{data.eyebrow}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143323] leading-[1.15]">
              {data.headingPart1}
              <br />
              <span className="italic font-serif font-normal text-[#143323]">
                {data.headingItalic}
              </span>
            </h2>
          </div>

          <p className="text-sm text-[#4A5D50] max-w-sm lg:text-right leading-relaxed font-medium">
            {data.subtitleNote}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {data.roles.map((role, idx) => {
            const bgClass =
              role.bgVariant === "sage"
                ? "bg-[#D8E6D3]"
                : role.bgVariant === "olive"
                  ? "bg-[#DEE8BC]"
                  : "bg-[#F1EBD6]";

            return (
              <motion.article
                key={role.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
                className="flex flex-col group transform-gpu"
              >
                <div
                  className={`relative w-full aspect-square rounded-2xl ${bgClass} overflow-hidden mb-5 select-none shadow-[0_2px_8px_rgba(20,51,35,0.04)] border border-[#E2E6DA]`}
                >
                  {role.image ? (
                    <Image
                      src={role.image}
                      alt={role.name || role.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
                    />
                  ) : (
                    <div className="w-full h-full p-5 flex items-center justify-center">
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="w-48 h-48 rounded-full border border-[#143323]/35" />
                        <div className="w-32 h-32 rounded-full border border-[#143323]/35 -ml-16" />
                      </div>

                      <span className="relative z-10 font-editorial text-4xl sm:text-5xl font-light text-[#143323] tracking-widest">
                        {role.initials}
                      </span>
                    </div>
                  )}
                </div>

                <span className="text-xs font-bold tracking-[0.14em] text-[#4A5D50] uppercase block mb-1 font-sans">
                  {role.roleTag}
                </span>

                <h3 className="font-editorial text-2xl font-bold text-[#143323] mb-1 leading-snug group-hover:text-[#235037] transition-colors">
                  {role.name || role.title}
                </h3>

                <p className="text-sm font-semibold text-[#1E5638] font-sans">
                  {role.position || role.title}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
