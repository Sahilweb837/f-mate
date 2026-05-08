"use client";

import { motion } from "framer-motion";
import { Camera, Users, Zap, Heart, Star, ShieldCheck, Sparkles, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "New Members",
    subtitle: "Just joined the party",
    icon: <Sparkles size={24} />,
    color: "var(--pink-primary)",
    items: [
      { name: "Priya", age: 22, img: "/profile-woman-1.png", isNew: true },
      { name: "Ananya", age: 24, img: "/profile-woman-2.png", isNew: true },
      { name: "Isha", age: 21, img: "/profile-woman-1.png", isNew: true },
      { name: "Sanya", age: 23, img: "/profile-woman-2.png", isNew: true },
    ]
  },
  {
    title: "Real Photos",
    subtitle: "100% Verified profiles",
    icon: <ShieldCheck size={24} />,
    color: "#ff007f",
    items: [
      { name: "Rahul", age: 26, img: "/profile-man-1.png", verified: true },
      { name: "Simran", age: 25, img: "/profile-woman-2.png", verified: true },
      { name: "Karan", age: 27, img: "/profile-man-1.png", verified: true },
      { name: "Neha", age: 24, img: "/profile-woman-1.png", verified: true },
    ]
  },
  {
    title: "Couples",
    subtitle: "Double the coffee, double the fun",
    icon: <Users size={24} />,
    color: "#ff4da6",
    items: [
      { name: "Alex & Sam", age: "25/24", img: "/profile-couple-1.png", isCouple: true },
      { name: "Vikram & Aditi", age: "28/26", img: "/profile-couple-1.png", isCouple: true },
      { name: "Leo & Mia", age: "24/23", img: "/profile-couple-1.png", isCouple: true },
      { name: "Raj & Tina", age: "29/27", img: "/profile-couple-1.png", isCouple: true },
    ]
  }
];

export default function DiscoveryCollections() {
  return (
    <section style={{ padding: "100px 0", background: "var(--bg-deep)", position: "relative" }}>
      <div style={{ maxWidth: "1350px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {sections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: "6rem" }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: section.color, fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
                  {section.icon} {section.title}
                </div>
                <h2 className="font-playfair" style={{ fontSize: "2.5rem", fontWeight: 900 }}>{section.subtitle}</h2>
              </div>
              <Link href="/discover" style={{ color: "var(--text-muted)", fontWeight: 700, textDecoration: "none", fontSize: "1rem" }} className="hover:text-white transition-colors">
                View All →
              </Link>
            </motion.div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
              gap: "2rem" 
            }}>
              {section.items.map((item: any, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  style={{
                    position: "relative",
                    height: "400px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "var(--bg-card)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                >
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    className="hover:scale-110"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
                  
                  {item.isNew && (
                    <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", background: "var(--grad-primary)", color: "white", padding: "0.4rem 0.8rem", borderRadius: "50px", fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", boxShadow: "0 0 15px rgba(255,45,149,0.5)" }}>
                      New Member
                    </div>
                  )}

                  {item.verified && (
                    <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", background: "rgba(46,204,113,0.2)", backdropFilter: "blur(10px)", border: "1px solid rgba(46,204,113,0.3)", color: "#2ecc71", padding: "0.4rem 0.8rem", borderRadius: "50px", fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <ShieldCheck size={12} fill="#2ecc71" color="black" /> Verified
                    </div>
                  )}

                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <h4 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{item.name}</h4>
                      <span style={{ color: "var(--text-muted)", fontSize: "1.1rem", fontWeight: 600 }}>{item.age}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2ecc71" }} />
                      Online Now
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", width: "44px", height: "44px", borderRadius: "50%", background: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                  >
                    <Heart size={20} fill="var(--pink-primary)" color="var(--pink-primary)" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Safety Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            marginTop: "4rem", 
            padding: "3rem", 
            borderRadius: "32px", 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.05)",
            textAlign: "center"
          }}
        >
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(231,76,60,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
             <ShieldCheck size={30} color="#e74c3c" />
          </div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Safety First | सुरक्षा सबसे पहले</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Please do not share your personal details with anyone. Your safety is your responsibility. We are not responsible for any personal interactions. <br/>
            कृपया किसी के साथ भी अपनी व्यक्तिगत जानकारी साझा न करें। आपकी सुरक्षा आपकी ज़िम्मेदारी है। हम किसी भी व्यक्तिगत बातचीत के लिए ज़िम्मेदार नहीं हैं। <br/>
            <strong style={{ color: "white", marginTop: "0.5rem", display: "block" }}>"Sab aapka zimma hai hamra nahi"</strong>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
