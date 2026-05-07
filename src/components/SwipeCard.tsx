"use client";

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Heart, X, Star } from "lucide-react";
import React, { useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  photo: string;
  compatibility?: number;
}

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right" | "up") => void;
}

export default function SwipeCard({ profile, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);
  const superOpacity = useTransform(y, [-50, -150], [0, 1]);

  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: any) => {
    if (info.offset.x > 150) {
      await controls.start({ x: 500, opacity: 0 });
      onSwipe("right");
    } else if (info.offset.x < -150) {
      await controls.start({ x: -500, opacity: 0 });
      onSwipe("left");
    } else if (info.offset.y < -150) {
      await controls.start({ y: -500, opacity: 0 });
      onSwipe("up");
    } else {
      controls.start({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={{ x, y, rotate, opacity, position: "absolute", cursor: "grab" }}
      animate={controls}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className="w-full max-w-sm aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl touch-none"
    >
      <div className="relative w-full h-full group">
        <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Indicators */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-20deg]">
          <span className="text-green-500 font-black text-4xl uppercase">LIKE</span>
        </motion.div>
        
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[20deg]">
          <span className="text-red-500 font-black text-4xl uppercase">NOPE</span>
        </motion.div>

        <motion.div style={{ opacity: superOpacity }} className="absolute bottom-40 left-1/2 -translate-x-1/2 border-4 border-blue-400 rounded-lg px-4 py-2">
          <span className="text-blue-400 font-black text-4xl uppercase">SUPER</span>
        </motion.div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h3 className="text-3xl font-black text-white flex items-center gap-2">
                {profile.name}, {profile.age}
                {profile.compatibility && (
                   <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full border border-pink-500/30 backdrop-blur-sm">
                     {profile.compatibility}% Match
                   </span>
                )}
              </h3>
              <p className="text-white/70 line-clamp-2 mt-2">{profile.bio}</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
             <button onClick={() => onSwipe("left")} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-red-500 hover:scale-110 transition-transform">
                <X size={28} />
             </button>
             <button onClick={() => onSwipe("up")} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-blue-400 hover:scale-110 transition-transform">
                <Star size={28} fill="currentColor" />
             </button>
             <button onClick={() => onSwipe("right")} className="w-14 h-14 rounded-full bg-pink-500 shadow-neon flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Heart size={28} fill="currentColor" />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
