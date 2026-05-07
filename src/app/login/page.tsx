"use client";

import { motion } from "framer-motion";
import { Coffee, Mail, Lock, ArrowRight, Globe, Loader2, AlertCircle, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      if (res.data.user.profile_complete) {
        router.push("/discover");
      } else {
        router.push("/setup");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,45,149,0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,45,149,0.03) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "var(--bg-surface)",
          borderRadius: "32px",
          padding: "3rem",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          position: "relative",
          zIndex: 1
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Link href="/">
            <div style={{ width: 64, height: 64, borderRadius: "16px", background: "var(--grad-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", boxShadow: "var(--shadow-neon)" }}>
              <Coffee size={32} color="white" />
            </div>
          </Link>
          <h1 className="font-playfair" style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>Ready for another cup of connection?</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', padding: '1rem', borderRadius: '12px', color: '#e74c3c', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dim)", marginLeft: "0.5rem" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="hello@example.com" 
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1.1rem 1.1rem 1.1rem 3.5rem", color: "white", outline: "none", fontSize: "1rem" }}
                className="focus:border-pink-500 transition-all"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dim)" }}>Password</label>
              <Link href="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--pink-primary)', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••" 
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1.1rem 1.1rem 1.1rem 3.5rem", color: "white", outline: "none", fontSize: "1rem" }}
              />
            </div>
          </div>

          <motion.button 
            type="submit"
            disabled={loading}
            className="btn-primary" 
            style={{ width: "100%", padding: "1.1rem", fontSize: "1.1rem", fontWeight: 800, marginTop: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,45,149,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <Loader2 size={22} className="animate-spin" /> : <>Log In <ArrowRight size={20} /></>}
          </motion.button>
        </form>

        <div style={{ margin: "2.5rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontWeight: 700 }}>OR CONTINUE WITH</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "0.9rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", color: "white", cursor: "pointer", fontSize: "0.95rem", fontWeight: 600 }}>
            <Globe size={20} /> Google
          </button>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "0.9rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", color: "white", cursor: "pointer", fontSize: "0.95rem", fontWeight: 600 }}>
            <User size={20} /> GitHub
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "3rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Don't have an account? <Link href="/register" style={{ color: "var(--pink-primary)", fontWeight: 800, textDecoration: "none" }}>Join Free</Link>
        </p>

      </motion.div>
    </main>
  );
}
