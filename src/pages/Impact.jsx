import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, PackageSearch } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import ProgressRing from '../components/ui/ProgressRing'
import AnimatedNumber from '../components/ui/AnimatedNumber'
import ImpactCard from '../components/impact/ImpactCard'
import { useData } from '../context/DataContext'
import { sumFootprint } from '../utils/stats'
import { buildImpactComparisons } from '../utils/equivalents'

export default function Impact() {
  const { products } = useData()
  const [selectedId, setSelectedId] = useState('total')

  const lifetime = useMemo(() => sumFootprint(products), [products])

  const activeKg = useMemo(() => {
    if (selectedId === 'total') return lifetime
    const p = products.find((prod) => prod.id === selectedId)
    return p ? p.footprint : lifetime
  }, [selectedId, products, lifetime])

  const comparisons = useMemo(() => buildImpactComparisons(activeKg), [activeKg])

  if (products.length === 0) {
    return (
      <PageWrapper>
        <EmptyState
          icon={PackageSearch}
          title="No footprint to compare yet"
          description="Add products to see how your emissions compare to everyday, real-world activities."
          action={<Link to="/add-product" className="btn-primary"><Plus size={16} /> Add a product</Link>}
        />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="max-w-xl mb-10">
        <p className="label-eyebrow mb-2">Impact</p>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-3">Put the number in context</h1>
        <p className="text-ink-light/60 dark:text-ink-dark/60">
          Raw kilograms of CO₂e are hard to picture. Here's what {activeKg.toFixed(1)} kg actually looks like.
        </p>
      </div>

      <Card className="flex flex-col sm:flex-row items-center gap-8 mb-8">
        <ProgressRing percent={100} size={140} strokeWidth={10} color="#1F7A5C">
          <div className="text-center">
            <p className="text-2xl font-display font-semibold">
              <AnimatedNumber value={activeKg} decimals={1} />
            </p>
            <p className="text-xs text-ink-light/45 dark:text-ink-dark/45">kg CO₂e</p>
          </div>
        </ProgressRing>
        <div className="flex-1">
          <label className="text-sm font-medium mb-1.5 block" htmlFor="impact-select">Compare</label>
          <select id="impact-select" className="input-field max-w-sm" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="total">Lifetime total ({lifetime.toFixed(1)} kg)</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name} ({p.footprint.toFixed(1)} kg)</option>
            ))}
          </select>
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 gap-5">
        {comparisons.map((c, i) => (
          <ImpactCard key={c.key} comparison={c} delay={i * 0.08} />
        ))}
      </div>
    </PageWrapper>
  )
}
