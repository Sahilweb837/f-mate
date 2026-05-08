"use client";

import { motion } from "framer-motion";
import { Coffee, Heart, Users, Star, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section style={{ 
      padding: "160px 1.5rem 100px", 
      background: "var(--bg-deep)", 
      position: "relative",
      overflow: "hidden" 
    }}>
      {/* Background Glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255,0,127,0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '0%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(255,0,127,0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

      <div style={{ maxWidth: "1350px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="hero-grid">
          
          {/* Left Side */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,0,127,0.08)", padding: "0.6rem 1.25rem", borderRadius: "50px", border: "1px solid rgba(255,0,127,0.15)", marginBottom: "2.5rem" }}>
              <div style={{ position: 'relative', width: 10, height: 10 }}>
                 <div style={{ position: 'absolute', inset: 0, background: 'var(--pink-primary)', borderRadius: '50%' }} />
                 <motion.div animate={{ scale: [1, 2.5], opacity: [0.6, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', inset: 0, background: 'var(--pink-primary)', borderRadius: '50%' }} />
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--pink-primary)", textTransform: "uppercase", letterSpacing: "0.15em" }}>1,482 Couples Brewing Today</span>
            </div>

            <h1 className="font-playfair" style={{ fontSize: "clamp(3.8rem, 6.5vw, 6rem)", fontWeight: 900, lineHeight: 0.95, marginBottom: "2rem", letterSpacing: "-0.05em" }}>
              The Premium <br />
              <span style={{ background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Matchmaking</span> <br />
              For Coffee Lovers
            </h1>
            
            <p style={{ color: "var(--text-muted)", fontSize: "1.3rem", lineHeight: 1.6, maxWidth: "580px", marginBottom: "3.5rem", fontWeight: 400 }}>
              Say goodbye to shallow swipes. Join an exclusive community where deep conversations start with a perfect cup. 
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
              <Link href="/register">
                <motion.button className="btn-primary" style={{ padding: "1.25rem 3.5rem", fontSize: "1.1rem", fontWeight: 800 }} whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,0,127,0.5)" }} whileTap={{ scale: 0.95 }}>
                  Get Started Free
                </motion.button>
              </Link>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "rgba(255,255,255,0.03)", padding: "0.8rem 1.5rem", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                 <div style={{ display: "flex", gap: "2px", color: "#ffd700" }}>
                    <Star size={16} fill="#ffd700" /><Star size={16} fill="#ffd700" /><Star size={16} fill="#ffd700" /><Star size={16} fill="#ffd700" /><Star size={16} fill="#ffd700" />
                 </div>
                 <span style={{ color: "white", fontSize: "0.9rem", fontWeight: 700 }}>4.9/5 Trust</span>
              </div>
            </div>

            {/* Quick Badges */}
            <div style={{ marginTop: "4.5rem", display: "flex", gap: "3.5rem" }} className="hero-stats">
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: 'var(--pink-primary)' }}><ShieldCheck size={32} /></div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>100%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>Verified Users</div>
                  </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: 'var(--pink-primary)' }}><Users size={32} /></div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>12M+</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>Active Matches</div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Side: Visual Asset */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ position: "relative" }}>
            <div style={{ position: "relative", borderRadius: "40px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 50px 100px rgba(0,0,0,0.8)" }}>
              <img src="/hero-image.png" alt="CupDate Premium" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 40%)" }} />
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ position: "absolute", top: "20%", left: "-10%", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", padding: "1.25rem", borderRadius: "24px", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            >
               <div style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--grad-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Coffee size={24} color="white" />
               </div>
               <div>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>New Coffee Invite</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>from Aria Bloom</div>
               </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              style={{ position: "absolute", bottom: "15%", right: "-5%", background: "rgba(10,10,12,0.6)", backdropFilter: "blur(20px)", border: "1px solid var(--pink-primary)", padding: "1.25rem", borderRadius: "24px", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            >
               <Heart size={28} color="var(--pink-primary)" fill="var(--pink-primary)" />
               <div>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem" }}  >Match Success</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Mumbai, India</div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center; }
          .hero-grid p, .hero-grid .hero-stats { margin-left: auto; margin-right: auto; }
          .hero-stats { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
