"use client"

import { motion } from "framer-motion"

const skills = [
  "ML",
  "Deep Learning",
  "RAG Pipelines",
  "LangChain",
  "LLMs",
  "Agentic AI",
  "n8n Automation",
  "Prompt Engineering",
  "Python",
  "JavaScript",
  "HTML",
  "CSS",
]

function IconPulse() {
  return <span aria-hidden className="inline-block size-2 rounded-full bg-primary shadow-[0_0_10px_var(--neon)] mr-2" />
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-balance">Core Skills</h2>
          <p className="text-muted-foreground mt-2">A versatile toolkit across modern AI systems and automation.</p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {skills.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="group rounded-xl border border-[var(--glass-edge)] bg-[var(--glass)] backdrop-blur-md p-4 md:p-5 hover:ring-2 hover:ring-[var(--neon)]/60 hover:shadow-[0_0_30px_var(--neon)] transition"
              role="listitem"
              aria-label={label}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16 }}
                >
                  <IconPulse />
                </motion.span>
                <span className="text-sm md:text-base">{label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
