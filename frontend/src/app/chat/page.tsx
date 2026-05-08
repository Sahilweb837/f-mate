"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Image as ImageIcon, Smile, Phone, Video, Info, Search, MoreVertical, Coffee, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";

export default function ChatPage() {
  const router = useRouter();
  const [activeChat, setActiveChat] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
       router.push('/login');
       return;
    }
    setIsLoggedIn(true);

    const fetchChats = async () => {
      try {
        // In a real app, this would be /api/chats
        // For now, we fetch matches which can be chatted with
        const res = await api.get('/discover');
        setChats(res.data);
        if (res.data.length > 0) setActiveChat(res.data[0]);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  if (!isLoggedIn || loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
       <Loader2 size={40} className="animate-spin" color="var(--pink-primary)" />
    </div>
  );

  return (
    <main style={{ background: "var(--bg-deep)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <div style={{ flex: 1, maxWidth: "1500px", margin: "100px auto 20px", width: "100%", padding: "0 1.5rem", display: "flex", gap: "1px", background: "rgba(255,255,255,0.02)", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", height: 'calc(100vh - 140px)' }} className="chat-container">
        
        {/* Sidebar */}
        <div style={{ width: "400px", background: "var(--bg-surface)", borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column" }} className="chat-sidebar">
           <div style={{ padding: "2.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <h2 className="font-playfair" style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem" }}>Messages</h2>
              <div style={{ position: "relative" }}>
                 <Search size={18} style={{ position: "absolute", left: "1.2rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
                 <input 
                   type="text" 
                   placeholder="Search matches..." 
                   style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1rem 1rem 1rem 3.5rem", color: "white", outline: "none", fontSize: '0.95rem' }}
                 />
              </div>
           </div>

           <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
              {chats.map(chat => (
                <div 
                  key={chat.id} 
                  onClick={() => setActiveChat(chat)}
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "1.25rem", 
                    padding: "1.25rem", 
                    borderRadius: "20px", 
                    cursor: "pointer",
                    background: activeChat?.id === chat.id ? "rgba(255,45,149,0.1)" : "transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    marginBottom: '0.5rem'
                  }}
                >
                   <div style={{ position: "relative" }}>
                      <img src={chat.photos?.[0]?.photo_url || "/profile-1.png"} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: activeChat?.id === chat.id ? '2px solid var(--pink-primary)' : '2px solid transparent' }} alt={chat.name} />
                      <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "14px", height: "14px", background: "#2ecc71", borderRadius: "50%", border: "3px solid var(--bg-surface)" }} />
                   </div>
                   <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                         <span style={{ fontWeight: 800, fontSize: "1.05rem" }}>{chat.name}</span>
                         <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>2m ago</span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: activeChat?.id === chat.id ? "var(--pink-light)" : "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>
                        Hey! How are you doing? ☕
                      </p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Chat Area */}
        {activeChat ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg-deep)" }}>
               
               {/* Chat Header */}
               <div style={{ padding: "1.25rem 2.5rem", background: "var(--bg-surface)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                     <img src={activeChat.photos?.[0]?.photo_url || "/profile-1.png"} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }} alt={activeChat.name} />
                     <div>
                        <div style={{ fontWeight: 900, fontSize: "1.25rem" }}>{activeChat.name}</div>
                        <div style={{ fontSize: "0.85rem", color: "#2ecc71", display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                           <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2ecc71' }} /> Active Now
                        </div>
                     </div>
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem", color: "var(--text-muted)" }}>
                     <motion.div whileHover={{ color: 'var(--pink-primary)' }} style={{ cursor: "pointer" }}><Phone size={22} /></motion.div>
                     <motion.div whileHover={{ color: 'var(--pink-primary)' }} style={{ cursor: "pointer" }}><Video size={22} /></motion.div>
                     <motion.div whileHover={{ color: 'var(--pink-primary)' }} style={{ cursor: "pointer" }}><Info size={22} /></motion.div>
                  </div>
               </div>

               {/* Messages Container */}
               <div style={{ flex: 1, padding: "2.5rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <div style={{ alignSelf: "flex-start", maxWidth: "70%" }}>
                     <div style={{ background: "rgba(255,255,255,0.05)", padding: "1.25rem 1.5rem", borderRadius: "24px 24px 24px 8px", border: "1px solid rgba(255,255,255,0.08)", color: "white", fontSize: "1rem", lineHeight: 1.5 }}>
                        Hey! I just saw your profile. I love that you're a Latte enthusiast! ☕
                     </div>
                     <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.6rem", display: "block" }}>12:45 PM</span>
                  </div>

                  <div style={{ alignSelf: "flex-end", maxWidth: "70%" }}>
                     <div style={{ background: "var(--grad-primary)", padding: "1.25rem 1.5rem", borderRadius: "24px 24px 8px 24px", color: "white", fontSize: "1rem", lineHeight: 1.5, boxShadow: "0 10px 30px rgba(255,45,149,0.3)" }}>
                        Haha yes! It's an addiction. Have you tried the new roastery in Bandra?
                     </div>
                     <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.6rem", display: "block", textAlign: "right" }}>12:47 PM</span>
                  </div>
               </div>

               {/* Input Area */}
               <div style={{ padding: "2rem 2.5rem", background: "var(--bg-surface)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", border: '1px solid rgba(255,255,255,0.1)', borderRadius: "20px", padding: "0.6rem 0.6rem 0.6rem 1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
                     <div style={{ display: "flex", gap: "1.25rem", color: "var(--text-dim)" }}>
                        <ImageIcon size={22} style={{ cursor: "pointer" }} />
                        <Smile size={22} style={{ cursor: "pointer" }} />
                     </div>
                     <input 
                       type="text" 
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       placeholder="Message your match..." 
                       style={{ flex: 1, background: "transparent", border: "none", color: "white", outline: "none", fontSize: "1rem" }}
                     />
                     <motion.button 
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       style={{ width: "50px", height: "50px", borderRadius: "14px", background: "var(--grad-primary)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer", boxShadow: "var(--shadow-neon)" }}
                     >
                        <Send size={22} />
                     </motion.button>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
                     <button style={{ background: "transparent", border: "none", color: "var(--pink-primary)", fontSize: "0.85rem", fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                       <Coffee size={16} /> Send a Coffee Invite
                     </button>
                  </div>
               </div>
            </div>
        ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-dim)' }}>
               <Search size={80} strokeWidth={1} />
               <p style={{ fontSize: '1.2rem' }}>Select a match to start chatting</p>
            </div>
        )}

      </div>

      <style jsx>{`
        @media (max-width: 992px) {
           .chat-sidebar {
              width: 100px !important;
           }
           .chat-sidebar span, .chat-sidebar p, .chat-sidebar h2, .chat-sidebar input, .chat-sidebar svg:first-child {
              display: none !important;
           }
           .chat-sidebar > div:first-child {
              padding: 1.5rem 0 !important;
              display: flex;
              justify-content: center;
           }
           .chat-sidebar > div:last-child {
              padding: 0.5rem !important;
           }
        }
      `}</style>
    </main>
  );
}
