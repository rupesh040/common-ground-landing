"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ContactSectionData } from "@/types/content";
import { contactSectionData } from "@/lib/content";

interface ContactFormProps {
  data?: ContactSectionData;
  className?: string;
}

function ContactIcon({ icon }: { icon?: string }) {
  switch (icon) {
    case "email":
      return (
        <svg
          className="w-5 h-5 text-[#143323]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    case "phone":
      return (
        <svg
          className="w-5 h-5 text-[#143323]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      );
    case "address":
    default:
      return (
        <svg
          className="w-5 h-5 text-[#143323]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
  }
}

export default function ContactForm({
  data = contactSectionData,
  className = "",
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(data.formSubjects[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const contactItems =
    data.contactDetails && data.contactDetails.length > 0
      ? data.contactDetails
      : [
          {
            icon: "email",
            label: "Email Us",
            value: "info@zyx.com",
            href: "mailto:info@zyx.com",
            note: "Send us your inquiry anytime",
          },
          {
            icon: "phone",
            label: "Call Us",
            value: "+1 000-000-000",
            href: "tel:+1000000000",
            note: "Mon – Fri, 9:00 AM – 5:00 PM EST",
          },
          {
            icon: "address",
            label: "Our Location",
            value: "124 Community Way, Suite 300, Austin, TX 78701, USA",
            href: "https://maps.google.com/?q=124+Community+Way+Suite+300+Austin+TX+78701",
            note: "Open for scheduled community visits",
          },
        ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("Please fill in all required fields.");
      return;
    }

    setStatus(
      "Thank you! Your inquiry has been sent successfully. We will get back to you shortly.",
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    const handleHash = () => {
      if (
        typeof window !== "undefined" &&
        window.location.hash === "#contact"
      ) {
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section
      id="contact"
      className={`scroll-mt-24 py-8 bg-[#F4F3EE] border-t border-[#E8EDE2] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EED6] border border-[#CCE0B2] text-[#143323] text-xs font-bold tracking-[0.14em] uppercase mb-4 shadow-xs font-sans">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#143323]"
                  aria-hidden="true"
                />
                <span>{data.leftEyebrow}</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143323] leading-[1.15] mb-5">
                {data.leftHeadingPart1}
                <br />
                <span className="italic font-serif font-normal text-[#143323]">
                  {data.leftHeadingItalic}
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#4A5D50] leading-relaxed mb-8">
                {data.leftDescription}
              </p>

              <div className="border-t border-[#E2E6DA] py-6 space-y-4 mb-6">
                {contactItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 border border-[#E2E6DA] hover:border-[#CCE0B2] hover:bg-white transition-all shadow-[0_2px_8px_rgba(20,51,35,0.02)] group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E5EED6] border border-[#CCE0B2] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <ContactIcon icon={item.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#4A5D50] block font-sans mb-0.5">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-base sm:text-lg font-bold text-[#143323] hover:text-[#235037] hover:underline underline-offset-4 transition-colors break-words block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base sm:text-lg font-bold text-[#143323] leading-snug">
                          {item.value}
                        </p>
                      )}
                      {item.note && (
                        <p className="text-xs sm:text-sm text-[#7A8E80] mt-0.5">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <div className="bg-white rounded-3xl p-7 sm:p-9 lg:p-10 border border-[#E2E6DA] shadow-[0_4px_24px_rgba(20,51,35,0.04)]">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#4A5D50] block mb-2 font-sans">
                {data.formEyebrow}
              </span>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#143323] mb-4 sm:mb-5">
                {data.formHeadingPart1}{" "}
                <span className="italic font-serif font-normal">
                  {data.formHeadingItalic}
                </span>
              </h3>

              <div className="rounded-xl bg-[#F4F7EE] p-4 text-xs sm:text-sm text-[#23432B] leading-relaxed mb-6 border border-[#D5E3C7]">
                {data.formNotice}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#143323] mb-1.5">
                      Your name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Taylor"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#E2E6DA] text-sm text-[#143323] placeholder:text-[#889B8D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#143323] focus:border-[#143323] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#143323] mb-1.5">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#E2E6DA] text-sm text-[#143323] placeholder:text-[#889B8D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#143323] focus:border-[#143323] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#143323] mb-1.5">
                    What&apos;s on your mind? *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#E2E6DA] text-sm text-[#143323] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#143323] focus:border-[#143323] transition-all"
                  >
                    {data.formSubjects.map((subj, idx) => (
                      <option key={idx} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#143323] mb-1.5">
                    Your message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your idea or how you'd like to get involved..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E2E6DA] text-sm text-[#143323] placeholder:text-[#889B8D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#143323] focus:border-[#143323] transition-all resize-none"
                  />
                </div>

                <p className="text-xs font-medium text-[#4A5D50]">
                  * Required fields
                </p>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    className="p-3.5 rounded-xl bg-[#EAF2D7] text-sm font-semibold text-[#143323] border border-[#CCE0B2] shadow-2xs"
                  >
                    {status}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 min-h-[46px] rounded-full bg-[#143323] text-[#FAFBF7] font-semibold text-sm hover:bg-[#0D2218] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143323] focus-visible:ring-offset-2 cursor-pointer"
                >
                  <span>{data.submitButtonText || "Send Inquiry"}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
