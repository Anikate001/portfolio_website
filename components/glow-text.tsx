"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { JSX } from "react"

export default function GlowText({
  text,
  className,
  as: Tag = "p",
}: {
  text: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}) {
  return (
    <Tag className={cn("font-semibold tracking-[0.25em] uppercase text-muted-foreground", className)}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block will-change-[filter,opacity] animate-[letterShimmer_1.6s_ease-in-out_infinite]"
          style={{
            animationDelay: `${i * 0.06}s`,
            textShadow: "0 0 10px var(--neon), 0 0 20px color-mix(in oklch, var(--neon) 60%, transparent)",
          }}
          aria-hidden="true"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
