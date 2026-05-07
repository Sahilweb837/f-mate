"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Video, Mic, PhoneOff, MoreVertical, Heart, Coffee, Shield, MicOff, VideoOff, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function VideoCallPreview() {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section style={{ padding: "100px 1.5rem", background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="vc-grid">
          
          {/* Info Side */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,45,149,0.1)", padding: "0.5rem 1rem", borderRadius: "50px", color: "var(--pink-primary)", fontSize: "0.9rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              <Video size={16} /> Live Video Dates
            </div>
            <h2 className="font-playfair" style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.1 }}>Face-to-Face <br/><span style={{ color: "var(--pink-primary)" }}>Coffee Breaks</span></h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginBottom: "2.5rem", lineHeight: 1.6 }}>
              No more endless texting. Get to know your match in real-time with our 
              secure, high-definition video call system. It's safe, personal, and 
              perfect for that first "virtual" coffee.
            </p>
            
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "3rem" }}>
               {[
                 { icon: <Shield size={18}/>, text: "End-to-end encrypted calls" },
                 { icon: <Heart size={18}/>, text: "Exclusive filters & backgrounds" },
                 { icon: <Coffee size={18}/>, text: "Virtual coffee gift sharing" }
               ].map((item, i) => (
                 <li key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", color: "white", fontWeight: 500 }}>
                    <div style={{ color: "var(--pink-primary)" }}>{item.icon}</div>
                    {item.text}
                 </li>
               ))}
            </ul>

            {!isActive && (
              <motion.button 
                className="btn-primary" 
                onClick={() => setIsActive(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Preview Call
              </motion.button>
            )}
          </motion.div>

          {/* VC UI Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            style={{ position: "relative" }}
          >
            <div 
              style={{ 
                width: "100%", 
                aspectRatio: "1.2/1", 
                background: "#141418", 
                borderRadius: "32px", 
                border: "1px solid rgba(255,255,255,0.1)", 
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 50px 100px rgba(0,0,0,0.6)"
              }}
            >
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div 
                    key="active"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                  >
                    {/* Remote Video (Matched user) */}
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                       <img src="/profile-1.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Remote User" />
                       <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
                    </div>

                    {/* Local Video (Self) */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        top: '1.5rem', 
                        right: '1.5rem', 
                        width: '120px', 
                        aspectRatio: '3/4', 
                        background: '#333', 
                        borderRadius: '16px', 
                        border: '2px solid rgba(255,255,255,0.2)',
                        overflow: 'hidden',
                        zIndex: 10
                      }}
                    >
                       <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1c1c22, #333)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <UserIcon size={30} color="rgba(255,255,255,0.2)" />
                       </div>
                    </div>

                    {/* Call Overlay Info */}
                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                       <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', padding: '0.4rem 1rem', borderRadius: '50px', color: 'white', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4d4f', animation: 'pulse-pink 1.5s infinite' }} />
                          REC {formatTime(timer)}
                       </div>
                       <div style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Aria Bloom</div>
                    </div>

                    {/* Controls */}
                    <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', padding: '1rem 1.5rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                       <button onClick={() => setMuted(!muted)} style={{ width: 44, height: 44, borderRadius: '50%', background: muted ? '#ff4d4f' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {muted ? <MicOff size={20} /> : <Mic size={20} />}
                       </button>
                       <button onClick={() => setVideoOff(!videoOff)} style={{ width: 44, height: 44, borderRadius: '50%', background: videoOff ? '#ff4d4f' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {videoOff ? <VideoOff size={20} /> : <Video size={20} />}
                       </button>
                       <button onClick={() => setIsActive(false)} style={{ width: 60, height: 60, borderRadius: '50%', background: '#ff4d4f', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(255,77,79,0.3)' }}>
                         <PhoneOff size={24} />
                       </button>
                       <button style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Maximize2 size={20} />
                       </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}
                  >
                     <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,45,149,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pink-primary)' }}>
                        <Video size={40} />
                     </div>
                     <div style={{ textAlign: 'center' }}>
                        <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>Ready to Call?</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Experience the safest dating video calls.</p>
                     </div>
                     <button className="btn-primary" onClick={() => setIsActive(true)}>Start Video Call</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative Label */}
            <div style={{ position: "absolute", bottom: "-20px", right: "40px", background: "var(--grad-primary)", padding: "0.5rem 1.5rem", borderRadius: "12px", color: "white", fontSize: "0.8rem", fontWeight: 800, boxShadow: "var(--shadow-neon)" }}>
               HD ENCRYPTED
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .vc-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}

function UserIcon({ size, color }: { size: number, color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
