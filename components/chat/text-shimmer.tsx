"use client"

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as React from 'react';

interface TextShimmerProps {
  children: string;
  className?: string;
  duration?: number;
}

export function TextShimmer({ children, className, duration = 2 }: TextShimmerProps) {
  return (
    <motion.div
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-20px),var(--base-gradient-color),#0000_calc(50%+20px))] [background-repeat:no-repeat,padding-box]",
        "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      style={{
        backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
      } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}