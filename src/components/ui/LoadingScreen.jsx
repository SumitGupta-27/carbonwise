import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-canvas-light dark:bg-canvas-dark">
      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="36"
            cy="36"
            r={10 + i * 9}
            fill="none"
            stroke={i === 2 ? '#A8E063' : '#1F7A5C'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * (10 + i * 9)}
            initial={{ strokeDashoffset: 2 * Math.PI * (10 + i * 9) }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.1, delay: i * 0.15, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
            opacity={0.4 + i * 0.2}
          />
        ))}
      </svg>
      <p className="label-eyebrow">Growing your dashboard…</p>
    </div>
  )
}
