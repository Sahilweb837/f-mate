"use client";

import { motion } from "framer-motion";
import { Heart, Video, Coffee, Shield, Star, Users, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Heart size={32} />,
    title: "Smart Matching",
    desc: "Our AI-powered algorithm connects you with people who match your coffee vibe and lifestyle.",
    color: "var(--pink-primary)"
  },
  {
    icon: <Video size={32} />,
    title: "HD Video Calls",
    desc: "Safe and secure video calling to meet your match face-to-face before the first coffee date.",
    color: "#3498db"
  },
  {
    icon: <Shield size={32} />,
    title: "Verified Safety",
    desc: "100% human-verified profiles and encrypted chats ensure your dating journey is always safe.",
    color: "#2ecc71"
  },
  {
    icon: <Coffee size={32} />,
    title: "Coffee Invites",
    desc: "Send a virtual coffee invite to your match to break the ice and plan your first real meetup.",
    color: "#e67e22"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: "120px 1.5rem", background: "var(--bg-deep)" }}>
      <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ color: "var(--pink-primary)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: "1rem" }}>Premium Experience</motion.div>
          <h2 className="font-playfair" style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>Everything You <span style={{ color: "var(--pink-primary)" }}>Need</span></h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>We've reimagined modern dating for the coffee-obsessed generation.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                background: "var(--bg-surface)",
                padding: "3rem 2rem",
                borderRadius: "32px",
                border: "1px solid rgba(255,255,255,0.05)",
                textAlign: "center",
                transition: "all 0.3s"
              }}
            >
              <div style={{ color: f.color, marginBottom: "1.5rem", display: "inline-flex", padding: "1.5rem", background: `${f.color}10`, borderRadius: "24px" }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>{f.title}</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Real Success Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ 
            marginTop: "8rem", 
            background: "var(--bg-surface)", 
            borderRadius: "40px", 
            padding: "4rem", 
            border: "1px solid rgba(255,255,255,0.05)",
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "4rem",
            alignItems: "center"
          }}
          className="flex-col md:grid"
        >
           <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "1/1" }}>
              <img src="/profile-2.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Success Story" />
           </div>
           <div>
              <div style={{ display: "flex", gap: "0.5rem", color: "#ffd700", marginBottom: "1.5rem" }}>
                 <Star size={20} fill="#ffd700" /><Star size={20} fill="#ffd700" /><Star size={20} fill="#ffd700" /><Star size={20} fill="#ffd700" /><Star size={20} fill="#ffd700" />
              </div>
              <h3 className="font-playfair" style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.5rem", lineHeight: 1.2 }}>"I found my barista-in-crime on CupDate!"</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                "We matched over our mutual love for Ethiopian light roasts. Three weeks later, we met at our local roastery and have been together ever since. CupDate's focus on coffee made the ice-breaking so much easier!"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                 <div style={{ fontWeight: 800, fontSize: "1.2rem" }}>Sarah & James</div>
                 <div style={{ height: "20px", width: "1px", background: "rgba(255,255,255,0.2)" }} />
                 <div style={{ color: "var(--pink-primary)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem" }}><CheckCircle size={16} /> Verified Couple</div>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
