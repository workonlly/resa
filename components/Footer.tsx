"use client";

import React, { useState } from "react";
import { UtensilsCrossed, MapPin, Phone, Clock } from "lucide-react";

export default function Footer({ data }: { data?: any }) {
  const [description, setDescription] = useState(data?.description || "Sambhal's trusted destination for pure vegetarian North Indian cuisine. Family-friendly dining with uncompromising taste and hygiene.");
  const [address, setAddress] = useState(data?.address || "Bahjoi Road, Yashoda Chauraha, Opp. Yamaha Showroom, Sambhal, UP 244302");
  const [phone, setPhone] = useState(data?.phone || "+91 00000 00000");
  const [hours, setHours] = useState(data?.hours || "Daily: 11:00 AM - 12:00 AM");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/content/footer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, address, phone, hours }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Footer section saved!");
    } catch (err) {
      alert("Error saving: " + err);
    }
    setIsSaving(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1f1311] text-gray-400 py-12 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="absolute -top-6 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-bold shadow-md z-20"
        >
          {isSaving ? "Saving..." : "Save Footer"}
        </button>

        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="font-serif text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <UtensilsCrossed size={24} className="text-[#ea580c]" />
              Gupta Bhojnalaya
            </div>
            <p className="mb-6 max-w-sm leading-relaxed">
              <textarea 
                value={description} onChange={e => setDescription(e.target.value)}
                className="bg-transparent border border-dashed border-gray-600 p-2 focus:outline-none w-full rounded resize-none"
                rows={3}
              />
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Menu Highlights", "Gallery", "Visit Us"].map((link) => (
                <li key={link}>
                  <button onClick={() => scrollToSection(link.toLowerCase().replace(" ", "-"))} className="hover:text-[#ea580c] transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#ea580c] mt-0.5 shrink-0" />
                <textarea 
                  value={address} onChange={e => setAddress(e.target.value)}
                  className="bg-transparent border-b border-dashed border-gray-600 focus:outline-none w-full resize-none"
                  rows={2}
                />
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#ea580c] shrink-0" />
                <input 
                  value={phone} onChange={e => setPhone(e.target.value)}
                  className="bg-transparent border-b border-dashed border-gray-600 focus:outline-none w-full"
                />
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-[#ea580c] shrink-0" />
                <input 
                  value={hours} onChange={e => setHours(e.target.value)}
                  className="bg-transparent border-b border-dashed border-gray-600 focus:outline-none w-full"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Gupta Bhojnalaya, Sambhal. All rights reserved.</p>
      </div>
    </footer>
  );
}
