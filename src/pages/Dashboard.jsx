import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, CalendarRange, History as HistoryIcon, Infinity as InfinityIcon, Plus, PackageSearch } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import SummaryCard from '../components/dashboard/SummaryCard'
import EmissionsLineChart from '../components/dashboard/EmissionsLineChart'
import EmissionsBarChart from '../components/dashboard/EmissionsBarChart'
import CategoryPieChart from '../components/dashboard/CategoryPieChart'
import { useData } from '../context/DataContext'
import { getPeriodTotals, getCategoryBreakdown, getMonthlyTrend, getWeeklyTrend } from '../utils/stats'

export default function Dashboard() {
  const { products } = useData()

  const totals = useMemo(() => getPeriodTotals(products), [products])
  const categoryData = useMemo(() => getCategoryBreakdown(products), [products])
  const monthlyTrend = useMemo(() => getMonthlyTrend(products, 6), [products])
  const weeklyTrend = useMemo(() => getWeeklyTrend(products, 8), [products])

  if (products.length === 0) {
    return (
      <PageWrapper>
        <EmptyState
          icon={PackageSearch}
          title="No products tracked yet"
          description="Add your first purchase to start seeing your carbon footprint dashboard come to life."
          action={
            <Link to="/add-product" className="btn-primary">
              <Plus size={16} /> Add your first product
            </Link>
          }
        />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="label-eyebrow mb-2">Dashboard</p>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold">Your footprint at a glance</h1>
        </div>
        <Link to="/add-product" className="btn-primary">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <SummaryCard label="Weekly" value={totals.weekly} icon={CalendarDays} accent="forest" delay={0} />
        <SummaryCard label="Monthly" value={totals.monthly} icon={CalendarRange} accent="slate" delay={0.05} />
        <SummaryCard label="Yearly" value={totals.yearly} icon={HistoryIcon} accent="lime" delay={0.1} />
        <SummaryCard label="Lifetime" value={totals.lifetime} icon={InfinityIcon} accent="clay" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" delay={0.1}>
          <h3 className="font-display font-semibold text-lg mb-1">Monthly trend</h3>
          <p className="text-xs text-ink-light/45 dark:text-ink-dark/45 mb-4">Last 6 months, kg CO₂e</p>
          <EmissionsLineChart data={monthlyTrend} />
        </Card>

        <Card delay={0.15}>
          <h3 className="font-display font-semibold text-lg mb-1">By category</h3>
          <p className="text-xs text-ink-light/45 dark:text-ink-dark/45 mb-4">Share of total footprint</p>
          <CategoryPieChart data={categoryData} />
        </Card>

        <Card className="lg:col-span-3" delay={0.2}>
          <h3 className="font-display font-semibold text-lg mb-1">Weekly breakdown</h3>
          <p className="text-xs text-ink-light/45 dark:text-ink-dark/45 mb-4">Last 8 weeks, kg CO₂e</p>
          <EmissionsBarChart data={weeklyTrend} />
        </Card>
      </div>
    </PageWrapper>
  )
}
