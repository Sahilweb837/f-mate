"use client";

import { motion } from "framer-motion";
import { ShieldCheck, EyeOff, UserCheck, Lock, ShieldAlert, Heart } from "lucide-react";

const safetyPoints = [
  {
    icon: <UserCheck size={32} />,
    title: "AI Photo Verification",
    desc: "Every profile is cross-checked using AI to ensure the person you see is the person you meet.",
  },
  {
    icon: <Lock size={32} />,
    title: "Encrypted Chats",
    desc: "Your conversations are protected with military-grade encryption for total privacy.",
  },
  {
    icon: <ShieldAlert size={32} />,
    title: "24/7 Security",
    desc: "Our moderation team works around the clock to keep the community safe and respectful.",
  },
  {
    icon: <EyeOff size={32} />,
    title: "Privacy Controls",
    desc: "Control who sees your profile and hide your location with a single tap.",
  }
];

export default function SafetySection() {
  return (
    <section style={{ padding: "120px 1.5rem", background: "var(--bg-surface)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1250px", margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="flex-col md:grid">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(34,197,94,0.1)", padding: "0.5rem 1rem", borderRadius: "50px", color: "#22c55e", fontSize: "0.85rem", fontWeight: 800, marginBottom: "1.5rem" }}>
              <ShieldCheck size={16} /> SAFE & SECURE DATING
            </div>
            <h2 className="font-playfair" style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.1 }}>Your Safety is Our <br /><span style={{ color: "var(--pink-primary)" }}>Priority One</span></h2>
            <div style={{ background: 'rgba(231,76,60,0.05)', borderLeft: '4px solid #e74c3c', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <p style={{ color: "white", fontSize: "1rem", fontWeight: 700, marginBottom: '0.5rem' }}>Important Safety Tip / महत्वपूर्ण सुरक्षा सुझाव:</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                Don't share personal details. Your safety is your responsibility. <br />
                व्यक्तिगत विवरण साझा न करें। आपकी सुरक्षा आपकी ज़िम्मेदारी है। <br />
                <strong style={{ color: '#e74c3c', marginTop: '0.5rem', display: 'block' }}>"Sab aapka zimma hai hamra nahi"</strong>
              </p>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", lineHeight: 1.8, marginBottom: "3rem" }}>
              At CupDate, we believe that the best connections happen when you feel safe.
              That's why we've built the most advanced security features in the industry.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
              {safetyPoints.map((point, i) => (
                <div key={i}>
                  <div style={{ color: "var(--pink-primary)", marginBottom: "1rem" }}>{point.icon}</div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>{point.title}</h4>
                  <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", lineHeight: 1.5 }}>{point.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ position: "relative" }}
          >
            <div style={{
              background: "rgba(255,45,149,0.03)",
              borderRadius: "40px",
              padding: "3rem",
              border: "1px solid rgba(255,255,255,0.05)",
              textAlign: "center"
            }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", background: "var(--grad-primary)", margin: "0 auto 2.5rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(255,45,149,0.3)" }}>
                <ShieldCheck size={60} color="white" />
              </div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "1rem" }}>Verified Member Status</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem" }}>Only members with verified photos can send coffee invites.</p>
              <button className="btn-primary" style={{ width: "100%" }}>Learn More About Safety</button>
            </div>

            {/* Decorative elements */}
            <div style={{ position: "absolute", top: "-20px", right: "-20px", background: "var(--bg-deep)", border: "1px solid rgba(255,255,255,0.1)", padding: "1rem", borderRadius: "16px", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 800 }}>
              <Heart size={16} fill="var(--pink-primary)" color="var(--pink-primary)" /> Trusted by 10M+
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
