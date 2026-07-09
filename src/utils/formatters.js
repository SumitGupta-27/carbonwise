export function formatKg(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '0 kg'
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg`
}

export function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function monthLabel(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' })
}

export function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
