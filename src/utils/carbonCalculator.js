// CarbonWise estimation model
// -----------------------------------------------------------------------
// This is an EDUCATIONAL approximation, not a scientifically verified
// life-cycle assessment. It combines category, material and shipping
// assumptions into a single directional estimate expressed in kg CO2e,
// so people can compare purchases against each other — not against a lab.

export const CATEGORY_OPTIONS = [
  'Electronics',
  'Clothing',
  'Food',
  'Furniture',
  'Beauty',
  'Household',
  'Books',
  'Sports',
  'Others',
]

export const MATERIAL_OPTIONS = ['Plastic', 'Metal', 'Wood', 'Glass', 'Cotton', 'Mixed']

export const SHIPPING_OPTIONS = ['Road', 'Rail', 'Sea', 'Air']

// kg CO2e produced per kg of product manufactured, by category (rough order-of-magnitude)
const CATEGORY_FACTOR = {
  Electronics: 25,
  Furniture: 18,
  Sports: 7.5,
  Clothing: 8,
  Household: 6,
  Beauty: 5,
  Others: 5,
  Books: 3,
  Food: 2.5,
}

// multiplier applied on top of the category factor
const MATERIAL_FACTOR = {
  Metal: 1.3,
  Plastic: 1.15,
  Glass: 1.1,
  Mixed: 1.05,
  Wood: 0.9,
  Cotton: 0.85,
}

// kg CO2e per kg of product per km travelled, by shipping method
const SHIPPING_FACTOR = {
  Air: 0.00060,
  Road: 0.00012,
  Rail: 0.00004,
  Sea: 0.00002,
}

/**
 * Estimate the carbon footprint of a single product.
 * @param {{category:string, weight:number, material:string, distance:number, shippingMethod:string}} product
 * @returns {number} estimated kg CO2e, rounded to 2 decimals
 */
export function estimateCarbonFootprint({ category, weight, material, distance, shippingMethod }) {
  const w = Number(weight) || 0
  const d = Number(distance) || 0

  const categoryFactor = CATEGORY_FACTOR[category] ?? CATEGORY_FACTOR.Others
  const materialFactor = MATERIAL_FACTOR[material] ?? 1
  const shippingFactor = SHIPPING_FACTOR[shippingMethod] ?? SHIPPING_FACTOR.Road

  const manufacturing = w * categoryFactor * materialFactor
  const shipping = w * d * shippingFactor

  const total = manufacturing + shipping
  return Math.round(total * 100) / 100
}

/** Returns a qualitative label used for badges/coloring across the UI. */
export function getImpactLevel(kg) {
  if (kg < 5) return { label: 'Low impact', tone: 'forest' }
  if (kg < 25) return { label: 'Medium impact', tone: 'lime' }
  return { label: 'High impact', tone: 'clay' }
}
