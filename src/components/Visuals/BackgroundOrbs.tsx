"use client";

import { motion } from "framer-motion";

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          translate: [0, 50, -30, 40, 0],
          translateY: [0, -50, 30, 40, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[600px] h-[600px] bg-[var(--primary-glow)] rounded-full blur-[80px] -top-[200px] -left-[200px]"
      />
      <motion.div
        animate={{
          translate: [0, 50, -30, 40, 0],
          translateY: [0, -50, 30, 40, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -7,
        }}
        className="absolute w-[500px] h-[500px] bg-[var(--secondary-glow)] rounded-full blur-[80px] -bottom-[150px] -right-[150px]"
      />
      <motion.div
        animate={{
          translate: [0, 50, -30, 40, 0],
          translateY: [0, -50, 30, 40, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -14,
        }}
        className="absolute w-[400px] h-[400px] bg-[rgba(249,212,35,0.3)] rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
