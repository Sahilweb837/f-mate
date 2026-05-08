"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Coffee, Heart, Zap, Loader2, X, MessageCircle, Video, Users, Sparkles, ShieldCheck } from "lucide-react";
import api from "@/lib/api";
import VideoCallModal from "@/components/VideoCallModal";

export default function RandomMatcher() {
  const [matching, setMatching] = useState(false);
  const [match, setMatch] = useState<any>(null);
  const [gender, setGender] = useState("female"); // Default to matching with girls
  const [error, setError] = useState("");
  const [isVCOpen, setIsVCOpen] = useState(false);

  const startMatching = async () => {
    setMatching(true);
    setMatch(null);
    setError("");

    // Artificial delay for "premium" feel
    await new Promise(r => setTimeout(r, 2500));

    try {
      const res = await api.get(`/random-match?gender=${gender}`);
      // Add a fake match percentage for "premium" feel
      const matchData = { ...res.data, match_score: Math.floor(Math.random() * 15) + 85 };
      setMatch(matchData);
    } catch (err: any) {
      setError(err.response?.data?.message || "No matches found right now. Try another preference!");
    } finally {
      setMatching(false);
    }
  };

  return (
    <section id="random-match" style={{ padding: "100px 1.5rem", background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,0,127,0.1)", padding: "0.6rem 1.25rem", borderRadius: "50px", border: "1px solid rgba(255,0,127,0.2)", marginBottom: "1.5rem" }}>
            <Zap size={18} color="var(--pink-primary)" fill="var(--pink-primary)" />
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--pink-primary)", textTransform: "uppercase", letterSpacing: "0.15em" }}>Live Matchmaking</span>
          </div>
          <h2 className="font-playfair" style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>Random Match</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
            Select who you'd like to meet and let CupDate find your perfect coffee partner instantly.
          </p>
        </motion.div>

        <div style={{ 
          background: "var(--bg-surface)", 
          border: "1px solid rgba(255,255,255,0.08)", 
          borderRadius: "40px", 
          padding: "3rem",
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
          position: "relative"
        }}>
          
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontWeight: 800, color: "var(--text-dim)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>I want to match with:</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              {[
                { id: "female", label: "Girls", icon: <Users size={24} /> },
                { id: "male", label: "Boys", icon: <Users size={24} /> },
                { id: "both", label: "Both", icon: <Sparkles size={24} /> }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setGender(opt.id)}
                  style={{
                    flex: 1,
                    padding: "1.5rem 1rem",
                    borderRadius: "24px",
                    border: gender === opt.id ? "2px solid var(--pink-primary)" : "1px solid rgba(255,255,255,0.08)",
                    background: gender === opt.id ? "rgba(255,0,127,0.05)" : "transparent",
                    color: gender === opt.id ? "white" : "var(--text-muted)",
                    fontWeight: 800,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem"
                  }}
                >
                  <div style={{ color: gender === opt.id ? "var(--pink-primary)" : "var(--text-dim)" }}>
                    {opt.icon}
                  </div>
                  <span style={{ fontSize: '0.9rem' }}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={startMatching}
            disabled={matching}
            className="btn-primary"
            style={{ width: "100%", padding: "1.25rem", fontSize: "1.1rem", fontWeight: 900, justifyContent: "center", borderRadius: '18px' }}
          >
            {matching ? <Loader2 className="animate-spin" /> : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Coffee size={20} /> Find My Match
              </div>
            )}
          </button>

          {error && <p style={{ color: "#e74c3c", marginTop: "1.5rem", fontWeight: 700 }}>{error}</p>}
        </div>

        <AnimatePresence>
          {matching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(5,5,5,0.95)",
                backdropFilter: "blur(20px)",
                zIndex: 2000,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div style={{ position: "relative", width: 200, height: 200 }}>
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  style={{ position: "absolute", inset: 0, border: "4px solid var(--pink-primary)", borderRadius: "50%", borderTopColor: "transparent", opacity: 0.3 }}
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ position: "absolute", inset: "20%", background: "var(--grad-primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 50px var(--pink-glow)" }}
                >
                  <Heart size={60} color="white" fill="white" />
                </motion.div>
              </div>
              <h3 className="font-playfair" style={{ fontSize: "2.5rem", marginTop: "3rem", fontWeight: 900 }}>Brewing Your Match...</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Searching for verified {gender} profiles nearby</p>
            </motion.div>
          )}

          {match && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.9)",
                backdropFilter: "blur(30px)",
                zIndex: 2000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem"
              }}
            >
              <div style={{ 
                background: "var(--bg-surface)", 
                borderRadius: "40px", 
                width: "100%", 
                maxWidth: "500px", 
                overflow: "hidden", 
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 50px 100px rgba(0,0,0,0.8)"
              }}>
                <div style={{ position: "relative", height: "450px" }}>
                  <img 
                    src={match.photos?.[0]?.url || "/profile-woman-1.png"} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    alt={match.name}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.9) 100%)" }} />
                  <button 
                    onClick={() => setMatch(null)}
                    style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <X size={24} />
                  </button>
                  <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                       <div style={{ background: 'var(--grad-primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Sparkles size={12} /> {match.match_score}% Match
                       </div>
                       <div style={{ background: 'rgba(46, 204, 113, 0.2)', backdropFilter: 'blur(10px)', color: '#2ecc71', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <ShieldCheck size={12} /> Verified
                       </div>
                    </div>
                    <h2 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "0.25rem", letterSpacing: '-0.03em' }}>{match.name}, {new Date().getFullYear() - new Date(match.date_of_birth).getFullYear()}</h2>
                    <p style={{ color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: '1rem' }}>
                      <Coffee size={18} color="var(--pink-primary)" /> {match.coffee_style || "Cappuccino Lover"}
                    </p>
                  </div>
                </div>
                <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <button className="btn-primary" style={{ width: "100%", padding: "1.1rem", background: "white", color: "black", fontWeight: 800, border: 'none' }}>
                    <MessageCircle size={20} /> Chat Now
                  </button>
                  <button 
                    onClick={() => setIsVCOpen(true)}
                    className="btn-primary" 
                    style={{ width: "100%", padding: "1.1rem" }}
                  >
                    <Video size={20} /> Video Call
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <VideoCallModal 
          isOpen={isVCOpen} 
          onClose={() => setIsVCOpen(false)} 
          remoteUser={match} 
        />
      </div>
    </section>
  );
}
