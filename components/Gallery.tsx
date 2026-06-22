"use client";

import React, { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Trash2, Upload } from "lucide-react";

export default function Gallery({ data }: { data?: any }) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: false })
  ]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, images]);

  const fetchGallery = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${url}/api/gallery`, { cache: 'no-store' });
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${url}/api/gallery`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload image");
      await fetchGallery();
    } catch (err) {
      alert("Error uploading image: " + err);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${url}/api/gallery/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete image");
      await fetchGallery();
    } catch (err) {
      alert("Error deleting image: " + err);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#fffdf9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3e2723] mb-4">
            {data?.title || "Gallery"}
          </h2>
          <p className="text-gray-600">
            {data?.subtitle || "Manage images in your gallery."}
          </p>
          
          <div className="mt-6 flex justify-center">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-[#ea580c] hover:bg-[#c24100] text-white px-6 py-2 rounded font-bold shadow-md flex items-center gap-2 transition-colors"
            >
              <Upload size={18} />
              {uploading ? "Uploading..." : "Upload New Image"}
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading gallery...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No images in the gallery yet.</div>
      ) : (
        <div className="embla w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="embla__container flex">
            {[...images, ...images, ...images, ...images].map((img, idx) => (
              <div 
                className="embla__slide flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0 pl-4 relative group" 
                key={`${img.id}-${idx}`}
              >
                <div className="h-[250px] md:h-[300px] rounded-sm overflow-hidden shadow-sm relative">
                  <img 
                    src={img.imageurl} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="Gallery item"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => handleDelete(img.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all"
                      title="Delete Image"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
