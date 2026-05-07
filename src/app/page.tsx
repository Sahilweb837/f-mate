"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Heart, ArrowRight, Zap, ShieldCheck, Sparkles, MessageCircle, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProfileCards from "@/components/ProfileCards";
import VideoCallPreview from "@/components/VideoCallPreview";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import LocationManager from "@/components/LocationManager";
import RadarView from "@/components/RadarView";
import SafetySection from "@/components/SafetySection";
import DiscoveryCollections from "@/components/DiscoveryCollections";
import RandomMatcher from "@/components/RandomMatcher";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn) {
    return (
      <main className="relative min-h-screen overflow-x-hidden">
        <LocationManager />
        <FloatingParticles />
        <Navbar />
        <HeroSection />
        <RandomMatcher />
        <RadarView />
        <DiscoveryCollections />
        <ProfileCards />
        <VideoCallPreview />
        <Footer />
      </main>
    );
  }

  return (
    <main className="landing-container" style={{ minHeight: "100vh", background: "var(--bg-deep)", display: "flex" }}>
      {/* Left Side: Visual Experience */}
      <div style={{ flex: 1.2, position: "relative" }} className="visual-side">
        <img 
          src="/profile-couple-1.png" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          alt="CupMate Couple" 
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 50%, var(--bg-deep) 100%), linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)" }} />
        
        <div style={{ position: "absolute", bottom: "10%", left: "10%", right: "10%" }}>
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
           >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,0,127,0.1)", padding: "0.5rem 1.25rem", borderRadius: "50px", border: "1px solid rgba(255,0,127,0.2)", marginBottom: "1.5rem", backdropFilter: "blur(10px)" }}>
                <Sparkles size={16} color="var(--pink-primary)" />
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--pink-primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Premium Dating</span>
              </div>
              <h1 className="font-playfair main-title" style={{ fontWeight: 900, lineHeight: 1, marginBottom: "1.5rem" }}>
                Great Love <br/>Starts Here.
              </h1>
              <p className="main-desc" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "500px", lineHeight: 1.6 }}>
                Join the world's most exclusive community of coffee lovers. 
                Find your perfect match and start your story today.
              </p>
           </motion.div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative" }} className="auth-side">
        <div style={{ position: "absolute", top: "2rem", right: "2rem" }}>
           <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ background: "var(--grad-primary)", width: 32, height: 32, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Coffee size={18} color="white" />
              </div>
              <span className="font-playfair" style={{ fontSize: "1.2rem", fontWeight: 900, color: "white" }}>CupMate</span>
           </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ width: "100%", maxWidth: "450px" }}
          className="form-container"
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="font-playfair" style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.75rem" }}>
              {authMode === "register" ? "Join the Party" : "Welcome Back"}
            </h2>
            <p style={{ color: "var(--text-muted)" }}>
              {authMode === "register" ? "Create an account to start matching" : "Log in to continue your journey"}
            </p>
          </div>

          <div style={{ 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.05)", 
            borderRadius: "24px", 
            padding: "0.5rem", 
            display: "flex", 
            marginBottom: "2.5rem" 
          }}>
             <button 
               onClick={() => setAuthMode("register")}
               style={{ 
                 flex: 1, 
                 padding: "1rem", 
                 borderRadius: "18px", 
                 background: authMode === "register" ? "var(--grad-primary)" : "transparent",
                 color: "white",
                 fontWeight: 800,
                 border: "none",
                 cursor: "pointer",
                 transition: "all 0.3s"
               }}
             >
               Register
             </button>
             <button 
               onClick={() => setAuthMode("login")}
               style={{ 
                 flex: 1, 
                 padding: "1rem", 
                 borderRadius: "18px", 
                 background: authMode === "login" ? "var(--grad-primary)" : "transparent",
                 color: "white",
                 fontWeight: 800,
                 border: "none",
                 cursor: "pointer",
                 transition: "all 0.3s"
               }}
             >
               Login
             </button>
          </div>

          <AnimatePresence mode="wait">
            {authMode === "register" ? (
              <motion.div key="register" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <RegisterForm isSimple />
              </motion.div>
            ) : (
              <motion.div key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <LoginForm isSimple />
              </motion.div>
            )}
          </AnimatePresence>

          <p style={{ marginTop: "2rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.9rem" }}>
            By continuing, you agree to our <span style={{ color: "var(--text-muted)" }}>Terms of Service</span> and <span style={{ color: "var(--text-muted)" }}>Privacy Policy</span>.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .main-title { fontSize: 4.5rem; }
        .main-desc { fontSize: 1.2rem; }

        @media (max-width: 992px) {
          .landing-container {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .visual-side {
            height: 400px !important;
            flex: none !important;
          }
          .visual-side img {
             object-position: center 20%;
          }
          .main-title { fontSize: 2.8rem !important; }
          .main-desc { fontSize: 1rem !important; }
          .auth-side {
            padding: 4rem 1.5rem !important;
            flex: none !important;
          }
          .form-container {
            max-width: 100% !important;
          }
        }
      `}</style>
    </main>
  );
}
