"use client";

import React, { useState } from "react";
import { Leaf, MapPin, Navigation } from "lucide-react";

export default function Hero({ data }: { data?: any }) {
  const [badge, setBadge] = useState(data?.badge || "100% Pure Vegetarian");
  const [title, setTitle] = useState(data?.title || "Pure Veg Taste That Feels Like Home");
  const [description, setDescription] = useState(data?.description || "Authentic North Indian meals and comforting family dining, proudly serving Sambhal near Yashoda Chauraha.");
  const [primaryCta, setPrimaryCta] = useState(data?.primary_cta || "Get Directions");
  const [secondaryCta, setSecondaryCta] = useState(data?.secondary_cta || "View Menu Highlights");
  const [address, setAddress] = useState(data?.address || "Bahjoi Road, Yashoda Chauraha, Opp. Yamaha Showroom, Sambhal");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${url}/api/content/hero`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          badge, title, description, primary_cta: primaryCta, secondary_cta: secondaryCta, address 
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Hero section saved!");
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
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E1B15]/90 via-[#2E1B15]/70 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
        <div className="max-w-2xl bg-black/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md relative shadow-2xl">
          
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="absolute -top-5 -right-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full font-bold shadow-2xl z-20 flex items-center gap-2 transition-all hover:scale-105 border border-green-400/30"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          <div className="inline-flex items-center gap-2 bg-[#ea580c]/20 backdrop-blur-md border border-[#ea580c]/50 text-white p-1 pr-2 rounded-full text-sm font-bold mb-8 shadow-lg uppercase tracking-wider group focus-within:ring-2 ring-[#ea580c]/50 transition-all">
            <div className="bg-[#ea580c] p-2 rounded-full"><Leaf size={16} className="text-white" /></div>
            <input 
              value={badge} onChange={e => setBadge(e.target.value)}
              className="bg-transparent hover:bg-white/10 focus:bg-white/20 rounded-full px-3 py-1 outline-none transition-all placeholder-white/50 w-56 font-bold"
            />
          </div>
          
          <div className="mb-6 group relative">
            <textarea 
              value={title} onChange={e => setTitle(e.target.value)}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white leading-tight drop-shadow-2xl tracking-tight bg-transparent hover:bg-white/5 focus:bg-black/60 border border-transparent hover:border-white/20 focus:border-[#ea580c] rounded-xl p-4 -ml-4 outline-none transition-all resize-y min-h-[120px] w-[calc(100%+2rem)]"
              rows={3}
            />
          </div>
          
          <div className="mb-10 group relative">
            <textarea 
              value={description} onChange={e => setDescription(e.target.value)}
              className="text-lg md:text-xl text-gray-100 font-medium leading-relaxed drop-shadow-lg bg-transparent hover:bg-white/5 focus:bg-black/60 border border-transparent hover:border-white/20 focus:border-[#ea580c] rounded-xl p-4 -ml-4 outline-none transition-all resize-y min-h-[120px] w-[calc(100%+2rem)]"
              rows={4}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="bg-[#ea580c] text-white p-1 pr-2 rounded-xl shadow-lg flex items-center gap-2 transition-all focus-within:ring-2 ring-white/50">
              <div className="bg-white/20 p-3 rounded-lg"><Navigation size={20} /></div>
              <input 
                value={primaryCta} onChange={e => setPrimaryCta(e.target.value)} 
                className="bg-transparent hover:bg-white/10 focus:bg-white/20 rounded-lg px-3 py-2 font-medium text-lg outline-none transition-all w-48 placeholder-white/70" 
              />
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm text-white border border-white/20 p-1 rounded-xl flex items-center transition-all focus-within:ring-2 ring-white/50 focus-within:bg-white/10 hover:bg-white/10">
              <input 
                value={secondaryCta} onChange={e => setSecondaryCta(e.target.value)} 
                className="bg-transparent rounded-lg px-6 py-3 font-medium text-lg outline-none transition-all w-64 placeholder-white/70 text-center" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-gray-300 text-sm border-l-4 border-[#ea580c] pl-4 group relative">
            <div className="bg-black/40 p-2 rounded-full border border-white/10">
              <MapPin size={20} className="text-[#ea580c] shrink-0" />
            </div>
            <textarea 
              value={address} onChange={e => setAddress(e.target.value)} 
              className="bg-transparent hover:bg-white/5 focus:bg-black/60 border border-transparent hover:border-white/20 focus:border-[#ea580c] rounded-lg p-3 outline-none transition-all w-full resize-none leading-relaxed" 
              rows={2}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
