"use client";

import { motion } from "framer-motion";
import { Check, Star, Coffee, Crown } from "lucide-react";

const tiers = [
  {
    name: "Espresso",
    price: "Free",
    features: ["10 Swipes/day", "Basic Discovery", "1 Coffee Invite/week"],
    icon: <Coffee size={24} />,
    color: "var(--text-muted)",
    popular: false
  },
  {
    name: "Latte Gold",
    price: "$9.99/mo",
    features: ["Unlimited Swipes", "Advanced Filters", "5 Coffee Invites/day", "Priority Matches"],
    icon: <Star size={24} />,
    color: "var(--pink-primary)",
    popular: true
  },
  {
    name: "Barista Pro",
    price: "$19.99/mo",
    features: ["Everything in Gold", "Video Call Access", "Profile Boost", "Global Passport"],
    icon: <Crown size={24} />,
    color: "#ffd700",
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" style={{ padding: "100px 1.5rem", background: "var(--bg-surface)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          style={{ marginBottom: "5rem" }}
        >
          <h2 className="font-playfair" style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1rem", color: "var(--text-main)" }}>
            Choose Your <span style={{ color: "var(--pink-primary)" }}>Blend</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}>Elevate your dating experience with our premium plans.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                borderRadius: "32px",
                padding: "3rem 2rem",
                border: tier.popular ? "2px solid var(--pink-primary)" : "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
              }}
            >
              {tier.popular && (
                <div style={{ position: "absolute", top: "-15px", background: "var(--grad-primary)", color: "white", padding: "0.4rem 1.2rem", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 800, boxShadow: "var(--shadow-neon)" }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{ color: tier.color, marginBottom: "1.5rem" }}>{tier.icon}</div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-main)" }}>{tier.name}</h3>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "2rem", color: "var(--text-main)" }}>{tier.price}</div>

              <div style={{ width: "100%", textAlign: "left", marginBottom: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {tier.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                    <Check size={16} color="var(--pink-primary)" /> {f}
                  </div>
                ))}
              </div>

              <motion.button
                className={tier.popular ? "btn-primary" : "btn-outline"}
                style={{ width: "100%", padding: "1rem" }}
                whileTap={{ scale: 0.95 }}
              >
                Choose {tier.name}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
