import Card from '../ui/Card'
import AnimatedNumber from '../ui/AnimatedNumber'

export default function SummaryCard({ label, value, icon: Icon, delay = 0, accent = 'forest' }) {
  const accentClasses = {
    forest: 'bg-forest-500/12 text-forest-500',
    slate: 'bg-slate-500/12 text-slate-500',
    lime: 'bg-lime-500/20 text-forest-600',
    clay: 'bg-clay-500/12 text-clay-500',
  }

  return (
    <Card delay={delay} hover>
      <div className="flex items-center justify-between mb-5">
        <p className="label-eyebrow">{label}</p>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accentClasses[accent]}`}>
          <Icon size={16} />
        </div>
      </div>
      <p className="text-3xl font-display font-semibold">
        <AnimatedNumber value={value} decimals={1} suffix=" kg" />
      </p>
      <p className="text-xs text-ink-light/45 dark:text-ink-dark/45 mt-1">CO₂e</p>
    </Card>
  )
}
