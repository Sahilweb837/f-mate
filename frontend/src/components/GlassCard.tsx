"use client";

import { motion } from "framer-motion";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`glass rounded-3xl p-6 transition-all duration-300 hover:shadow-neon ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {children}
    </motion.div>
  );
}
