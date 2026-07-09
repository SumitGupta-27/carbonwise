function daysAgo(iso) {
  return (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)
}

export function sumFootprint(products) {
  return products.reduce((s, p) => s + p.footprint, 0)
}

export function getPeriodTotals(products) {
  const weekly = sumFootprint(products.filter((p) => daysAgo(p.createdAt) <= 7))
  const monthly = sumFootprint(products.filter((p) => daysAgo(p.createdAt) <= 30))
  const yearly = sumFootprint(products.filter((p) => daysAgo(p.createdAt) <= 365))
  const lifetime = sumFootprint(products)
  return { weekly, monthly, yearly, lifetime }
}

export function getCategoryBreakdown(products) {
  const map = {}
  products.forEach((p) => {
    map[p.category] = (map[p.category] || 0) + p.footprint
  })
  return Object.entries(map)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value)
}

/** Monthly totals for the last `months` months, oldest first. */
export function getMonthlyTrend(products, months = 6) {
  const now = new Date()
  const buckets = []
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString(undefined, { month: 'short' }), total: 0 })
  }
  products.forEach((p) => {
    const d = new Date(p.createdAt)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    const bucket = buckets.find((b) => b.key === key)
    if (bucket) bucket.total += p.footprint
  })
  return buckets.map((b) => ({ ...b, total: Math.round(b.total * 100) / 100 }))
}

export function getWeeklyTrend(products, weeks = 8) {
  const now = new Date()
  const buckets = []
  for (let i = weeks - 1; i >= 0; i--) {
    buckets.push({ key: i, label: i === 0 ? 'This wk' : `-${i}w`, total: 0 })
  }
  products.forEach((p) => {
    const diffDays = daysAgo(p.createdAt)
    const weekIndex = Math.floor(diffDays / 7)
    const bucket = buckets.find((b) => b.key === weekIndex)
    if (bucket) bucket.total += p.footprint
  })
  return buckets.map((b) => ({ ...b, total: Math.round(b.total * 100) / 100 }))
}

export function getInsights(products) {
  if (products.length === 0) {
    return {
      highest: null,
      lowest: null,
      average: 0,
      topCategory: null,
      mostActiveMonth: null,
    }
  }
  const sorted = [...products].sort((a, b) => b.footprint - a.footprint)
  const highest = sorted[0]
  const lowest = sorted[sorted.length - 1]
  const average = Math.round((sumFootprint(products) / products.length) * 100) / 100

  const categoryBreakdown = getCategoryBreakdown(products)
  const topCategory = categoryBreakdown[0] || null

  const monthCounts = {}
  products.forEach((p) => {
    const d = new Date(p.createdAt)
    const key = d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    monthCounts[key] = (monthCounts[key] || 0) + 1
  })
  const mostActiveMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0] || null

  return { highest, lowest, average, topCategory, mostActiveMonth }
}
