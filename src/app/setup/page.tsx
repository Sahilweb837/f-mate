"use client";

import { motion } from "framer-motion";
import { Camera, Coffee, ArrowRight, Loader2, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("photo", fileInputRef.current.files[0]);

    try {
      await api.post("/profile/photos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      
      // Update local user data
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.profile_complete = true;
        localStorage.setItem("user", JSON.stringify(user));
      }

      setTimeout(() => router.push("/discover"), 2000);
    } catch (err: any) {
      console.error("Upload failed:", err);
      const msg = err.response?.data?.message || "Failed to upload photo. Database might be updating.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-deep)" }}>
      <Navbar />
      
      <div style={{ padding: "120px 1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            width: "100%",
            maxWidth: "550px",
            background: "var(--bg-surface)",
            borderRadius: "32px",
            padding: "3rem",
            border: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center"
          }}
        >
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ width: 64, height: 64, borderRadius: "16px", background: "var(--grad-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <Camera size={32} color="white" />
            </div>
            <h1 className="font-playfair" style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>Complete Your Profile</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>Add a real photo of yourself to start meeting coffee lovers.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "200px",
                height: "250px",
                margin: "0 auto",
                background: "rgba(255,255,255,0.03)",
                border: "2px dashed rgba(255,45,149,0.3)",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--pink-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,45,149,0.3)"}
            >
              {preview ? (
                <img src={preview} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Preview" />
              ) : (
                <div style={{ color: "var(--text-dim)", textAlign: "center", padding: "1rem" }}>
                  <ImageIcon size={40} style={{ marginBottom: "1rem" }} />
                  <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>Click to Upload</div>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                hidden 
              />
            </div>

            {success ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", padding: "1rem", borderRadius: "14px", color: "#2ecc71", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
              >
                <CheckCircle size={20} /> Profile Completed! Redirecting...
              </motion.div>
            ) : (
              <motion.button 
                type="submit"
                disabled={loading || !preview}
                className="btn-primary" 
                style={{ width: "100%", padding: "1.1rem", fontSize: "1.1rem", fontWeight: 800, opacity: preview ? 1 : 0.5 }}
                whileHover={preview ? { scale: 1.02 } : {}}
                whileTap={preview ? { scale: 0.98 } : {}}
              >
                {loading ? <Loader2 size={22} className="animate-spin" /> : <>Finish Setup <ArrowRight size={20} /></>}
              </motion.button>
            )}
          </form>

          <p style={{ marginTop: "2rem", color: "var(--text-dim)", fontSize: "0.85rem" }}>
            By uploading a photo, you agree to our Community Guidelines. <br/>
            Real photos help build trust and increase matches by 80%.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
