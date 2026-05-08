"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MapPin, Heart, Coffee, MessageCircle, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RadarView from "@/components/RadarView";
import api from "@/lib/api";

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'radar'>('radar');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get('/discover');
        setProfiles(res.data);
      } catch (err) {
        console.error("Discover fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <main style={{ background: "var(--bg-deep)", minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ maxWidth: "1250px", margin: "0 auto", padding: "120px 1.5rem 60px" }}>
        
         {/* Header & Search */}
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }} className="flex-col md:flex-row gap-6">
            <div>
              <h1 className="font-playfair" style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>Discover <span style={{ color: "var(--pink-primary)" }}>Connections</span></h1>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Find coffee lovers near you who share your vibe.</p>
            </div>
            
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
               {/* View Toggle */}
               <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "14px", padding: "4px", display: "flex", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <button 
                    onClick={() => setViewMode('radar')}
                    style={{ 
                      padding: "0.6rem 1.2rem", 
                      borderRadius: "10px", 
                      background: viewMode === 'radar' ? "var(--grad-primary)" : "transparent",
                      color: "white",
                      border: "none",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Radar
                  </button>
                  <button 
                    onClick={() => setViewMode('grid')}
                    style={{ 
                      padding: "0.6rem 1.2rem", 
                      borderRadius: "10px", 
                      background: viewMode === 'grid' ? "var(--grad-primary)" : "transparent",
                      color: "white",
                      border: "none",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Grid
                  </button>
               </div>

               <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "0.8rem 1.2rem", color: "white", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <Filter size={18} /> Filters
               </button>
            </div>
         </div>

         {/* Content Area */}
         <AnimatePresence mode="wait">
           {viewMode === 'radar' ? (
             <motion.div 
               key="radar"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.05 }}
               transition={{ duration: 0.4 }}
               style={{ marginTop: "-60px" }}
             >
                <RadarView />
             </motion.div>
           ) : (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4 }}
             >
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                   <Loader2 size={40} className="animate-spin" color="var(--pink-primary)" />
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
                  {profiles.map((p, i) => {
                    const mainPhoto = p.photos && p.photos.length > 0 ? p.photos[0].photo_url : "/profile-1.png";
                    return (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -10 }}
                        className="glass-card"
                        style={{
                          borderRadius: "24px",
                          overflow: "hidden",
                          position: "relative",
                          cursor: "pointer",
                        }}
                      >
                        {/* Image Area */}
                        <div style={{ aspectRatio: "0.9/1", position: "relative" }}>
                          <img src={mainPhoto} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={p.name} />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)" }} />
                          
                          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                              <div style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", padding: "0.4rem", borderRadius: "50%", color: "white" }}>
                                <Heart size={16} />
                              </div>
                          </div>
  
                          <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "var(--grad-primary)", padding: "0.2rem 0.8rem", borderRadius: "50px", fontSize: "0.75rem", fontWeight: 800, color: "white" }}>
                                <Coffee size={12} /> {p.coffee_style || 'Coffee Lover'}
                              </div>
                          </div>
                        </div>
  
                        {/* Info Area */}
                        <div style={{ padding: "1.25rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{p.name}</h3>
                              <div style={{ color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.85rem" }}>
                                <MapPin size={12} /> {p.location || 'Nearby'}
                              </div>
                          </div>
                          
                          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                              <button style={{ flex: 1, background: "rgba(255,45,149,0.1)", border: "1px solid rgba(255,45,149,0.2)", color: "var(--pink-primary)", borderRadius: "10px", padding: "0.6rem", fontSize: "0.85rem", fontWeight: 700 }}>
                                Coffee Invite
                              </button>
                              <button style={{ width: "42px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                <MessageCircle size={18} />
                              </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
  
              {/* Load More */}
              {!loading && profiles.length > 0 && (
                <div style={{ textAlign: "center", marginTop: "4rem" }}>
                  <button className="btn-outline" style={{ padding: "0.8rem 3rem" }}>Load More Profiles</button>
                </div>
              )}
             </motion.div>
           )}
         </AnimatePresence>
       </div>
       <Footer />
     </main>
   );
 }
