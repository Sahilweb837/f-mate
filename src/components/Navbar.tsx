"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Coffee, Heart, ArrowRight, LogOut } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, []);

  // Keep it in sync if localStorage changes (optional but good)
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const links = [
    { label: "Discover", href: "/discover" },
    { label: "Dashboard", href: "/profile" },
    { label: "Random Match", href: "/profile#random-section" },
    { label: "Messages", href: "/chat" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        background: "rgba(5,5,5,0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transition: "all 0.3s ease"
      }}
    >
      {mounted && user && !user.profile_complete && (
        <div style={{ background: 'var(--grad-primary)', padding: '0.5rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
          <Link href="/setup" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
             🚀 Complete your profile with a photo to start matching! <ArrowRight size={14} />
          </Link>
        </div>
      )}
      <div
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "85px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}
            whileHover={{ scale: 1.02 }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                background: "var(--grad-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(255,45,149,0.4)",
              }}
            >
              <Coffee size={24} color="white" />
            </div>
            <span
              className="font-playfair"
              style={{
                fontSize: "1.9rem",
                fontWeight: 900,
                background: "var(--grad-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.03em"
              }}
            >
              CupDate
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links - Only show for logged in users */}
        {user && (
          <div
            style={{ display: "flex", gap: "3rem", alignItems: "center" }}
            className="hidden lg:flex"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  textDecoration: "none",
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  transition: "all 0.3s",
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {l.label}
                <motion.div 
                  className="hover-line"
                  style={{ position: 'absolute', bottom: -5, left: 0, width: 0, height: 2, background: 'var(--pink-primary)', borderRadius: 2 }}
                  whileHover={{ width: '100%' }}
                />
              </Link>
            ))}
          </div>
        )}

        {/* Action Area */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {mounted && (
            <>
              {!user ? (
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <Link href="/login" className="hidden sm:block" style={{ textDecoration: "none" }}>
                    <motion.button
                      style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}
                      whileHover={{ color: "var(--pink-primary)" }}
                    >
                      Log in
                    </motion.button>
                  </Link>
                  
                  <Link href="/register" style={{ textDecoration: "none" }}>
                    <motion.button
                      className="btn-primary"
                      style={{ padding: "0.65rem 1.5rem", fontSize: "0.9rem", fontWeight: 700 }}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,45,149,0.5)' }}
                    >
                      Join
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Link href="/profile" style={{ textDecoration: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.4rem 0.4rem 1rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <span className="hidden md:block" style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user.name.split(' ')[0]}</span>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--pink-primary)', padding: '2px' }}>
                          <img 
                              src={user.photos?.[0]?.url || "/profile-woman-1.png"} 
                              alt={user.name} 
                              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                          />
                        </div>
                      </div>
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Hamburger */}
          <motion.button
            onClick={() => setOpen(true)}
            className="hamburger-btn"
            style={{ 
              background: "rgba(255,255,255,0.05)", 
              border: "1px solid rgba(255,255,255,0.1)", 
              borderRadius: "12px",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer", 
              color: "white" 
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(15px)', zIndex: 2000 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(320px, 85vw)",
                background: "rgba(10,10,12,0.95)",
                backdropFilter: "blur(30px)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                zIndex: 2001,
                boxShadow: "-20px 0 50px rgba(0,0,0,0.5)"
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: 'var(--grad-primary)', width: 32, height: 32, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Coffee size={18} color="white" />
                    </div>
                    <span className="font-playfair" style={{ fontWeight: 900, fontSize: '1.2rem' }}>CupDate</span>
                 </div>
                 <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {user ? (
                  <>
                    {links.map((l) => (
                      <Link
                        key={l.label}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "1.2rem",
                          padding: '1rem',
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: '16px',
                          border: '1px solid rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}
                      >
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--pink-primary)' }} />
                        {l.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout} style={{ marginTop: '2rem', width: '100%', padding: '1rem', background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', color: '#e74c3c', borderRadius: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                       <LogOut size={18} /> Sign Out
                    </button>
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <Link href="/login" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                        <button style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '16px', fontWeight: 700 }}>Login</button>
                     </Link>
                     <Link href="/register" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                        <button className="btn-primary" style={{ width: '100%', padding: '1.2rem' }}>Get Started Free</button>
                     </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 1024px) {
          .nav-links {
            display: none !important;
          }
        }
        @media (min-width: 1025px) {
          .hamburger-btn {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
