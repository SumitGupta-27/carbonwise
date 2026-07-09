export const BADGE_DEFS = [
  {
    id: 'first-product',
    title: 'First Product Added',
    description: 'Logged your very first purchase.',
    icon: 'Sprout',
    test: (products) => products.length >= 1,
  },
  {
    id: 'hundred-kg',
    title: '100 kg CO₂ Tracked',
    description: 'Crossed 100 kg CO₂e of tracked footprint.',
    icon: 'Gauge',
    test: (products) => products.reduce((s, p) => s + p.footprint, 0) >= 100,
  },
  {
    id: 'eco-beginner',
    title: 'Eco Beginner',
    description: 'Tracked 5 products in CarbonWise.',
    icon: 'Leaf',
    test: (products) => products.length >= 5,
  },
  {
    id: 'carbon-aware',
    title: 'Carbon Aware',
    description: 'Tracked 10 products — you\u2019re building the habit.',
    icon: 'Award',
    test: (products) => products.length >= 10,
  },
  {
    id: 'low-impact-streak',
    title: 'Low-Impact Streak',
    description: 'Your last 3 purchases were all low impact.',
    icon: 'ShieldCheck',
    test: (products) => {
      if (products.length < 3) return false
      const last3 = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
      return last3.every((p) => p.footprint < 5)
    },
  },
]

export function getEarnedBadges(products) {
  return BADGE_DEFS.filter((b) => b.test(products))
}
