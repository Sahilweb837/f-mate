"use client";

import { motion } from "framer-motion";
import { Users, Heart, Coffee, AlertTriangle, TrendingUp, BarChart3, Settings } from "lucide-react";
import React from "react";
import GlassCard from "@/components/GlassCard";
import Navbar from "@/components/Navbar";

const stats = [
  { label: "Total Users", value: "12,450", icon: Users, color: "text-blue-400" },
  { label: "Active Matches", value: "8,920", icon: Heart, color: "text-pink-500" },
  { label: "Coffee Invites", value: "1,240", icon: Coffee, color: "text-yellow-400" },
  { label: "AI Flags", value: "14", icon: AlertTriangle, color: "text-red-500" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black mb-2">Admin Panel</h1>
            <p className="text-white/50 uppercase tracking-widest text-xs font-bold">Platform Analytics & Management</p>
          </div>
          <div className="flex gap-4">
             <button className="glass px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/5 transition-colors">
                <BarChart3 size={18} /> Reports
             </button>
             <button className="btn-primary">
                <Settings size={18} /> Settings
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <GlassCard key={i} delay={i * 0.1}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-black">{stat.value}</h3>
                  <div className="flex items-center gap-1 text-green-400 text-xs font-bold mt-2">
                    <TrendingUp size={14} /> +12% this week
                  </div>
                </div>
                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Activity Feed */}
          <GlassCard className="lg:col-span-2">
             <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                Recent Signups
             </h3>
             <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((u) => (
                  <div key={u} className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center font-bold text-pink-500">U</div>
                       <div>
                          <p className="font-bold text-sm">User {u}</p>
                          <p className="text-[10px] text-white/40">user{u}@example.com</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold uppercase">Active</span>
                       <button className="text-white/20 hover:text-white"><MoreHorizontal size={18} /></button>
                    </div>
                  </div>
                ))}
             </div>
          </GlassCard>

          {/* AI Moderation Flags */}
          <GlassCard>
             <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-red-400">
                AI Moderation
             </h3>
             <div className="space-y-4">
                {[1, 2].map((flag) => (
                  <div key={flag} className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs mb-2">
                       <AlertTriangle size={14} /> High Severity
                    </div>
                    <p className="text-sm text-white/80 mb-2">Potential offensive content detected in User {flag}'s bio.</p>
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 rounded-lg bg-red-500 text-white text-xs font-bold">Block</button>
                       <button className="flex-1 py-2 rounded-lg bg-white/10 text-white text-xs font-bold">Ignore</button>
                    </div>
                  </div>
                ))}
             </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}

function MoreHorizontal({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    )
}
