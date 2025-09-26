"use client"

import { useEffect, useRef, useState } from "react"

type Node = {
  x: number
  y: number
  r: number
  brightness: number
  nextFireAt: number
}

type Edge = {
  a: number
  b: number
}

function nowMs() {
  return performance.now()
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function NeuralNetHeroOverlay() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const nodesRef = useRef<Node[]>([])
  const edgesRef = useRef<Edge[]>([])
  const currentEdgeRef = useRef<number>(0)
  const edgeStartTimeRef = useRef<number>(nowMs())
  const [scrollY, setScrollY] = useState(0)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number | null>(null)

  const neonBlue = "rgba(38, 179, 255, 1)" // bright line
  const neonBlueDim = "rgba(38, 179, 255, 0.3)" // base edges
  const orange = "rgba(255, 138, 0, 0.8)" // node glow
  const orangeStroke = "rgba(255, 170, 64, 0.9)" // node outline

  const HEADER_HEIGHT = 560
  const MAX_WIDTH_CLAMP = 1400
  const LAYER_PADDING_X = 64
  const LAYER_PADDING_Y = 56

  const EDGE_PULSE_DURATION = 533 // 50% faster than 800ms to speed up pulse animation
  const NODE_FIRE_MIN = 1100
  const NODE_FIRE_MAX = 3000
  const HOVER_RADIUS = 90
  const TRANSLATE_MAX = 40
  const FADE_DISTANCE = 420

  function buildNetwork(width: number, height: number) {
    const layers = [6, 5, 4, 3] // input, hidden1, hidden2, output

    const left = LAYER_PADDING_X
    const right = width - LAYER_PADDING_X
    const top = LAYER_PADDING_Y
    const bottom = height - LAYER_PADDING_Y
    const layerCount = layers.length

    const nodes: Node[] = []
    const layerX: number[] = []
    for (let i = 0; i < layerCount; i++) {
      layerX.push(left + (i * (right - left)) / (layerCount - 1))
    }

    for (let li = 0; li < layerCount; li++) {
      const count = layers[li]
      for (let i = 0; i < count; i++) {
        const y = top + (i * (bottom - top)) / Math.max(1, count - 1)
        const r = rand(3, 6)
        nodes.push({
          x: layerX[li] + rand(-6, 6),
          y,
          r,
          brightness: 0.35,
          nextFireAt: nowMs() + rand(NODE_FIRE_MIN, NODE_FIRE_MAX),
        })
      }
    }

    const edges: Edge[] = []
    let offset = 0
    for (let li = 0; li < layerCount - 1; li++) {
      const countA = layers[li]
      const countB = layers[li + 1]
      for (let a = 0; a < countA; a++) {
        for (let b = 0; b < countB; b++) {
          edges.push({ a: offset + a, b: offset + countA + b })
        }
      }
      offset += countA
    }

    nodesRef.current = nodes
    edgesRef.current = edges
    currentEdgeRef.current = 0
    edgeStartTimeRef.current = nowMs()
  }

  function resizeCanvas() {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return
    const rect = wrapper.getBoundingClientRect()
    const width = Math.min(rect.width, MAX_WIDTH_CLAMP)
    const height = rect.height

    const dpr = Math.max(1, window.devicePixelRatio || 1)
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext("2d")
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    buildNetwork(width, height)
  }

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onLeave = () => {
      mouseRef.current = null
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  useEffect(() => {
    resizeCanvas()
    const onResize = () => resizeCanvas()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      const t = nowMs()
      const nodes = nodesRef.current
      const edges = edgesRef.current
      const currentEdge = edges[currentEdgeRef.current]

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // base edges
      ctx.lineWidth = 1
      ctx.strokeStyle = neonBlueDim
      ctx.shadowBlur = 0
      ctx.shadowColor = "transparent"
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i]
        const a = nodes[e.a]
        const b = nodes[e.b]
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      // active edge pulse
      if (currentEdge) {
        const a = nodes[currentEdge.a]
        const b = nodes[currentEdge.b]
        ctx.lineWidth = 1.5
        ctx.strokeStyle = neonBlue
        ctx.shadowBlur = 10
        ctx.shadowColor = neonBlue
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()

        const edgeElapsed = t - edgeStartTimeRef.current
        const progress = Math.min(1, edgeElapsed / EDGE_PULSE_DURATION)
        const dx = b.x - a.x
        const dy = b.y - a.y
        const px = a.x + dx * progress
        const py = a.y + dy * progress
        ctx.fillStyle = neonBlue
        ctx.beginPath()
        ctx.arc(px, py, 2.6, 0, Math.PI * 2)
        ctx.fill()

        if (progress >= 1) {
          currentEdgeRef.current = (currentEdgeRef.current + 1) % edges.length
          edgeStartTimeRef.current = t
        }
      }

      // nodes glow + firing
      const mouse = mouseRef.current
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        if (t >= n.nextFireAt) {
          n.brightness = 1
          n.nextFireAt = t + rand(NODE_FIRE_MIN, NODE_FIRE_MAX)
        }

        let hoverBoost = 0
        if (mouse) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < HOVER_RADIUS) hoverBoost = (HOVER_RADIUS - d) / HOVER_RADIUS
        }

        const glow = Math.min(1.4, n.brightness + 0.35 + hoverBoost * 0.3)

        ctx.shadowBlur = 18 * glow
        ctx.shadowColor = orange
        ctx.fillStyle = orange
        ctx.strokeStyle = orangeStroke
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        n.brightness *= 0.95
        if (n.brightness < 0.2) n.brightness = 0.2
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // const fadeProgress = Math.min(1, scrollY / FADE_DISTANCE)
  // const translateY = -TRANSLATE_MAX * fadeProgress
  // const opacity = 1 - fadeProgress
  const fadeProgress = 0
  const translateY = 0
  const opacity = 1

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2"
      style={{
        width: "100%",
        maxWidth: MAX_WIDTH_CLAMP,
        height: HEADER_HEIGHT,
        transform: "translate3d(-50%, 0, 0)",
        opacity: 1,
        willChange: "transform",
        backfaceVisibility: "hidden",
        contain: "layout paint", // isolate layout/paint to prevent scroll-induced drift
      }}
    >
      <canvas ref={canvasRef} className="pointer-events-none block w-full h-full" />
    </div>
  )
}
