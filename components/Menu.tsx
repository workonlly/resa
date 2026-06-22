"use client";

import React, { useState, useEffect } from "react";
import { UtensilsCrossed, Pizza, Plus, Save } from "lucide-react";

export default function FullMenu() {
  const [activeTab, setActiveTab] = useState<"indian" | "snacks">("indian");
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMenu() {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${url}/api/menu`, { cache: 'no-store' });
      const data = await res.json();
      setMenuData(data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  const indianTypes = ['Main Course Veg', 'Bahar-e-Paneer', 'Mushroom', 'Gravy Chaap', 'Thela Biryani', 'Rice & Combos', 'Tandoori Breads', 'Thali Special', 'Salad / Raita / Papad'];

  const grouped = menuData.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = {
        titleEn: item.type,
        titleHi: item.type,
        items: []
      };
    }
    
    let priceStr = '';
    if (item.half_price !== null && item.full_price !== null) {
      priceStr = `${item.half_price}/${item.full_price}`;
    } else if (item.half_price !== null) {
      priceStr = `${item.half_price}`;
    } else if (item.full_price !== null) {
      priceStr = `${item.full_price}`;
    }
    
    acc[item.type].items.push({
      id: item.id,
      nameEn: item.item_en,
      nameHi: item.item_hn,
      halfPrice: item.half_price,
      fullPrice: item.full_price,
      price: priceStr
    });
    return acc;
  }, {});

  const indianMenuData: any[] = [];
  const snacksMenuData: any[] = [];

  const titleHiMap: Record<string, string> = {
    'Main Course Veg': 'खाना खज़ाना',
    'Bahar-e-Paneer': 'बहार-ए-पनीर',
    'Mushroom': 'मशरूम',
    'Gravy Chaap': 'ग्रेवी चाप',
    'Thela Biryani': 'ठेला बिरयानी',
    'Rice & Combos': 'चावल और कॉम्बो',
    'Tandoori Breads': 'तन्दूरी रोटी',
    'Thali Special': 'थाली स्पेशल',
    'Salad / Raita / Papad': 'सलाद / रायता / पापड़',
    'Desserts': 'मिठाइयां',
    'South Indian': 'साउथ इंडियन',
    'Chinese Starters / Noodles': 'चाइनीज / नूडल्स',
    'Tandoori Snacks / Rolls': 'तन्दूरी स्नैक्स / रोल्स',
    'Pizza & Pasta': 'पिज़्ज़ा और पास्ता',
    'Quick Bites & Burgers': 'क्विक बाइट्स',
    'Momos & Chaat': 'मोमोस और चाट',
    'Soups & Sizzlers': 'सूप',
    'Shakes, Drinks & Mocktails': 'ड्रिंक्स',
    'Tandoori Parathas / Kulcha': 'तन्दूरी पराठे / कुल्चा'
  };

  Object.values(grouped).forEach((cat: any) => {
    cat.titleHi = titleHiMap[cat.titleEn] || cat.titleEn;
    if (indianTypes.includes(cat.titleEn)) {
      indianMenuData.push(cat);
    } else {
      snacksMenuData.push(cat);
    }
  });

  return (
    <div className="bg-[#fffdf9] font-sans text-[#3e2723] pb-20 pt-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-10 border-b border-gray-200 pb-1">
          <button 
            onClick={() => setActiveTab("indian")}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-lg transition-colors border-b-4 ${activeTab === "indian" ? "border-[#ea580c] text-[#ea580c]" : "border-transparent text-gray-500 hover:text-[#ea580c]"}`}
          >
            <UtensilsCrossed size={20} />
            Main Course & Thali
          </button>
          <button 
            onClick={() => setActiveTab("snacks")}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-lg transition-colors border-b-4 ${activeTab === "snacks" ? "border-[#ea580c] text-[#ea580c]" : "border-transparent text-gray-500 hover:text-[#ea580c]"}`}
          >
            <Pizza size={20} />
            Snacks, Chinese & South Indian
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">Loading amazing dishes...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {activeTab === "indian" 
              ? indianMenuData.map((category, idx) => <MenuCategory key={idx} category={category} refreshMenu={fetchMenu} />)
              : snacksMenuData.map((category, idx) => <MenuCategory key={idx} category={category} refreshMenu={fetchMenu} />)
            }
          </div>
        )}

        <div className="mt-16 text-center text-sm font-medium text-gray-500 bg-gray-100 py-4 rounded-md">
          <p>5% GST EXTRA • All prices are in INR (₹)</p>
          <p>Format: Half Price / Full Price (Where applicable)</p>
        </div>
      </main>
    </div>
  );
}

// --- Reusable Component for a Menu Category ---
const MenuCategory = ({ category, refreshMenu }: { category: any, refreshMenu: () => void }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ nameEn: '', nameHi: '', halfPrice: '', fullPrice: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleAddItem = async () => {
    setIsSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const payload = {
        item_en: newItem.nameEn,
        item_hn: newItem.nameHi,
        half_price: newItem.halfPrice ? parseInt(newItem.halfPrice) : null,
        full_price: newItem.fullPrice ? parseInt(newItem.fullPrice) : null,
        type: category.titleEn
      };
      
      const res = await fetch(`${url}/api/menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to add item");
      
      setIsAdding(false);
      setNewItem({ nameEn: '', nameHi: '', halfPrice: '', fullPrice: '' });
      refreshMenu();
    } catch (err) {
      alert("Error adding item: " + err);
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
      <div className="flex flex-col mb-4 pb-2 border-b-2 border-[#ea580c]/20">
        <h2 className="text-2xl font-serif font-bold text-[#ea580c]">{category.titleEn}</h2>
        <h3 className="text-xl font-bold text-gray-700">{category.titleHi}</h3>
      </div>
      <ul className="space-y-3">
        {category.items.map((item: any) => (
          <MenuItemEdit key={item.id} item={item} refreshMenu={refreshMenu} />
        ))}
      </ul>
      
      {isAdding ? (
        <div className="mt-6 p-4 border border-dashed border-[#ea580c] rounded-md bg-orange-50/50">
          <h4 className="text-sm font-bold text-[#ea580c] mb-3">Add New Item</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input placeholder="English Name" value={newItem.nameEn} onChange={e => setNewItem({...newItem, nameEn: e.target.value})} className="border p-2 rounded text-sm w-full" />
            <input placeholder="Hindi Name" value={newItem.nameHi} onChange={e => setNewItem({...newItem, nameHi: e.target.value})} className="border p-2 rounded text-sm w-full" />
            <input placeholder="Half Price (Number or empty)" value={newItem.halfPrice} onChange={e => setNewItem({...newItem, halfPrice: e.target.value})} type="number" className="border p-2 rounded text-sm w-full" />
            <input placeholder="Full Price (Number or empty)" value={newItem.fullPrice} onChange={e => setNewItem({...newItem, fullPrice: e.target.value})} type="number" className="border p-2 rounded text-sm w-full" />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
            <button onClick={handleAddItem} disabled={isSaving} className="px-3 py-1.5 text-sm bg-[#ea580c] text-white font-medium rounded hover:bg-[#c24100] flex items-center gap-1">
              {isSaving ? "Saving..." : <><Save size={14}/> Save</>}
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="mt-6 w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 border border-dashed border-gray-300 rounded hover:bg-gray-50 hover:text-[#ea580c] hover:border-[#ea580c] transition-colors"
        >
          <Plus size={16} /> Add Item to {category.titleEn}
        </button>
      )}
    </div>
  );
};

