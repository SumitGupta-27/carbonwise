import { estimateCarbonFootprint } from './carbonCalculator'
import { uid } from './formatters'

const seeds = [
  { name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', weight: 0.35, material: 'Plastic', distance: 8200, shippingMethod: 'Air', daysAgo: 2 },
  { name: 'Organic Cotton T-Shirt', category: 'Clothing', weight: 0.2, material: 'Cotton', distance: 1200, shippingMethod: 'Road', daysAgo: 5 },
  { name: 'Stainless Steel Water Bottle', category: 'Household', weight: 0.4, material: 'Metal', distance: 600, shippingMethod: 'Road', daysAgo: 9 },
  { name: 'Oak Bookshelf', category: 'Furniture', weight: 22, material: 'Wood', distance: 450, shippingMethod: 'Road', daysAgo: 14 },
  { name: 'Bluetooth Speaker', category: 'Electronics', weight: 0.6, material: 'Plastic', distance: 9100, shippingMethod: 'Sea', daysAgo: 20 },
  { name: 'Running Shoes', category: 'Sports', weight: 0.9, material: 'Mixed', distance: 3000, shippingMethod: 'Air', daysAgo: 27 },
  { name: 'Glass Storage Jars (Set of 4)', category: 'Household', weight: 2.1, material: 'Glass', distance: 700, shippingMethod: 'Road', daysAgo: 33 },
  { name: 'Paperback Novel Bundle', category: 'Books', weight: 1.3, material: 'Mixed', distance: 300, shippingMethod: 'Road', daysAgo: 41 },
  { name: 'Skincare Gift Set', category: 'Beauty', weight: 0.5, material: 'Glass', distance: 2600, shippingMethod: 'Sea', daysAgo: 48 },
  { name: 'Laptop Stand', category: 'Electronics', weight: 1.1, material: 'Metal', distance: 7400, shippingMethod: 'Air', daysAgo: 55 },
  { name: 'Ceramic Dinnerware Set', category: 'Household', weight: 4.5, material: 'Mixed', distance: 5200, shippingMethod: 'Sea', daysAgo: 63 },
  { name: 'Yoga Mat', category: 'Sports', weight: 1.2, material: 'Plastic', distance: 1800, shippingMethod: 'Road', daysAgo: 71 },
]

function isoDaysAgo(days) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

export function buildDummyProducts() {
  return seeds.map((s) => {
    const footprint = estimateCarbonFootprint(s)
    return {
      id: uid(),
      name: s.name,
      category: s.category,
      weight: s.weight,
      material: s.material,
      distance: s.distance,
      shippingMethod: s.shippingMethod,
      footprint,
      createdAt: isoDaysAgo(s.daysAgo),
    }
  })
}
