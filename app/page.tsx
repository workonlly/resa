import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import MenuHighlights from "../components/MenuHighlights";
import WhyUs from "../components/WhyUs";
import Reviews from "../components/Reviews";
import Gallery from "../components/Gallery";
import VisitUs from "../components/VisitUs";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

async function fetchSiteContent() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    // Avoid caching in admin panel to always see latest data
    const res = await fetch(`${url}/api/everything`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    
    // Map array to dictionary
    const contentMap: Record<string, any> = {};
    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        if (item.section_id) {
          contentMap[item.section_id] = item;
        }
      });
    }
    return contentMap;
  } catch (error) {
    console.error("Error fetching site content:", error);
    return {};
  }
}

export default async function GuptaBhojnalaya() {
  const content = await fetchSiteContent();

  return (
    <div className="min-h-screen bg-[#fffdf9] font-sans text-[#3e2723] overflow-x-hidden">
      <Header data={content.header} />
      <Hero data={content.hero} />
      <About data={content.about} />
      <MenuHighlights />
      <WhyUs />
      <Reviews data={content.reviews} />
      <Gallery data={content.gallery} />
      <VisitUs />
      <FinalCTA />
      <Footer data={content.footer} />
    </div>
  );
}