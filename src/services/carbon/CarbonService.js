import * as mockProvider from './mockCarbonProvider'

async function getEstimate(input) {
  try {
    const response = await fetch('/api/carbon/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    const result = await response.json()
    if (response.ok && result.available) {
      return {
        ...result,
        category: input.category && input.category !== 'Others' ? input.category : mockProvider.inferCategory(input.name),
        provider: 'emissions.dev',
      }
    }
    const fallback = await mockProvider.getEstimate(input)
    return { ...fallback, explanation: `${fallback.explanation} ${result.reason || ''}`.trim() }
  } catch {
    return mockProvider.getEstimate(input)
  }
}

export const CarbonService = {
  inferCategory: mockProvider.inferCategory,
  getEstimate,
}
