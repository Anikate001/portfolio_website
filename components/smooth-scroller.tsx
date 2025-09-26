"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => {
      // @ts-ignore
      lenis?.destroy?.()
    }
  }, [])
  return null
}
