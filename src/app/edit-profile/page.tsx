"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Coffee, User, Info, MapPin, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    coffee_style: "Cappuccino",
    gender: "female"
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        coffee_style: user.coffee_style || "Cappuccino",
        gender: user.gender || "female"
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await api.put("/profile/update", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess(true);
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-deep)" }}>
      <Navbar />
      
      <div style={{ padding: "120px 1.5rem 60px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div>
              <button onClick={() => router.back()} style={{ background: "none", border: "none", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontWeight: 700, marginBottom: "1rem" }}>
                <ArrowLeft size={18} /> Back to Dashboard
              </button>
              <h1 className="font-playfair" style={{ fontSize: "3rem", fontWeight: 900 }}>Edit Profile</h1>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
              
              {/* Basic Info Card */}
              <div style={{ background: "var(--bg-surface)", borderRadius: "32px", padding: "2.5rem", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.2rem", fontWeight: 800, marginBottom: "2rem" }}>
                  <User size={20} color="var(--pink-primary)" /> Basic Information
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dim)", marginBottom: "0.75rem" }}>Full Name</label>
                    <input 
                      type="text"
                      className="glass-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1rem", color: "white", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dim)", marginBottom: "0.75rem" }}>Gender</label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1rem", color: "white", outline: "none", appearance: "none" }}
                    >
                      <option value="male" style={{ background: "#050505" }}>Male</option>
                      <option value="female" style={{ background: "#050505" }}>Female</option>
                      <option value="non_binary" style={{ background: "#050505" }}>Non-binary</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bio & Coffee Card */}
              <div style={{ background: "var(--bg-surface)", borderRadius: "32px", padding: "2.5rem", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.2rem", fontWeight: 800, marginBottom: "2rem" }}>
                  <Coffee size={20} color="var(--pink-primary)" /> About & Coffee Style
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dim)", marginBottom: "0.75rem" }}>Bio / Story</label>
                    <textarea 
                      rows={4}
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1rem", color: "white", outline: "none", resize: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-dim)", marginBottom: "0.75rem" }}>Preferred Coffee Style</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "1rem" }}>
                      {["Espresso", "Latte", "Cappuccino", "Americano", "Mocha", "Cold Brew"].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setFormData({ ...formData, coffee_style: style })}
                          style={{
                            padding: "0.75rem",
                            borderRadius: "12px",
                            border: formData.coffee_style === style ? "2px solid var(--pink-primary)" : "1px solid rgba(255,255,255,0.1)",
                            background: formData.coffee_style === style ? "rgba(255,0,127,0.1)" : "rgba(255,255,255,0.02)",
                            color: formData.coffee_style === style ? "white" : "var(--text-muted)",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {success && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", padding: "1rem", borderRadius: "14px", color: "#2ecc71", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
                >
                  <CheckCircle size={20} /> Profile Updated Successfully!
                </motion.div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", padding: "1.25rem", fontSize: "1.1rem", fontWeight: 800, justifyContent: "center" }}
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Save Changes</>}
              </button>

            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
