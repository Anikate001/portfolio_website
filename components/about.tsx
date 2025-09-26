"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="relative py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[var(--glass-edge)] bg-[var(--glass)] backdrop-blur-md p-6 md:p-8"
          role="region"
          aria-label="About Anikate Sharma"
        >
          <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            I am Anikate Sharma, a dedicated machine learning expert driven by curiosity and precision. My focus lies in
            designing intelligent systems that don’t just solve problems, but redefine how we approach them. With a
            balance of strong technical expertise, adaptability, and a relentless learning mindset, I bring value to
            teams looking for innovation at scale. I thrive in environments where complex challenges demand creativity,
            research, and practical execution, and I aim to make a lasting impact through the power of AI.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
