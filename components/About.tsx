"use client";

import React, { useState } from "react";
import { ShieldCheck, Heart } from "lucide-react";

export default function About({ data }: { data?: any }) {
  const [title, setTitle] = useState(data?.title || "Our Story");
  const [description, setDescription] = useState(data?.description || "Gupta Bhojnalaya is a beloved dining spot in Sambhal known for delicious North Indian vegetarian food, satisfying meals, and a welcoming family atmosphere.");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${url}/api/content/about`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("About section saved!");
    } catch (err) {
      alert("Error saving: " + err);
    }
    setIsSaving(false);
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-[#fffdf9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="absolute -top-10 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-bold shadow-md z-20"
        >
          {isSaving ? "Saving..." : "Save About"}
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-t-full overflow-hidden shadow-2xl relative z-10 border-8 border-white">
              <img 
                src="dfd.png" 
                alt="Authentic Indian Thali" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative background shape */}
            <div className="absolute top-10 -left-6 w-full h-full bg-[#ea580c]/10 rounded-t-full -z-10"></div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-[#ea580c]"></span>
              <input 
                value={title} onChange={e => setTitle(e.target.value)}
                className="text-[#ea580c] font-medium tracking-wider uppercase text-sm bg-transparent border-b border-dashed border-[#ea580c] focus:outline-none w-48"
              />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3e2723] mb-6 leading-tight">
              A Local Favorite for Satisfying Family Meals
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <textarea 
                value={description} onChange={e => setDescription(e.target.value)}
                className="bg-transparent border border-dashed border-gray-400 p-2 focus:outline-none resize-y w-full rounded"
                rows={4}
              />
            </p>

            
            <blockquote className="border-l-4 border-[#ea580c] pl-6 py-2 mb-8 bg-orange-50/50 rounded-r-md">
              <p className="font-serif text-xl text-[#3e2723] italic">"Simple food, real taste, warm service."</p>
            </blockquote>

            <div className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-[#16a34a] mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-[#3e2723]">Hygienic Prep</h4>
                  <p className="text-sm text-gray-600">Fresh ingredients daily</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="text-[#ea580c] mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-[#3e2723]">Local Trust</h4>
                  <p className="text-sm text-gray-600">Loved by Sambhal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
