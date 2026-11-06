"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GallerySectionData } from "@/types/content";
import { gallerySectionData } from "@/lib/content";

interface GalleryViewProps {
  data?: GallerySectionData;
  className?: string;
}

export default function GalleryView({
  data = gallerySectionData,
  className = "",
}: GalleryViewProps) {
  const eyebrow = data.eyebrow || "OUR GALLERY";
  const headingPart1 = data.headingPart1 || "Small moments.";
  const headingItalic = data.headingItalic || "Something meaningful.";
  const subtitle =
    data.subtitle ||
    "A glimpse of the care, curiosity, and connection at the heart of our vision.";

  const rawItems = data.items || [];
  const items = Array.from(
    new Map(rawItems.map((item) => [item.id || item.image, item])).values(),
  );

  return (
    <section
      id="gallery"
      className={`scroll-mt-24 py-8 bg-[#F7F7F0] border-t border-[#E8EDE2] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EED6] border border-[#CCE0B2] text-[#143323] text-xs font-bold tracking-[0.14em] uppercase mb-4 shadow-xs font-sans">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#143323]"
                aria-hidden="true"
              />
              <span>{eyebrow}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143323] leading-[1.15]">
              {headingPart1}
              <br />
              <span className="italic font-serif font-normal text-[#143323]">
                {headingItalic}
              </span>
            </h2>
          </div>

          <p className="text-sm text-[#4A5D50] max-w-sm lg:text-right leading-relaxed font-medium">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8EDE2] shadow-[0_2px_10px_rgba(20,51,35,0.04)] hover:shadow-lg transition-all duration-300 select-none border border-black/5"
            >
              <Image
                src={item.image}
                alt={item.title || "Gallery photo"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none transition-all duration-300">
                {item.title && (
                  <h3 className="font-editorial text-lg sm:text-xl font-bold leading-snug drop-shadow-sm text-white">
                    {item.title}
                  </h3>
                )}
                {item.subtitle && (
                  <p className="text-xs sm:text-sm text-white/90 drop-shadow-sm font-sans mt-1 max-w-lg leading-relaxed">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
