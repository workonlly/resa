import React from "react";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

export default function VisitUs() {
  return (
    <section id="visit-us" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Contact Info Side */}
          <div className="lg:w-1/3 bg-[#3e2723] text-white p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-serif font-bold mb-8">Visit Us</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#ea580c] mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-lg mb-1">Address</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Bahjoi Road, Yashoda Chauraha,<br/>
                    Opp. Yamaha Showroom,<br/>
                    Sambhal, Uttar Pradesh 244302
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-[#ea580c] mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-lg mb-1">Timings</h4>
                  <p className="text-gray-300 text-sm">Open Daily</p>
                  <p className="text-gray-300 font-medium">11:00 AM - 12:00 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-[#ea580c] mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-lg mb-1">Contact</h4>
                  <p className="text-gray-300 text-sm">Call us for orders & reservations</p>
                  <a href="tel:+919837091490" className="text-white font-medium hover:text-[#ea580c] transition-colors inline-block mt-1">
                    +91 9837091490
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a 
                href="https://maps.google.com/?q=Gupta+Bhojnalaya+Sambhal+Uttar+Pradesh" 
                target="_blank"
                rel="noreferrer"
                className="bg-[#ea580c] text-white w-full py-3 rounded-sm font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation size={18} /> Open in Google Maps
              </a>
            </div>
          </div>

          {/* Map Side (Placeholder using iframe) */}
          <div className="lg:w-2/3 h-[400px] lg:h-auto bg-gray-200 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112344.60623694086!2d78.47141515!3d28.5910398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b213b2c262c5b%3A0xcab3b1e39a3f2b1a!2sSambhal%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Gupta Bhojnalaya Location Map"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
