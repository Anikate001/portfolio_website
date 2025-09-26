"use client"

import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId = 0
    const onFrame = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const progress = max > 0 ? window.scrollY / max : 0
      if (ref.current) {
        ref.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`
      }
      rafId = requestAnimationFrame(onFrame)
    }
    rafId = requestAnimationFrame(onFrame)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-4 right-4 z-50 h-1 w-24 overflow-hidden rounded-full bg-[var(--glass-edge)]/50 pointer-events-none"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left bg-[var(--neon)] shadow-[0_0_12px_var(--neon)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}
