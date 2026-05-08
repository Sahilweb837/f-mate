"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import React from "react";
import GlassCard from "./GlassCard";

const mockPosts = [
  {
    id: 1,
    user: { name: "Sarah J.", photo: "/profile-woman-1.png" },
    content: "Just found this amazing coffee spot! Anyone want to join me next time? ☕✨",
    image: "/coffee-shop-post.png",
    likes: 124,
    comments: 12,
    time: "2h ago",
  },
  {
    id: 2,
    user: { name: "Mark Wilson", photo: "/profile-man-1.png" },
    content: "Finally hit 5 matches today! CupDate is definitely working for me. 🙌",
    image: null,
    likes: 85,
    comments: 5,
    time: "5h ago",
  },
];

export default function SocialFeed() {
  return (
    <div className="max-w-xl mx-auto space-y-8 py-10">
      {/* Stories Bar */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
           <div className="w-16 h-16 rounded-full border-2 border-dashed border-pink-500/50 flex items-center justify-center p-1 cursor-pointer">
              <div className="w-full h-full bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">+</div>
           </div>
           <span className="text-[10px] text-white/50 font-bold uppercase">Your Story</span>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full border-2 border-pink-500 p-1 cursor-pointer hover:scale-105 transition-transform">
              <img src={`/profile-woman-${i}.png`} alt="Story" className="w-full h-full rounded-full object-cover" />
            </div>
            <span className="text-[10px] text-white/70 font-bold">User {i}</span>
          </div>
        ))}
      </div>

      {/* Posts */}
      {mockPosts.map((post) => (
        <GlassCard key={post.id} className="!p-0 overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={post.user.photo} alt={post.user.name} className="w-10 h-10 rounded-full object-cover border border-pink-500/30" />
              <div>
                <h4 className="text-sm font-bold text-white">{post.user.name}</h4>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">{post.time}</p>
              </div>
            </div>
            <button className="text-white/40 hover:text-white"><MoreHorizontal size={20} /></button>
          </div>

          <div className="px-4 pb-3">
             <p className="text-sm text-white/90 leading-relaxed">{post.content}</p>
          </div>

          {post.image && (
            <div className="w-full aspect-video bg-gray-900">
               <img src={post.image} alt="Post" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-4 flex items-center justify-between border-t border-white/5">
             <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-white/60 hover:text-pink-500 transition-colors">
                   <Heart size={20} />
                   <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-white/60 hover:text-pink-500 transition-colors">
                   <MessageCircle size={20} />
                   <span className="text-xs font-bold">{post.comments}</span>
                </button>
             </div>
             <button className="text-white/60 hover:text-pink-500">
                <Share2 size={20} />
             </button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
