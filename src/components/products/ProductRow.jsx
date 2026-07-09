import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import Badge from '../ui/Badge'
import { formatDate, formatKg } from '../../utils/formatters'
import { getImpactLevel } from '../../utils/carbonCalculator'

export default function ProductRow({ product, onEdit, onDelete }) {
  const impact = getImpactLevel(product.footprint)

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border-b border-forest-900/5 dark:border-forest-50/5 last:border-0 hover:bg-forest-500/[0.03] transition-colors"
    >
      <td className="py-4 pr-4">
        <p className="font-medium text-sm">{product.name}</p>
        <p className="text-xs text-ink-light/45 dark:text-ink-dark/45">{product.material} · {product.shippingMethod}</p>
      </td>
      <td className="py-4 pr-4">
        <Badge tone="slate">{product.category}</Badge>
      </td>
      <td className="py-4 pr-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold">{formatKg(product.footprint)}</span>
          <Badge tone={impact.tone}>{impact.label}</Badge>
        </div>
      </td>
      <td className="py-4 pr-4 text-sm text-ink-light/60 dark:text-ink-dark/60">{formatDate(product.createdAt)}</td>
      <td className="py-4 pl-2">
        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={() => onEdit(product)}
            aria-label={`Edit ${product.name}`}
            className="p-2 rounded-lg text-ink-light/50 dark:text-ink-dark/50 hover:bg-forest-500/10 hover:text-forest-600 dark:hover:text-forest-300 transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(product)}
            aria-label={`Delete ${product.name}`}
            className="p-2 rounded-lg text-ink-light/50 dark:text-ink-dark/50 hover:bg-clay-500/10 hover:text-clay-500 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </motion.tr>
  )
}
