"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { TestimonialSectionData, TestimonialItem } from "@/types/content";
import { testimonialSectionData } from "@/lib/content";

interface TestimonialsProps {
  data?: TestimonialSectionData;
  className?: string;
}

export default function Testimonials({
  data = testimonialSectionData,
  className = "",
}: TestimonialsProps) {
  const eyebrow = data?.eyebrow || "VOICES OF HOPE";
  const headingPart1 = data?.headingPart1 || "Stories that inspire.";
  const headingItalic = data?.headingItalic || "Lives forever changed.";
  const subtitle =
    data?.subtitle ||
    "Real experiences from neighbors, volunteers, and local partners working together for common good.";

  const items: TestimonialItem[] = data?.items || [];
  const total = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, total, handleNext]);

  if (!items.length) {
    return null;
  }

  // Pick up to 3 cards to show in the sliding window for desktop
  const activeItem = items[currentIndex];

  return (
    <section
      id="testimonials"
      className={`scroll-mt-24 py-12 sm:py-16 lg:py-20 bg-[#F7F7F0] border-t border-[#E8EDE2] relative overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background glow */}
      <div
        className="pointer-events-none absolute -top-24 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(208,234,135,0.22),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-20 w-80 h-80 bg-[radial-gradient(circle_at_bottom_left,rgba(20,51,35,0.06),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
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

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:text-right">
            <p className="text-sm sm:text-base text-[#4A5D50] max-w-sm leading-relaxed font-medium">
              {subtitle}
            </p>

            {/* Slider Controls */}
            {total > 1 && (
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 rounded-full border border-[#143323]/25 bg-white text-[#143323] flex items-center justify-center hover:bg-[#143323] hover:text-[#D4EAA2] hover:border-[#143323] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-11 h-11 rounded-full border border-[#143323]/25 bg-white text-[#143323] flex items-center justify-center hover:bg-[#143323] hover:text-[#D4EAA2] hover:border-[#143323] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Testimonials Display */}
        <div className="relative">
          {/* Main Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item, idx) => {
              const isFeatured = idx === currentIndex;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 cursor-pointer ${
                    isFeatured
                      ? "bg-white border-2 border-[#143323] shadow-lg scale-[1.02] ring-4 ring-[#D4EAA2]/40"
                      : "bg-[#FFFFFF]/85 hover:bg-white border border-[#E2E8DC] shadow-[0_2px_12px_rgba(20,51,35,0.04)] hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Quote mark and Stars */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-[#E5EED6] text-[#143323] flex items-center justify-center font-serif text-2xl font-bold">
                        “
                      </div>
                      <div className="flex gap-1" aria-label="5 out of 5 stars">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-[#E5A93C] fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Quote text */}
                    <p className="text-sm sm:text-base text-[#2D4536] leading-relaxed italic font-serif mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author metadata */}
                  <div className="pt-5 border-t border-[#E8EDE2] flex items-center gap-3.5">
                    {item.avatar ? (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4EAA2] bg-[#E5EED6] shrink-0">
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#143323] text-[#D4EAA2] flex items-center justify-center font-bold text-sm shrink-0">
                        {item.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#143323] font-sans leading-tight">
                        {item.author}
                      </h4>
                      <p className="text-xs text-[#526B5C] font-medium leading-tight mt-0.5">
                        {item.role}
                        {item.location && ` • ${item.location}`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          {total > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 sm:mt-10">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-[#143323]"
                      : "w-2.5 bg-[#143323]/25 hover:bg-[#143323]/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
