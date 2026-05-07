"use client";

import { motion } from "framer-motion";
import { Coffee, MapPin, Star, Plus, ArrowRight } from "lucide-react";
import React from "react";
import GlassCard from "./GlassCard";

const mockVenues = [
  {
    id: 1,
    name: "The Neon Grind",
    address: "123 Pink Avenue, Cybercity",
    rating: 4.8,
    image: "/venue-1.png",
    type: "Coffee & Lounge",
  },
  {
    id: 2,
    name: "Dark Roast Studio",
    address: "456 Midnight Street, Cybercity",
    rating: 4.9,
    image: "/venue-2.png",
    type: "Classic Espresso",
  },
];

export default function VenueManager() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black">Date Venues</h2>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Managed Coffee Shops</p>
        </div>
        <button className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-neon hover:scale-110 transition-transform">
           <Plus color="white" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockVenues.map((venue, i) => (
          <GlassCard key={venue.id} delay={i * 0.1} className="!p-0 overflow-hidden group">
             <div className="relative h-48 overflow-hidden">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                   <Star size={14} className="text-yellow-400 fill-yellow-400" />
                   <span className="text-xs font-bold">{venue.rating}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                   <span className="text-[10px] bg-pink-500 px-2 py-1 rounded-md font-black uppercase">{venue.type}</span>
                </div>
             </div>
             
             <div className="p-6">
                <h3 className="text-xl font-black mb-1">{venue.name}</h3>
                <div className="flex items-center gap-2 text-white/50 text-xs mb-4">
                   <MapPin size={14} />
                   {venue.address}
                </div>
                
                <div className="flex gap-2">
                   <button className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-colors">
                      Edit Details
                   </button>
                   <button className="flex-1 py-3 rounded-xl bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 text-xs font-bold transition-colors flex items-center justify-center gap-2">
                      Send Invite <ArrowRight size={14} />
                   </button>
                </div>
             </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
