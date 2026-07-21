import { Clock3 } from 'lucide-react'

export default function ComingSoonBadge({ className = '' }) {
  return <span className={`inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-lime-500/15 px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-forest-700 dark:text-lime-400 ${className}`}><Clock3 size={13} /> Coming soon</span>
}
