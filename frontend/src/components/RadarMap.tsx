"use client";

import { motion } from "framer-motion";
import { MapPin, User } from "lucide-react";
import React from "react";

const mockUsers = [
  { id: 1, x: 20, y: 30, photo: "/profile-woman-1.png" },
  { id: 2, x: 70, y: 40, photo: "/profile-man-1.png" },
  { id: 3, x: 40, y: 80, photo: "/profile-woman-2.png" },
  { id: 4, x: 80, y: 70, photo: "/profile-man-2.png" },
];

export default function RadarMap() {
  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto bg-black/40 rounded-full border border-white/5 overflow-hidden flex items-center justify-center">
      {/* Radar Pulse Rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: ring * 1.3,
            ease: "easeOut",
          }}
          className="absolute border border-pink-500/30 rounded-full"
          style={{ width: "100%", height: "100%" }}
        />
      ))}

      {/* Sweeping Line */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute w-1/2 h-1 bg-gradient-to-r from-pink-500/50 to-transparent origin-left left-1/2"
      />

      {/* Center Marker (Current User) */}
      <div className="z-10 relative">
        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-neon">
          <MapPin color="white" size={24} />
        </div>
        <div className="absolute -inset-4 bg-pink-500/20 rounded-full animate-pulse" />
      </div>

      {/* Detected Users */}
      {mockUsers.map((u) => (
        <motion.div
          key={u.id}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute"
          style={{ left: `${u.x}%`, top: `${u.y}%` }}
        >
          <div className="group relative">
             <div className="w-10 h-10 rounded-full border-2 border-pink-500/50 overflow-hidden bg-gray-900 shadow-lg group-hover:scale-125 transition-transform cursor-pointer">
                <img src={u.photo} alt="Nearby" className="w-full h-full object-cover" />
             </div>
             <div className="absolute top-0 left-0 w-full h-full bg-pink-500/20 rounded-full animate-ping opacity-75" />
             
             {/* Tooltip */}
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-xs font-bold">
                2.5 km away
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
