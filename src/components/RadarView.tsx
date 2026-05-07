"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Coffee, 
  Heart, 
  Search, 
  Zap, 
  Filter, 
  Video 
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function RadarView() {
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearby = async () => {
      try {
        const res = await api.get('/discover');
        const mapped = res.data.map((u: any, i: number) => ({
           id: u.id,
           name: u.name,
           img: u.photos && u.photos.length > 0 ? u.photos[0].photo_url : "/profile-woman-2.png",
           x: (Math.random() - 0.5), // Use normalized -0.5 to 0.5
           y: (Math.random() - 0.5),
           delay: i * 0.3
        }));
        setNearbyUsers(mapped);
      } catch (err) {
        console.error("Radar fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNearby();
  }, []);

  return (
    <section style={{ padding: "100px 1.5rem", background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1250px", margin: "0 auto", textAlign: "center" }}>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--pink-primary)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
            <Zap size={16} /> Real-Time Discovery
          </div>
          <h2 className="font-playfair radar-title" style={{ fontWeight: 900, marginBottom: "1.5rem" }}>Find Coffee Lovers <span style={{ color: "var(--pink-primary)" }}>Nearby</span></h2>
          <p className="radar-desc" style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>Our live radar scans your area for people ready to grab a cup right now.</p>
        </motion.div>

        {/* Radar Container */}
        <div className="radar-canvas" style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          
          {/* Radar Background Rings */}
          {[1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className={`radar-ring ring-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 1 }}
              style={{
                position: "absolute",
                border: "1px solid var(--pink-primary)",
                borderRadius: "50%",
              }}
            />
          ))}

          {/* Scanning Line */}
          <motion.div
            className="scanning-line"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              background: "conic-gradient(from 0deg, var(--pink-primary) 0%, transparent 40%)",
              borderRadius: "50%",
              opacity: 0.2,
              transformOrigin: "center",
              zIndex: 1
            }}
          />

          {/* User Points */}
          <div style={{ position: "relative", zIndex: 10 }}>
            {/* Self */}
            <div className="radar-self" style={{ borderRadius: "50%", background: "var(--grad-primary)", border: "4px solid var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-neon)", position: "relative" }}>
               <MapPin size={32} color="white" />
               <motion.div 
                 animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 style={{ position: "absolute", inset: -4, border: "2px solid var(--pink-primary)", borderRadius: "50%" }}
               />
            </div>

            {/* Nearby Users */}
            {nearbyUsers.map(user => (
              <motion.div
                key={user.id}
                className="radar-user-node"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + user.delay, type: "spring" }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  "--user-x": user.x,
                  "--user-y": user.y
                } as any}
              >
                <motion.div 
                   whileHover={{ scale: 1.1 }}
                   style={{ position: "relative", cursor: "pointer" }}
                >
                   <div className="user-dot" style={{ borderRadius: "50%", border: "2px solid var(--pink-primary)", overflow: "hidden", background: "#333", boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}>
                      <img src={user.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={user.name} />
                   </div>
                   
                    {/* Tooltip on hover */}
                    <motion.div 
                      className="radar-tooltip"
                      style={{ 
                        position: "absolute", 
                        bottom: "120%", 
                        left: "50%", 
                        transform: "translateX(-50%)", 
                        background: "var(--bg-surface)", 
                        padding: "1rem", 
                        borderRadius: "20px", 
                        whiteSpace: "nowrap", 
                        color: "white", 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        pointerEvents: 'auto'
                      }}
                    >
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: 40, height: 40, borderRadius: '10px', overflow: 'hidden' }}>
                             <img src={user.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                             <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{user.name}</div>
                             <div style={{ color: "#2ecc71", fontSize: "0.7rem", fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ecc71' }} /> Active Now
                             </div>
                          </div>
                       </div>
                       
                       <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button style={{ flex: 1, padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Talk</button>
                          <button style={{ flex: 1, padding: '0.5rem', background: 'var(--grad-primary)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Connect</button>
                          <button style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', cursor: 'pointer' }}><Video size={14} /></button>
                       </div>
                    </motion.div>

                    <div style={{ position: "absolute", top: "-2px", right: "-2px", width: "12px", height: "12px", background: "#2ecc71", borderRadius: "50%", border: "2px solid var(--bg-deep)", boxShadow: '0 0 10px #2ecc71' }} />
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: "4rem", display: "flex", justifyContent: "center", gap: "1.5rem" }} className="radar-actions">
           <button className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Filter size={18} /> Adjust Radius
           </button>
           <button className="btn-primary" style={{ background: 'var(--grad-primary)', padding: '1rem 2.5rem' }}>
              View All Nearby
           </button>
        </div>

      </div>
      <style jsx>{`
        .radar-title { font-size: 3.5rem; }
        .radar-desc { font-size: 1.2rem; }
        .radar-canvas { height: 600px; max-width: 600px; }
        .radar-ring { width: var(--size); height: var(--size); }
        .ring-1 { --size: 150px; }
        .ring-2 { --size: 300px; }
        .ring-3 { --size: 450px; }
        .ring-4 { --size: 600px; }
        .scanning-line { width: 300px; height: 300px; }
        .radar-self { width: 80px; height: 80px; }
        .user-dot { width: 60px; height: 60px; }
        .radar-user-node {
          transform: translate(calc(-50% + (var(--user-x) * 500px)), calc(-50% + (var(--user-y) * 500px)));
        }

        @media (max-width: 768px) {
          .radar-title { font-size: 2.2rem !important; }
          .radar-desc { font-size: 1rem !important; }
          .radar-canvas { height: 350px !important; max-width: 350px !important; }
          .ring-1 { --size: 80px !important; }
          .ring-2 { --size: 160px !important; }
          .ring-3 { --size: 240px !important; }
          .ring-4 { --size: 320px !important; }
          .scanning-line { width: 160px !important; height: 160px !important; }
          .radar-self { width: 50px !important; height: 50px !important; }
          .radar-self :global(svg) { width: 20px !important; height: 20px !important; }
          .user-dot { width: 40px !important; height: 40px !important; }
          .radar-user-node {
            transform: translate(calc(-50% + (var(--user-x) * 300px)), calc(-50% + (var(--user-y) * 300px))) !important;
          }
          .radar-actions { flex-direction: column !important; gap: 1rem !important; }
          .radar-tooltip { padding: 0.5rem !important; }
        }

        .radar-tooltip {
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%) translateY(10px) !important;
        }
        div[style*="cursor: pointer"]:hover .radar-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
