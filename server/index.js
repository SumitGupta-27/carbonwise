import { createServer } from 'node:http'

const PORT = Number(process.env.CARBON_API_PORT || 8787)
const API_URL = 'https://api.emissions.dev/v1/freight/emissions'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000
const CACHE_LIMIT = 500
const MAX_BODY_BYTES = 16 * 1024
const SHIPPING_METHODS = new Set(['road', 'rail', 'sea', 'air'])
const cache = new Map()

function respond(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(payload))
}

function cacheGet(key) {
  const entry = cache.get(key)
  if (!entry || entry.expiresAt < Date.now()) { cache.delete(key); return null }
  return entry.value
}

function cacheSet(key, value) {
  if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value)
  cache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS })
}

function sourceLabel(attributes) {
  const trail = attributes.emissions?.source_trail || attributes.source_trail || []
  const sources = [...new Set(trail.map((item) => item.source).filter(Boolean))]
  return sources.length ? `Source: ${sources.join(', ')} via emissions.dev` : 'Source: emissions.dev freight calculation'
}

async function readJson(req) {
  let body = ''
  for await (const chunk of req) {
    body += chunk
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw new Error('request_too_large')
  }
  return JSON.parse(body || '{}')
}

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return respond(res, 204, {})
  if (req.method !== 'POST' || req.url !== '/api/carbon/estimate') return respond(res, 404, { error: 'Not found' })

  try {
    const input = await readJson(req)
    const { originCountry, destinationCountry, weight, shippingMethod } = input
    const normalizedMethod = String(shippingMethod || 'Road').toLowerCase()
    if (!process.env.EMISSIONS_DEV_API_KEY) return respond(res, 200, { available: false, reason: 'Carbon data service is not configured.' })
    if (!/^[A-Za-z]{2}$/.test(originCountry || '') || !/^[A-Za-z]{2}$/.test(destinationCountry || '') || !Number.isFinite(Number(weight)) || !(Number(weight) > 0) || Number(weight) > 1_000_000 || !SHIPPING_METHODS.has(normalizedMethod)) {
      return respond(res, 200, { available: false, reason: 'Add valid origin and destination country codes to use verified freight data.' })
    }

    const params = new URLSearchParams({
      origin_country: originCountry.toUpperCase(),
      destination_country: destinationCountry.toUpperCase(),
      weight: String(Number(weight)),
      unit: 'kg',
      transport_mode: normalizedMethod,
    })
    const key = params.toString()
    const cached = cacheGet(key)
    if (cached) return respond(res, 200, { ...cached, cached: true })

    const upstream = await fetch(`${API_URL}?${params}`, {
      headers: { Authorization: `Bearer ${process.env.EMISSIONS_DEV_API_KEY}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    if (!upstream.ok) {
      const message = upstream.status === 429 ? 'Carbon data service is busy. Using CarbonWise estimate.' : 'No verified freight factor was available for this route. Using CarbonWise estimate.'
      return respond(res, 200, { available: false, reason: message, rateLimited: upstream.status === 429 })
    }

    const payload = await upstream.json()
    const attributes = payload?.data?.attributes
    const co2e = Number(attributes?.emissions?.co2e)
    if (!Number.isFinite(co2e)) return respond(res, 200, { available: false, reason: 'No verified emissions result was returned. Using CarbonWise estimate.' })

    const result = {
      available: true,
      footprint: co2e,
      source: sourceLabel(attributes),
      confidence: 'Verified freight estimate',
      explanation: `Verified shipment emissions for ${attributes.route?.total_distance_km ?? 'the calculated'} km ${attributes.route?.transport_mode ?? normalizedMethod} route.`,
      methodology: payload?.meta?.methodology || attributes.emissions?.co2e_calculation_method,
    }
    cacheSet(key, result)
    return respond(res, 200, result)
  } catch (error) {
    return respond(res, 200, { available: false, reason: error?.name === 'TimeoutError' ? 'Carbon data request timed out. Using CarbonWise estimate.' : 'Carbon data service is temporarily unavailable. Using CarbonWise estimate.' })
  }
}).listen(PORT, () => console.log(`CarbonWise API listening at http://localhost:${PORT}`))
