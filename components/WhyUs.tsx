import React from "react";
import { Leaf, Heart, MapPin, UtensilsCrossed } from "lucide-react";

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-[#fffdf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3e2723] mb-6">Why Diners Choose Us</h2>
            <p className="text-gray-600 text-lg mb-8">
              We believe in providing more than just food. At Gupta Bhojnalaya, we offer a complete dining experience built on trust, taste, and tradition.
            </p>
            <div className="hidden lg:block w-full h-64 bg-gray-200 rounded-sm overflow-hidden">
               <img src="ee.jpeg" alt="Restaurant Ambiance" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {[
              { title: "Pure Vegetarian", desc: "100% veg kitchen ensuring complete purity and peace of mind.", icon: <Leaf className="text-[#16a34a]" /> },
              { title: "Family-Friendly", desc: "Comfortable seating and a warm atmosphere perfect for family outings.", icon: <Heart className="text-[#ea580c]" /> },
              { title: "Convenient Location", desc: "Easy to find at Yashoda Chauraha with nearby parking availability.", icon: <MapPin className="text-[#b87333]" /> },
              { title: "Freshly Prepared", desc: "Meals cooked to order using quality spices and fresh produce.", icon: <UtensilsCrossed className="text-[#3e2723]" /> }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-white border border-gray-100 shadow-sm rounded-sm hover:border-[#ea580c]/30 transition-colors">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-[#3e2723] text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
