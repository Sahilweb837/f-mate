"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, X, Star, Coffee, MapPin, CheckCircle, Loader2, Zap } from "lucide-react";
import api from "@/lib/api";

function SwipeCard({
  profile,
  onSwipe,
  isTop,
}: {
  profile: any;
  onSwipe: (dir: "left" | "right" | "super") => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 140) onSwipe("right");
    else if (info.offset.x < -140) onSwipe("left");
    else x.set(0);
  };

  const mainPhoto = profile.photos && profile.photos.length > 0 
    ? profile.photos[0].photo_url 
    : "/profile-woman-1.png";

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, position: "absolute", width: "100%", height: "100%", cursor: isTop ? "grab" : "default", zIndex: isTop ? 10 : 1 }}
      whileTap={{ cursor: "grabbing" }}
      animate={!isTop ? { scale: 0.95, y: 20, opacity: 0.6 } : { scale: 1, y: 0, opacity: 1 }}
      transition={{ duration: 0.4, type: 'spring', damping: 20 }}
    >
      <motion.div style={{ opacity: likeOpacity, position: 'absolute', top: 50, left: 50, zIndex: 20, border: '6px solid #2ecc71', color: '#2ecc71', padding: '10px 25px', borderRadius: 12, fontWeight: 900, fontSize: '2.5rem', transform: 'rotate(-15deg)', backdropFilter: 'blur(10px)' }}>LIKE</motion.div>
      <motion.div style={{ opacity: nopeOpacity, position: 'absolute', top: 50, right: 50, zIndex: 20, border: '6px solid #e74c3c', color: '#e74c3c', padding: '10px 25px', borderRadius: 12, fontWeight: 900, fontSize: '2.5rem', transform: 'rotate(15deg)', backdropFilter: 'blur(10px)' }}>NOPE</motion.div>

      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "40px",
          overflow: "hidden",
          background: "#0a0a0c",
          border: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7)"
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img src={mainPhoto} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.95) 100%)' }} />
        </div>

        {/* Compatibility Badge */}
        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,45,149,0.1)', backdropFilter: 'blur(15px)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid rgba(255,45,149,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--pink-primary)', fontWeight: 800, fontSize: '0.8rem' }}>
           <Zap size={14} fill="var(--pink-primary)" /> 98% Compatibility
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.75rem' }}>
            <h3 className="font-playfair" style={{ fontSize: '2.5rem', fontWeight: 900 }}>{profile.name}</h3>
            {profile.profile_complete && (
              <div style={{ background: 'var(--grad-primary)', padding: '0.2rem 0.8rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 0 15px rgba(255,45,149,0.4)' }}>
                 <CheckCircle size={14} color="white" fill="white" />
                 <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>Verified</span>
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            <MapPin size={16} /> {profile.location || 'Mumbai, IN'}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
             <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
               <Coffee size={16} color="var(--pink-primary)" /> {profile.coffee_style || 'Coffee Lover'}
             </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>{profile.bio}</p>
          
          <div style={{ display: 'flex', gap: '1.25rem' }}>
             <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.25rem', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '0.6rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Heart size={20} color="var(--pink-primary)" fill="var(--pink-primary)" />
                <span style={{ fontSize: '1rem', fontWeight: 800 }}>2.4k Likes</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProfileCards() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/discover');
        setCards(res.data);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSwipe = async (dir: string) => {
    if (cards.length === 0) return;
    
    const swipedUser = cards[0];
    
    try {
        await api.post('/swipes', {
            swiped_id: swipedUser.id,
            type: dir === 'right' ? 'like' : (dir === 'super' ? 'super_like' : 'dislike')
        });
        
        // Mock match for demo
        if (dir === 'right' && Math.random() > 0.5) {
            setMatched(true);
        }
    } catch (err) {
        console.error("Swipe failed:", err);
    }

    setTimeout(() => {
      setMatched(false);
      setCards(prev => {
        const next = [...prev];
        next.shift();
        return next;
      });
    }, 1500);
  };

  if (loading) return (
    <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pink-primary)' }}>
       <Loader2 size={40} className="animate-spin" />
    </div>
  );

  return (
    <section style={{ padding: "120px 1.5rem", position: "relative", zIndex: 1, background: "var(--bg-deep)" }}>
      <div style={{ maxWidth: "1250px", margin: "0 auto", textAlign: "center" }}>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "5rem" }}>
           <h2 className="font-playfair" style={{ fontSize: "4rem", fontWeight: 900, marginBottom: "1.5rem" }}>Premium <span style={{ background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Discovery</span></h2>
           <p style={{ color: "var(--text-muted)", fontSize: "1.3rem", maxWidth: "600px", margin: "0 auto" }}>Real profiles. Real connections. Experience dating at its finest.</p>
        </motion.div>

        {cards.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "450px", height: "650px" }}>
              <AnimatePresence>
                {cards.slice(0, 2).map((profile, i) => (
                  <SwipeCard key={profile.id} profile={profile} isTop={i === 0} onSwipe={handleSwipe} />
                ))}
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
               <motion.button
                 whileHover={{ scale: 1.1, rotate: -10 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => handleSwipe('left')}
                 style={{ width: 80, height: 80, borderRadius: "50%", background: "#1c1c22", color: "#e74c3c", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 15px 30px rgba(0,0,0,0.4)" }}
               >
                 <X size={32} strokeWidth={3} />
               </motion.button>

               <motion.button
                 whileHover={{ scale: 1.1, y: -5 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => handleSwipe('super')}
                 style={{ width: 64, height: 64, borderRadius: "50%", background: "#1c1c22", color: "#3498db", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
               >
                 <Star size={28} fill="#3498db" />
               </motion.button>

               <motion.button
                 whileHover={{ scale: 1.1, rotate: 10 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => handleSwipe('right')}
                 style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--grad-primary)", color: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 15px 40px rgba(255,45,149,0.5)" }}
               >
                 <Heart size={32} fill="white" strokeWidth={3} />
               </motion.button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '6rem 0', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
             <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Coffee size={50} style={{ opacity: 0.2 }} />
             </div>
             <div>
                <h4 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>That's everyone!</h4>
                <p>Check back later or adjust your filters to find more matches.</p>
             </div>
             <button className="btn-outline" onClick={() => window.location.reload()}>Refresh Feed</button>
          </div>
        )}

      </div>

      <AnimatePresence>
        {matched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backdropFilter: 'blur(20px)' }}
          >
             <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', bounce: 0.5 }} style={{ width: 150, height: 150, background: 'var(--grad-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', boxShadow: '0 0 50px rgba(255,45,149,0.6)' }}>
                <Heart size={80} color="white" fill="white" />
             </motion.div>
             <h2 className="font-playfair" style={{ fontSize: '5rem', fontWeight: 900, color: 'white', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>It's a Match!</h2>
             <p style={{ color: 'var(--text-muted)', fontSize: '1.4rem', marginBottom: '4rem', maxWidth: '500px', lineHeight: 1.5 }}>You and {cards[0]?.name} liked each other! Start a conversation over coffee. ☕</p>
             <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button className="btn-primary" style={{ padding: '1rem 3rem' }} onClick={() => window.location.href = '/chat'}>Send a Message</button>
                <button className="btn-outline" style={{ padding: '1rem 3rem' }} onClick={() => setMatched(false)}>Keep Swiping</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
