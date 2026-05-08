"use client";

import { motion } from "framer-motion";
import { Coffee, Camera, Send, MessageCircle, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--warm-900)", color: "white", padding: "5rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "4rem", marginBottom: "4rem" }} className="footer-grid">
          
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--grad-hero)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Coffee size={20} color="white" />
              </div>
              <span className="font-playfair" style={{ fontSize: "1.8rem", fontWeight: 700 }}>CupDate</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "300px" }}>
              The dating app for coffee enthusiasts. Find your perfect match and share a cup of joy.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              {[<Camera size={20} />, <Send size={20} />, <MessageCircle size={20} />].map((icon, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1, color: "var(--pink-400)" }}
                  style={{ cursor: "pointer", color: "rgba(255,255,255,0.8)" }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["About Us", "Careers", "Blog", "Contact"].map(l => (
                <Link key={l} href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>Legal</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Safety Tips"].map(l => (
                <Link key={l} href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>App</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["iOS App", "Android App", "Web Version", "Community"].map(l => (
                <Link key={l} href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>

        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
          <p>© 2026 CupDate. Made with <Heart size={14} color="var(--pink-500)" style={{ display: "inline", margin: "0 4px" }} /> for coffee lovers.</p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
