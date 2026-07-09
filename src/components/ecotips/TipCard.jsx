import Card from '../ui/Card'

export default function TipCard({ icon: Icon, title, text, delay = 0 }) {
  return (
    <Card delay={delay} hover>
      <div className="w-11 h-11 rounded-xl bg-forest-500/12 flex items-center justify-center mb-4">
        <Icon size={20} className="text-forest-500" />
      </div>
      <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-ink-light/60 dark:text-ink-dark/60 leading-relaxed">{text}</p>
    </Card>
  )
}
