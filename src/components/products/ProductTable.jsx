import { AnimatePresence } from 'framer-motion'
import { ArrowDownWideNarrow, Search } from 'lucide-react'
import { CATEGORY_OPTIONS } from '../../utils/carbonCalculator'
import ProductRow from './ProductRow'

export default function ProductTable({
  products,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortHighest,
  onToggleSort,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-light/40 dark:text-ink-dark/40" />
          <input
            className="input-field pl-10"
            placeholder="Search products…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <select className="input-field sm:w-48" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={onToggleSort}
          className={`sm:w-52 input-field flex items-center justify-center gap-2 font-medium ${sortHighest ? 'border-forest-500 text-forest-600 dark:text-forest-300' : ''}`}
        >
          <ArrowDownWideNarrow size={16} />
          {sortHighest ? 'Sorted: highest first' : 'Sort by highest'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-ink-light/40 dark:text-ink-dark/40 border-b border-forest-900/10 dark:border-forest-50/10">
              <th className="py-3 font-medium">Product</th>
              <th className="py-3 font-medium">Category</th>
              <th className="py-3 font-medium">Footprint</th>
              <th className="py-3 font-medium">Purchased</th>
              <th className="py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {products.map((p) => (
                <ProductRow key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
