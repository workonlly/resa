import React from "react";
import { Phone, MapPin } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-16 bg-[#ea580c]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
          Planning lunch or dinner today?
        </h2>
        <p className="text-orange-100 text-lg mb-8 font-medium">
          Visit Gupta Bhojnalaya for fresh, authentic veg food and a warm dining experience in Sambhal.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="tel:+910000000000" className="bg-white text-[#ea580c] px-8 py-3 rounded-sm font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Phone size={20} /> Call Now
          </a>
          <a href="https://maps.google.com/?q=Gupta+Bhojnalaya+Sambhal+Uttar+Pradesh" target="_blank" rel="noreferrer" className="bg-[#3e2723] text-white px-8 py-3 rounded-sm font-bold shadow-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
            <MapPin size={20} /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
