"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface CompatibilityScoreProps {
  score: number;
}

export default function CompatibilityScore({ score }: CompatibilityScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-4 p-8 glass rounded-3xl border border-pink-500/20 shadow-neon">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Animated Ring */}
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="64"
            cy="64"
            r="60"
            fill="transparent"
            stroke="rgba(255, 0, 127, 0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="60"
            fill="transparent"
            stroke="var(--pink-primary)"
            strokeWidth="8"
            strokeDasharray="377"
            initial={{ strokeDashoffset: 377 }}
            animate={{ strokeDashoffset: 377 - (377 * displayScore) / 100 }}
            transition={{ duration: 2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
           <motion.span 
             initial={{ scale: 0.5, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="text-4xl font-black text-white"
           >
             {displayScore}%
           </motion.span>
           <span className="text-[10px] text-pink-400 font-bold uppercase tracking-tighter">AI Score</span>
        </div>
      </div>
      
      <div className="text-center">
         <h3 className="text-xl font-bold text-white mb-2">Perfect Harmony</h3>
         <p className="text-sm text-white/50 max-w-[200px]">Our AI analysis suggests you both share a passion for Dark Roast & Jazz.</p>
      </div>
    </div>
  );
}
