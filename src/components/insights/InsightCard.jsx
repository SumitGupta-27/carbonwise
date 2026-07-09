import Card from '../ui/Card'

export default function InsightCard({ icon: Icon, label, value, sub, delay = 0, tone = 'forest' }) {
  const toneClasses = {
    forest: 'bg-forest-500/12 text-forest-500',
    slate: 'bg-slate-500/12 text-slate-500',
    lime: 'bg-lime-500/20 text-forest-600',
    clay: 'bg-clay-500/12 text-clay-500',
  }

  return (
    <Card delay={delay} hover>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${toneClasses[tone]}`}>
        <Icon size={18} />
      </div>
      <p className="label-eyebrow mb-1.5">{label}</p>
      <p className="text-xl font-display font-semibold leading-snug">{value}</p>
      {sub && <p className="text-xs text-ink-light/45 dark:text-ink-dark/45 mt-1">{sub}</p>}
    </Card>
  )
}
