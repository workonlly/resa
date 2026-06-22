"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, UtensilsCrossed } from "lucide-react";

export default function Header({ data }: { data?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin State
  const [title, setTitle] = useState(data?.title || "Gupta Bhojnalaya");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${url}/api/content/header`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Saved!");
    } catch (err) {
      alert("Error saving: " + err);
    }
    setIsSaving(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#fffdf9] shadow-md py-3" : "bg-gradient-to-b from-black/70 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div 
          className={`font-serif text-2xl font-bold flex items-center gap-2 ${
            isScrolled ? "text-[#ea580c]" : "text-white"
          }`}
        >
          <img src="logo.png" alt="" className="h-10 w-10" />
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="bg-transparent border-b border-dashed border-gray-400 focus:outline-none w-48"
          />
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded ml-2 font-sans tracking-wide"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["About", "Menu Highlights", "Why Us", "Reviews", "Gallery", "Visit Us"].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
              className={`text-sm font-medium hover:text-[#ea580c] transition-colors ${
                isScrolled ? "text-[#3e2723]" : "text-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
          <a 
            href="tel:+910000000000" 
            className="bg-[#ea580c] text-white px-5 py-2 rounded-sm font-medium hover:bg-orange-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Phone size={16} /> Call Now
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={28} className="text-[#3e2723]" />
          ) : (
            <Menu size={28} className={isScrolled ? "text-[#3e2723]" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#fffdf9] shadow-xl flex flex-col items-center py-6 gap-6 border-t border-orange-100">
          {["About", "Menu Highlights", "Why Us", "Reviews", "Gallery", "Visit Us"].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
              className="text-[#3e2723] font-medium text-lg"
            >
              {item}
            </button>
          ))}
          <a 
            href="tel:+910000000000" 
            className="bg-[#ea580c] text-white px-8 py-3 rounded-sm font-medium text-lg flex items-center gap-2 w-[80%] justify-center mt-2"
          >
            <Phone size={20} /> Call Now
          </a>
        </div>
      )}
    </header>
  );
}
