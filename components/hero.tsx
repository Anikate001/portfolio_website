"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import NeuralNetHeroOverlay from "@/components/neural-net-hero"
import GlowText from "@/components/glow-text"

export default function Hero() {
  const { scrollYProgress } = useScroll()
  // const overlayY = useTransform(scrollYProgress, [0, 1], [0, -100]) // overlay moves a bit faster
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]) // content moves slower for depth

  return (
    <section className="relative overflow-hidden pt-14 md:pt-20 pb-6 md:pb-10">
      <div>
        <NeuralNetHeroOverlay />
      </div>

      <div className="relative z-20 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ y: contentY }}
          className="mx-auto max-w-3xl text-center"
        >
          <GlowText as="p" text="Machine Learning Engineer" className="text-sm md:text-[0.95rem] tracking-[0.25em]" />
          <h1
            className="mt-3 text-pretty text-3xl md:text-5xl font-bold tracking-tight"
            style={{
              textShadow:
                "0 0 8px color-mix(in oklch, var(--neon) 35%, transparent), 0 0 18px color-mix(in oklch, var(--neon) 25%, transparent)",
            }}
          >
            Anikate Sharma
          </h1>
          <p className="mt-4 text-pretty text-muted-foreground">
            Exploring AI systems, automation pipelines, and agentic intelligence.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              asChild
              className="backdrop-blur-md bg-[var(--glass)] border border-[var(--glass-edge)] hover:ring-2 hover:ring-[var(--neon)]/60 hover:shadow-[0_0_30px_var(--neon)] transition"
            >
              <a
                href="https://linktr.ee/anikatesharma"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Contact Me via Linktree"
              >
                Contact Me
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="bg-transparent border border-[var(--glass-edge)] text-foreground hover:bg-[var(--glass)] hover:text-foreground"
            >
              <a href="#projects" aria-label="View Projects">
                View Projects
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