const MenuItemEdit = ({ item, refreshMenu }: { item: any, refreshMenu: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState({ 
    nameEn: item.nameEn || '', 
    nameHi: item.nameHi || '', 
    halfPrice: item.halfPrice?.toString() || '', 
    fullPrice: item.fullPrice?.toString() || '' 
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const payload = {
        item_en: editItem.nameEn,
        item_hn: editItem.nameHi,
        half_price: editItem.halfPrice ? parseInt(editItem.halfPrice) : null,
        full_price: editItem.fullPrice ? parseInt(editItem.fullPrice) : null,
      };
      
      const res = await fetch(`${url}/api/menu/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to update item");
      
      setIsEditing(false);
      refreshMenu();
    } catch (err) {
      alert("Error updating item: " + err);
    }
    setIsSaving(false);
  };

  if (isEditing) {
    return (
      <li className="border border-gray-200 p-3 rounded-md bg-gray-50/80 mb-2 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-1">English Name</label>
            <input value={editItem.nameEn} onChange={e => setEditItem({...editItem, nameEn: e.target.value})} className="border border-gray-300 p-1.5 rounded text-sm w-full bg-white focus:outline-none focus:border-[#ea580c]" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Hindi Name</label>
            <input value={editItem.nameHi} onChange={e => setEditItem({...editItem, nameHi: e.target.value})} className="border border-gray-300 p-1.5 rounded text-sm w-full bg-white focus:outline-none focus:border-[#ea580c]" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Half Price (₹)</label>
            <input type="number" value={editItem.halfPrice} onChange={e => setEditItem({...editItem, halfPrice: e.target.value})} className="border border-gray-300 p-1.5 rounded text-sm w-full bg-white focus:outline-none focus:border-[#ea580c]" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Full Price (₹)</label>
            <input type="number" value={editItem.fullPrice} onChange={e => setEditItem({...editItem, fullPrice: e.target.value})} className="border border-gray-300 p-1.5 rounded text-sm w-full bg-white focus:outline-none focus:border-[#ea580c]" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={isSaving} className="px-3 py-1.5 text-xs bg-green-600 text-white font-medium rounded hover:bg-green-700 flex items-center gap-1 shadow-sm transition-colors">
            {isSaving ? "Saving..." : <><Save size={14}/> Save Changes</>}
          </button>
        </div>
      </li>
    );
  }

  const hasHalfFull = item.price && item.price.includes('/');
  const [halfPrice, fullPrice] = hasHalfFull ? item.price.split('/') : [null, item.price];

  return (
    <li className="group flex justify-between items-start border-b border-gray-50 pb-2 last:border-0 last:pb-0 relative hover:bg-gray-50 p-2 -mx-2 rounded transition-colors cursor-pointer" onClick={() => setIsEditing(true)}>
      <div className="flex flex-col flex-1 pr-4">
        <span className="font-semibold text-gray-800 text-[15px] group-hover:text-[#ea580c] transition-colors">{item.nameEn}</span>
        <span className="text-gray-600 text-sm">{item.nameHi}</span>
      </div>
      <div className="flex flex-col items-end min-w-[80px] shrink-0">
        {hasHalfFull ? (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-none mb-1">Half</span>
              <span className="font-bold text-[#204a44] leading-none">₹{halfPrice?.trim()}</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#ea580c] uppercase font-bold tracking-widest leading-none mb-1">Full</span>
              <span className="font-bold text-[#ea580c] leading-none">₹{fullPrice?.trim()}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end justify-center h-full pt-1">
            <span className="font-bold text-[#ea580c] text-base">
              {fullPrice && fullPrice.toUpperCase() === 'MRP' ? 'MRP' : (fullPrice ? `₹${fullPrice.trim()}` : '')}
            </span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded pointer-events-none">
        <span className="bg-white px-3 py-1 text-xs font-bold text-[#ea580c] rounded shadow-sm border border-[#ea580c]/20">Click to Edit</span>
      </div>
    </li>
  );
};