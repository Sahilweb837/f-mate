"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Video, Mic, PhoneOff, MicOff, VideoOff, Maximize2, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  remoteUser: any;
}

export default function VideoCallModal({ isOpen, onClose, remoteUser }: VideoCallModalProps) {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (isOpen && !videoOff) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Camera access denied", err));
    }
  }, [isOpen, videoOff]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.95)",
          backdropFilter: "blur(20px)",
          zIndex: 3000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem"
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "16/9",
            background: "#0a0a0c",
            borderRadius: "40px",
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 50px 100px rgba(0,0,0,0.8)"
          }}
        >
          {/* Remote Video Placeholder */}
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
             <img 
               src={remoteUser?.photos?.[0]?.url || "/profile-woman-1.png"} 
               style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isActive ? 1 : 0.3 }} 
               alt="Remote User" 
             />
             {!isActive && (
               <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ width: 120, height: 120, borderRadius: "50%", background: "var(--grad-primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 50px var(--pink-glow)" }}
                  >
                     <Video size={50} color="white" />
                  </motion.div>
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "2rem", fontWeight: 900 }}>Calling {remoteUser?.name}...</h3>
                    <p style={{ color: "var(--text-muted)" }}>Waiting for connection</p>
                  </div>
                  <button 
                    onClick={() => setIsActive(true)}
                    className="btn-primary"
                    style={{ padding: "1rem 3rem" }}
                  >
                    Accept Preview
                  </button>
               </div>
             )}
          </div>

          {/* Local Video Pip */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '2rem', 
              right: '2rem', 
              width: '160px', 
              aspectRatio: '3/4', 
              background: '#1c1c22', 
              borderRadius: '24px', 
              border: '2px solid rgba(255,255,255,0.2)',
              overflow: 'hidden',
              zIndex: 10
            }}
          >
             {videoOff ? (
               <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={40} color="var(--text-dim)" />
               </div>
             ) : (
               <video 
                 ref={localVideoRef} 
                 autoPlay 
                 muted 
                 playsInline 
                 style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
               />
             )}
          </div>

          {/* Call Status Overlay */}
          <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
             <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '0.5rem 1.2rem', borderRadius: '50px', color: 'white', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: isActive ? '#ff4d4f' : '#ffc107', animation: isActive ? 'pulse-pink 1.5s infinite' : 'none' }} />
                {isActive ? `LIVE ${formatTime(timer)}` : 'CONNECTING'}
             </div>
             <div style={{ color: 'white', fontWeight: 900, fontSize: '1.8rem', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
               {remoteUser?.name}
             </div>
          </div>

          {/* Controls Bar */}
          <div style={{ 
            position: 'absolute', 
            bottom: '2.5rem', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            display: 'flex', 
            gap: '1.5rem', 
            alignItems: 'center', 
            background: 'rgba(5,5,5,0.6)', 
            backdropFilter: 'blur(30px)', 
            padding: '1.2rem 2.5rem', 
            borderRadius: '100px', 
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
          }}>
             <button onClick={() => setMuted(!muted)} style={{ width: 50, height: 50, borderRadius: '50%', background: muted ? '#ff4d4f' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: "all 0.3s" }}>
               {muted ? <MicOff size={22} /> : <Mic size={22} />}
             </button>
             <button onClick={() => setVideoOff(!videoOff)} style={{ width: 50, height: 50, borderRadius: '50%', background: videoOff ? '#ff4d4f' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: "all 0.3s" }}>
               {videoOff ? <VideoOff size={22} /> : <Video size={22} />}
             </button>
             
             <button 
               onClick={() => {
                 setIsActive(false);
                 onClose();
               }} 
               style={{ 
                 width: 70, 
                 height: 70, 
                 borderRadius: '50%', 
                 background: '#ff4d4f', 
                 border: 'none', 
                 color: 'white', 
                 cursor: 'pointer', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 boxShadow: '0 15px 30px rgba(255,77,79,0.4)',
                 transform: "scale(1.1)"
               }}
             >
               <PhoneOff size={30} />
             </button>
             
             <button style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Maximize2 size={22} />
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
