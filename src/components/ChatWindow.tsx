"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Image, Smile, Phone, Video, Info } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import GlassCard from "./GlassCard";

interface Message {
  id: number;
  senderId: number;
  text: string;
  time: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, senderId: 2, text: "Hey! Loved your profile. You really like dark roast?", time: "10:30 AM" },
    { id: 2, senderId: 1, text: "Haha yes! It's the only way to start the day. ☕️", time: "10:32 AM" },
    { id: 3, senderId: 2, text: "I know a great place called 'The Neon Grind'. Want to check it out?", time: "10:35 AM" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      senderId: 1,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <GlassCard className="flex flex-col h-[700px] !p-0 overflow-hidden border-pink-500/10">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src="/profile-man-1.png" alt="Mark" className="w-12 h-12 rounded-full object-cover border-2 border-pink-500" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
          </div>
          <div>
            <h3 className="font-black text-white">Mark Wilson</h3>
            <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Online Now</p>
          </div>
        </div>
        <div className="flex gap-4">
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-pink-500 transition-colors"><Phone size={18} /></button>
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-pink-500 transition-colors"><Video size={18} /></button>
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-pink-500 transition-colors"><Info size={18} /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
        style={{ background: "radial-gradient(circle at top right, rgba(255,0,127,0.05), transparent)" }}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.senderId === 1 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.senderId === 1 ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[70%] group`}>
              <div 
                className={`p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                  msg.senderId === 1 
                    ? "bg-pink-500 text-white rounded-br-none shadow-neon" 
                    : "bg-white/5 text-white/90 border border-white/10 rounded-bl-none backdrop-blur-md"
                }`}
              >
                {msg.text}
              </div>
              <p className={`text-[10px] mt-1 text-white/30 uppercase font-bold ${msg.senderId === 1 ? "text-right" : "text-left"}`}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/2 border-t border-white/5">
         <div className="relative flex items-center gap-4">
            <button className="text-white/40 hover:text-pink-500 transition-colors"><Smile size={24} /></button>
            <button className="text-white/40 hover:text-pink-500 transition-colors"><Image size={24} /></button>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-all"
            />
            <button 
              onClick={handleSend}
              className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-neon hover:scale-110 transition-transform active:scale-95"
            >
               <Send size={20} />
            </button>
         </div>
      </div>
    </GlassCard>
  );
}
