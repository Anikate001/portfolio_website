"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const email = "anikatesharma923@gmail.com"
  const phone = "+91 92435 66606"

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({ title: "Copied to clipboard", description: text })
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast({ title: "Copy failed", description: "Please try again." })
    }
  }

  return (
    <section id="contact" className="relative py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[var(--glass-edge)] bg-[var(--glass)] backdrop-blur-md p-6 md:p-8"
          role="region"
          aria-label="Contact"
        >
          <h2 className="text-2xl md:text-3xl font-semibold">Get in touch</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[var(--glass-edge)] bg-[var(--glass-soft)] p-3">
                <div className="text-sm">
                  <div className="text-muted-foreground">Email</div>
                  <a href={`mailto:${email}`} className="text-foreground underline-offset-4 hover:underline">
                    {email}
                  </a>
                </div>
                <Button
                  variant="secondary"
                  className="bg-transparent border border-[var(--glass-edge)]"
                  onClick={() => copy(email)}
                >
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[var(--glass-edge)] bg-[var(--glass-soft)] p-3">
                <div className="text-sm">
                  <div className="text-muted-foreground">Phone</div>
                  <span className="text-foreground">{phone}</span>
                </div>
                <Button
                  variant="secondary"
                  className="bg-transparent border border-[var(--glass-edge)]"
                  onClick={() => copy(phone)}
                >
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[var(--glass-edge)] bg-[var(--glass-soft)] p-3">
                <div className="text-sm">
                  <div className="text-muted-foreground">GitHub</div>
                  <a
                    href="https://github.com/Anikate001"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    github.com/Anikate001
                  </a>
                </div>
                <Button
                  asChild
                  className="bg-[var(--glass)] border border-[var(--glass-edge)] hover:bg-[var(--glass-strong)] hover:animate-[pulseGlow_1.6s_ease-in-out_infinite]"
                >
                  <a href="https://github.com/Anikate001" target="_blank" rel="noreferrer noopener">
                    Open
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[var(--glass-edge)] bg-[var(--glass-soft)] p-3">
                <div className="text-sm">
                  <div className="text-muted-foreground">Resume</div>
                  <span className="text-foreground">Request via email</span>
                </div>
                <Button asChild variant="secondary" className="bg-transparent border border-[var(--glass-edge)]">
                  <a
                    href={`mailto:${email}?subject=Resume%20Request&body=Hi%20Anikate,%20please%20share%20your%20latest%20resume.`}
                  >
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
