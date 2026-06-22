"use client";

import React, { useState } from "react";
import { Star, Heart, MapPin, Clock } from "lucide-react";

export default function Reviews({ data }: { data?: any }) {
  const [title, setTitle] = useState(data?.title || "Trusted by Sambhal");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "A consistent ~4.0 Rating by our local patrons");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${url}/api/content/reviews`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Reviews section saved!");
    } catch (err) {
      alert("Error saving: " + err);
    }
    setIsSaving(false);
  };

  return (
    <section id="reviews" className="py-20 bg-[#2E1B15] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="absolute -top-10 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-bold shadow-md z-20"
        >
          {isSaving ? "Saving..." : "Save Reviews"}
        </button>

        <div className="text-center mb-16 flex flex-col items-center">
          <input 
            value={title} onChange={e => setTitle(e.target.value)}
            className="text-3xl md:text-5xl font-serif font-bold mb-4 bg-transparent border-b border-dashed border-gray-400 focus:outline-none text-center w-full max-w-2xl text-white"
          />
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(4)].map((_, i) => <Star key={i} fill="#ea580c" className="text-[#ea580c]" size={24} />)}
            <Star fill="#ea580c" className="text-[#ea580c] opacity-50" size={24} />
          </div>
          <input 
            value={subtitle} onChange={e => setSubtitle(e.target.value)}
            className="text-gray-300 bg-transparent border-b border-dashed border-gray-400 focus:outline-none text-center w-full max-w-lg"
          />
        </div>


        <div className="mt-16 bg-[#ea580c] py-6 px-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
           <div className="flex items-center gap-3">
             <Heart size={24} className="text-white" />
             <span className="font-bold text-lg">Loved by local customers</span>
           </div>
           <div className="hidden md:block w-px h-8 bg-white/30"></div>
           <div className="flex items-center gap-3">
             <MapPin size={24} className="text-white" />
             <span className="font-medium text-white/90">Conveniently located near Yashoda Chauraha</span>
           </div>
           <div className="hidden md:block w-px h-8 bg-white/30"></div>
           <div className="flex items-center gap-3">
             <Clock size={24} className="text-white" />
             <span className="font-medium text-white/90">Open Daily: 11 AM - 12 AM</span>
           </div>
        </div>
      </div>
    </section>
  );
}
