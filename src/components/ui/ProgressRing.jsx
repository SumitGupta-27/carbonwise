import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * A concentric "growth ring" — the recurring signature motif of CarbonWise.
 * `rings` lets us stack 1-3 tree-ring-like arcs at different radii/opacities,
 * echoing the tree-equivalent metaphor used across the Impact page.
 */
export default function ProgressRing({ percent = 0, size = 120, strokeWidth = 10, color = '#1F7A5C', trackColor, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [animatedPercent, setAnimatedPercent] = useState(0)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (!inView) return
    const clamped = Math.max(0, Math.min(100, percent))
    let start
    function step(ts) {
      if (start === undefined) start = ts
      const progress = Math.min((ts - start) / 900, 1)
      setAnimatedPercent(clamped * (1 - Math.pow(1 - progress, 3)))
      if (progress < 1) requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, percent])

  const offset = circumference - (animatedPercent / 100) * circumference

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor || 'currentColor'}
          strokeOpacity={0.12}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.2s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}
