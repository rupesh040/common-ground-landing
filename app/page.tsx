import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Causes from "@/components/Causes";
import TeamGrid from "@/components/TeamGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Causes hideTopLink />
      <TeamGrid />
      <Testimonials />
      <FAQ />
      <ContactForm />
    </>
  );
}
