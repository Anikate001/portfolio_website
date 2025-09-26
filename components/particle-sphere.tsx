"use client"

import { useEffect, useRef } from "react"

type Vec3 = { x: number; y: number; z: number }

export default function ParticleSphere({
  density = 1000,
  radius = 140,
  className = "",
}: {
  density?: number
  radius?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId = 0
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    // Generate points on sphere surface
    const points: Vec3[] = []
    // Fibonacci sphere distribution for even spread
    const PHI = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < density; i++) {
      const y = 1 - (i / (density - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = PHI * i
      const x = Math.cos(theta) * r
      const z = Math.sin(theta) * r
      points.push({ x: x * radius, y: y * radius, z: z * radius })
    }

    let w = 0
    let h = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.floor(rect.width)
      h = Math.floor(rect.height)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Rotation state
    let rotX = -0.25
    let rotY = 0.35
    const speedX = 0.004
    const speedY = 0.006
    const wrapTau = (a: number) => {
      const PI2 = Math.PI * 2
      if (a > Math.PI) return a - PI2
      if (a < -Math.PI) return a + PI2
      return a
    }

    const project = (p: Vec3) => {
      const scale = 320 / (320 - p.z) // simple perspective
      return { x: p.x * scale + w / 2, y: p.y * scale + h / 2, s: scale }
    }

    const rotate = (p: Vec3, ax: number, ay: number) => {
      // rotate around X
      const y = p.y * Math.cos(ax) - p.z * Math.sin(ax)
      let z = p.y * Math.sin(ax) + p.z * Math.cos(ax)
      // rotate around Y
      const x = p.x * Math.cos(ay) + z * Math.sin(ay)
      z = -p.x * Math.sin(ay) + z * Math.cos(ay)
      return { x, y, z }
    }

    const draw = () => {
      rotX = wrapTau(rotX + speedX)
      rotY = wrapTau(rotY + speedY)

      ctx.clearRect(0, 0, w, h)

      // soft vignette
      const grd = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.15, w / 2, h / 2, Math.min(w, h) * 0.6)
      grd.addColorStop(0, "rgba(0,0,0,0.0)")
      grd.addColorStop(1, "rgba(0,0,0,0.35)")
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)

      // particle color
      ctx.fillStyle = "rgba(255,255,255,0.8)"
      for (let i = 0; i < points.length; i++) {
        const pr = rotate(points[i], rotX, rotY)
        const { x, y, s } = project(pr)
        const r = Math.max(0.3, 1.2 * s)
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [density, radius])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-[60vh] md:h-[80vh] rounded-[var(--radius-xl)] bg-[var(--color-card)]/0 ${className}`}
      aria-hidden="true"
    />
  )
}
