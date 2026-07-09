import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, Leaf } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import ProgressRing from '../ui/ProgressRing'
import { CATEGORY_OPTIONS, MATERIAL_OPTIONS, SHIPPING_OPTIONS, estimateCarbonFootprint, getImpactLevel } from '../../utils/carbonCalculator'
import { useData } from '../../context/DataContext'

const initialForm = {
  name: '',
  category: CATEGORY_OPTIONS[0],
  weight: '',
  material: MATERIAL_OPTIONS[0],
  distance: '',
  shippingMethod: SHIPPING_OPTIONS[0],
}

export default function ProductForm({ existingProduct, onDone }) {
  const { addProduct, updateProduct } = useData()
  const navigate = useNavigate()
  const [form, setForm] = useState(existingProduct || initialForm)
  const [calculated, setCalculated] = useState(existingProduct ? existingProduct.footprint : null)
  const [errors, setErrors] = useState({})

  const isEditing = Boolean(existingProduct)

  const previewFootprint = useMemo(() => {
    if (!form.weight || !form.distance) return null
    return estimateCarbonFootprint(form)
  }, [form])

  const impact = calculated !== null ? getImpactLevel(calculated) : null

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Give the product a name.'
    if (!form.weight || Number(form.weight) <= 0) err.weight = 'Enter a weight greater than 0.'
    if (!form.distance || Number(form.distance) < 0) err.distance = 'Enter a valid shipping distance.'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleCalculate = () => {
    if (!validate()) return
    setCalculated(estimateCarbonFootprint(form))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const footprint = estimateCarbonFootprint(form)
    const payload = { ...form, weight: Number(form.weight), distance: Number(form.distance), footprint }

    if (isEditing) {
      updateProduct(existingProduct.id, payload)
      onDone?.()
    } else {
      addProduct(payload)
      navigate('/history')
    }
  }

  return (
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block" htmlFor="name">Product name</label>
            <input
              id="name"
              className="input-field"
              placeholder="e.g. Wireless Headphones"
              value={form.name}
              onChange={handleChange('name')}
            />
            {errors.name && <p className="text-xs text-clay-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="category">Category</label>
              <select id="category" className="input-field" value={form.category} onChange={handleChange('category')}>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="material">Material</label>
              <select id="material" className="input-field" value={form.material} onChange={handleChange('material')}>
                {MATERIAL_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="number"
                min="0"
                step="0.01"
                className="input-field"
                placeholder="0.5"
                value={form.weight}
                onChange={handleChange('weight')}
              />
              {errors.weight && <p className="text-xs text-clay-500 mt-1">{errors.weight}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="distance">Shipping distance (km)</label>
              <input
                id="distance"
                type="number"
                min="0"
                step="1"
                className="input-field"
                placeholder="1200"
                value={form.distance}
                onChange={handleChange('distance')}
              />
              {errors.distance && <p className="text-xs text-clay-500 mt-1">{errors.distance}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium mb-1.5 block" htmlFor="shippingMethod">Shipping method</label>
              <select id="shippingMethod" className="input-field" value={form.shippingMethod} onChange={handleChange('shippingMethod')}>
                {SHIPPING_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleCalculate}>
              <Calculator size={16} /> Calculate
            </Button>
            <Button type="submit" variant="primary">
              <Leaf size={16} /> {isEditing ? 'Save changes' : 'Add to history'}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center text-center" delay={0.1}>
        <p className="label-eyebrow mb-6">Estimated footprint</p>
        <ProgressRing
          percent={calculated !== null ? Math.min(100, (calculated / 40) * 100) : previewFootprint ? Math.min(100, (previewFootprint / 40) * 100) : 0}
          size={160}
          strokeWidth={12}
          color={impact?.tone === 'clay' ? '#D97757' : impact?.tone === 'lime' ? '#A8E063' : '#1F7A5C'}
        >
          <div>
            <motion.p key={calculated ?? previewFootprint} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-display font-semibold">
              {(calculated ?? previewFootprint ?? 0).toFixed(1)}
            </motion.p>
            <p className="text-xs text-ink-light/45 dark:text-ink-dark/45">kg CO₂e</p>
          </div>
        </ProgressRing>

        {impact && (
          <Badge tone={impact.tone} className="mt-6">{impact.label}</Badge>
        )}

        <p className="text-xs text-ink-light/45 dark:text-ink-dark/45 mt-6 max-w-[220px]">
          This is an educational estimate based on category, material and shipping — not a certified measurement.
        </p>
      </Card>
    </div>
  )
}
