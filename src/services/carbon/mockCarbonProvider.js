import { estimateCarbonFootprint } from '../../utils/carbonCalculator'

const CATEGORY_KEYWORDS = {
  Electronics: ['phone', 'laptop', 'headphone', 'charger', 'tablet', 'keyboard', 'monitor', 'camera', 'watch'],
  Clothing: ['shirt', 'jeans', 'dress', 'jacket', 'shoe', 'sneaker', 'hoodie', 'bag'],
  Food: ['coffee', 'tea', 'chocolate', 'food', 'snack', 'rice', 'milk', 'fruit'],
  Furniture: ['chair', 'table', 'desk', 'sofa', 'shelf', 'lamp', 'mattress'],
  Beauty: ['shampoo', 'serum', 'cream', 'makeup', 'soap', 'cosmetic'],
  Household: ['cleaner', 'detergent', 'bottle', 'towel', 'container'],
  Books: ['book', 'notebook', 'novel', 'journal'],
  Sports: ['yoga', 'bike', 'ball', 'racket', 'fitness', 'gym'],
}

export function inferCategory(productName) {
  const query = productName.toLowerCase()
  return Object.entries(CATEGORY_KEYWORDS).find(([, keywords]) => keywords.some((keyword) => query.includes(keyword)))?.[0] ?? 'Others'
}

export async function getEstimate(input) {
  // This adapter mirrors a future API response. Swapping it for a Climatiq,
  // ADEME, or database provider leaves the UI and stored product shape untouched.
  await new Promise((resolve) => setTimeout(resolve, 280))
  const category = input.category && input.category !== 'Others' ? input.category : inferCategory(input.name)
  const footprint = estimateCarbonFootprint({ ...input, category })
  return {
    footprint,
    category,
    confidence: 'Estimated',
    source: 'CarbonWise mock emission factors',
    explanation: `This lifecycle estimate combines ${category.toLowerCase()} production, ${input.material.toLowerCase()} material assumptions, and ${input.shippingMethod.toLowerCase()} shipping.`,
    provider: 'mock',
  }
}
