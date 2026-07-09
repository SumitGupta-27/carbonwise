import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X, PackageSearch } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import ProductTable from '../components/products/ProductTable'
import ProductForm from '../components/products/ProductForm'
import { useData } from '../context/DataContext'

export default function History() {
  const { products, deleteProduct } = useData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortHighest, setSortHighest] = useState(false)
  const [editing, setEditing] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  const filtered = useMemo(() => {
    let list = [...products]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }
    if (category !== 'all') {
      list = list.filter((p) => p.category === category)
    }
    if (sortHighest) {
      list.sort((a, b) => b.footprint - a.footprint)
    } else {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    return list
  }, [products, search, category, sortHighest])

  return (
    <PageWrapper>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="label-eyebrow mb-2">Product history</p>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold">Everything you've logged</h1>
        </div>
        <Link to="/add-product" className="btn-primary">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <Card>
        {products.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="Nothing here yet"
            description="Products you add will show up here with their estimated footprint."
            action={
              <Link to="/add-product" className="btn-primary">
                <Plus size={16} /> Add your first product
              </Link>
            }
          />
        ) : (
          <ProductTable
            products={filtered}
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            sortHighest={sortHighest}
            onToggleSort={() => setSortHighest((s) => !s)}
            onEdit={setEditing}
            onDelete={setPendingDelete}
          />
        )}
        {products.length > 0 && filtered.length === 0 && (
          <p className="text-sm text-center text-ink-light/50 dark:text-ink-dark/50 py-10">
            No products match your search or filter.
          </p>
        )}
      </Card>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-start sm:items-center justify-center bg-ink-light/40 dark:bg-black/60 backdrop-blur-sm px-4 py-10 overflow-y-auto"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="font-display font-semibold text-lg text-white sm:text-ink-light sm:dark:text-ink-dark">Edit product</h3>
                <button onClick={() => setEditing(null)} aria-label="Close" className="p-2 rounded-full bg-white/10 sm:bg-transparent text-white sm:text-ink-light/50 sm:dark:text-ink-dark/50">
                  <X size={18} />
                </button>
              </div>
              <ProductForm existingProduct={editing} onDone={() => setEditing(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this product?"
        description={pendingDelete ? `"${pendingDelete.name}" will be permanently removed from your history.` : ''}
        confirmLabel="Delete product"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          deleteProduct(pendingDelete.id)
          setPendingDelete(null)
        }}
      />
    </PageWrapper>
  )
}
