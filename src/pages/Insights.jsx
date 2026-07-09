import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, Gauge, Tags, CalendarClock, Plus, PackageSearch } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import InsightCard from '../components/insights/InsightCard'
import EmissionsLineChart from '../components/dashboard/EmissionsLineChart'
import AchievementBadge from '../components/badges/AchievementBadge'
import { useData } from '../context/DataContext'
import { getInsights, getMonthlyTrend } from '../utils/stats'
import { formatKg } from '../utils/formatters'
import { BADGE_DEFS, getEarnedBadges } from '../utils/achievements'

export default function Insights() {
  const { products } = useData()
  const insights = useMemo(() => getInsights(products), [products])
  const trend = useMemo(() => getMonthlyTrend(products, 6), [products])
  const earnedIds = useMemo(() => new Set(getEarnedBadges(products).map((b) => b.id)), [products])

  if (products.length === 0) {
    return (
      <PageWrapper>
        <EmptyState
          icon={PackageSearch}
          title="Not enough data yet"
          description="Add a few products to unlock personalized insights about your habits."
          action={<Link to="/add-product" className="btn-primary"><Plus size={16} /> Add a product</Link>}
        />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="mb-10">
        <p className="label-eyebrow mb-2">Insights</p>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold">What your habits reveal</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <InsightCard
          icon={TrendingUp}
          label="Highest emitter"
          value={insights.highest?.name}
          sub={formatKg(insights.highest?.footprint)}
          tone="clay"
          delay={0}
        />
        <InsightCard
          icon={TrendingDown}
          label="Lowest emitter"
          value={insights.lowest?.name}
          sub={formatKg(insights.lowest?.footprint)}
          tone="forest"
          delay={0.05}
        />
        <InsightCard
          icon={Gauge}
          label="Average per product"
          value={formatKg(insights.average)}
          sub={`Across ${products.length} products`}
          tone="slate"
          delay={0.1}
        />
        <InsightCard
          icon={Tags}
          label="Top emitting category"
          value={insights.topCategory?.name}
          sub={formatKg(insights.topCategory?.value)}
          tone="lime"
          delay={0.15}
        />
        <InsightCard
          icon={CalendarClock}
          label="Most active month"
          value={insights.mostActiveMonth?.[0]}
          sub={`${insights.mostActiveMonth?.[1]} products logged`}
          tone="forest"
          delay={0.2}
        />
        <Card delay={0.25} hover className="flex flex-col justify-center">
          <p className="label-eyebrow mb-1.5">Total products</p>
          <p className="text-xl font-display font-semibold">{products.length} tracked</p>
        </Card>
      </div>

      <Card className="mb-10" delay={0.2}>
        <h3 className="font-display font-semibold text-lg mb-1">Monthly trend</h3>
        <p className="text-xs text-ink-light/45 dark:text-ink-dark/45 mb-4">Updates automatically as you log products</p>
        <EmissionsLineChart data={trend} />
      </Card>

      <div className="mb-6">
        <p className="label-eyebrow mb-2">Achievements</p>
        <h2 className="text-2xl font-display font-semibold">Milestones you've unlocked</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {BADGE_DEFS.map((badge, i) => (
          <AchievementBadge key={badge.id} badge={badge} earned={earnedIds.has(badge.id)} delay={i * 0.05} />
        ))}
      </div>
    </PageWrapper>
  )
}
