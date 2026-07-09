import { Car, Zap, TreePine } from 'lucide-react'
import Card from '../ui/Card'
import AnimatedNumber from '../ui/AnimatedNumber'

const ICONS = {
  driving: Car,
  electricity: Zap,
  trees: TreePine,
}

export default function ImpactCard({ comparison, delay = 0 }) {
  const Icon = ICONS[comparison.key]

  return (
    <Card delay={delay} hover className="text-center">
      <div className="w-12 h-12 rounded-full bg-forest-500/12 flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon size={20} className="text-forest-500" />}
      </div>
      <p className="text-3xl font-display font-semibold mb-1">
        <AnimatedNumber value={comparison.value} decimals={comparison.unit === 'days' ? 1 : 0} />
      </p>
      <p className="text-xs text-ink-light/45 dark:text-ink-dark/45 uppercase tracking-wide mb-2">{comparison.unit}</p>
      <p className="text-sm text-ink-light/65 dark:text-ink-dark/65">{comparison.label}</p>
    </Card>
  )
}
