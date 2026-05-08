"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Settings, Heart, MessageCircle, Zap, Camera, Edit3, Coffee, LogOut, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import RandomMatcher from "@/components/RandomMatcher";
import VideoCallModal from "@/components/VideoCallModal";
import Link from "next/link";
import api from "@/lib/api";

export default function ProfileDashboard() {
  const [user, setUser] = useState<any>(null);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user');
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (e) {
        console.error("Failed to fetch user", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Simple polling for incoming calls
    const interval = setInterval(async () => {
       try {
          const res = await api.get('/video-calls/history');
          const activeCall = res.data.data.find((c: any) => c.status === 'ringing' && c.callee_id === user?.id);
          if (activeCall) setIncomingCall(activeCall.caller);
       } catch (e) {}
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div style={{ height: "100vh", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader2 className="animate-spin" color="var(--pink-primary)" size={48} />
    </div>
  );
  
  if (!user) return null;

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-deep)" }}>
      <Navbar />
      
      <div style={{ padding: "120px 1.5rem 60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "2.5rem" }} className="profile-grid">
            
            {/* Sidebar: User Info */}
            <aside>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ 
                  background: "var(--bg-surface)", 
                  borderRadius: "32px", 
                  padding: "2.5rem", 
                  border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                  position: "sticky",
                  top: "120px"
                }}
              >
                <div style={{ position: "relative", width: 150, height: 150, margin: "0 auto 2rem" }}>
                  <img 
                    src={user.photos?.[0]?.url || "/profile-woman-1.png"} 
                    style={{ width: "100%", height: "100%", borderRadius: "30px", objectFit: "cover", border: "3px solid var(--pink-primary)" }} 
                    alt={user.name}
                  />
                  <button style={{ position: "absolute", bottom: -10, right: -10, width: 44, height: 44, borderRadius: "15px", background: "var(--grad-primary)", border: "none", color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px rgba(255,0,127,0.3)" }}>
                    <Camera size={20} />
                  </button>
                </div>

                <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem" }}>{user.name}</h2>
                <p style={{ color: "var(--pink-primary)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "1.5rem" }}>Premium Member</p>
                
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem" }}>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: "1.2rem" }}>124</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 800 }}>Likes</div>
                  </div>
                  <div style={{ width: 1, height: "30px", background: "rgba(255,255,255,0.1)", alignSelf: "center" }} />
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: "1.2rem" }}>48</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 800 }}>Matches</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <Link href="/edit-profile" style={{ textDecoration: "none" }}>
                    <button className="btn-outline" style={{ width: "100%", padding: "1rem" }}>
                      <Edit3 size={18} /> Edit Profile
                    </button>
                  </Link>
                  <button className="btn-outline" style={{ width: "100%", padding: "1rem", borderColor: "rgba(231,76,60,0.2)", color: "#e74c3c" }} onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                  }}>
                    <LogOut size={18} /> Log Out
                  </button>
                </div>
              </motion.div>
            </aside>

            {/* Main Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              
              {/* Random Match Highlight */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ 
                  background: "var(--grad-primary)", 
                  borderRadius: "32px", 
                  padding: "3rem",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{ fontSize: "2rem", fontWeight: 900, color: "white", marginBottom: "1rem" }}>Find Love Randomly</h3>
                  <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "450px", fontSize: "1.1rem", marginBottom: "2rem" }}>
                    Don't wait for swipes. Use our premium Random Matcher to find your coffee partner instantly.
                  </p>
                  <a href="#random-section">
                    <button style={{ background: "white", color: "var(--pink-primary)", border: "none", padding: "1rem 2.5rem", borderRadius: "14px", fontWeight: 800, fontSize: "1rem", cursor: "pointer" }}>
                      Start Matching Now
                    </button>
                  </a>
                </div>
                <Zap size={200} color="white" style={{ position: "absolute", right: "-40px", bottom: "-40px", opacity: 0.1 }} />
              </motion.div>

              {/* Integrated Random Matcher */}
              <div id="random-section" style={{ background: "var(--bg-surface)", borderRadius: "32px", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <RandomMatcher />
              </div>

              {/* Recent Activities Mockup */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                 <div style={{ background: "var(--bg-card)", borderRadius: "24px", padding: "2rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                       <div style={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(255,0,127,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Heart size={20} color="var(--pink-primary)" />
                       </div>
                       <h4 style={{ fontWeight: 800 }}>Recent Likes</h4>
                    </div>
                    <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>See who liked your profile today.</p>
                 </div>
                 <div style={{ background: "var(--bg-card)", borderRadius: "24px", padding: "2rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                       <div style={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(52,152,219,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <MessageCircle size={20} color="#3498db" />
                       </div>
                       <h4 style={{ fontWeight: 800 }}>Unread Messages</h4>
                    </div>
                    <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>You have 2 new conversations waiting.</p>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <VideoCallModal 
        isOpen={!!incomingCall} 
        onClose={() => setIncomingCall(null)} 
        remoteUser={incomingCall} 
      />

      <style jsx>{`
        @media (max-width: 992px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          aside { position: static !important; }
        }
      `}</style>
    </main>
  );
}
