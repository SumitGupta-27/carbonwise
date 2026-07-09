import PageWrapper from '../components/layout/PageWrapper'
import ProductForm from '../components/products/ProductForm'

export default function AddProduct() {
  return (
    <PageWrapper className="max-w-5xl">
      <div className="mb-10">
        <p className="label-eyebrow mb-2">New entry</p>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-2">Add a product</h1>
        <p className="text-ink-light/60 dark:text-ink-dark/60 max-w-xl">
          Fill in what you know — CarbonWise fills in the rest with reasonable assumptions to
          estimate the footprint.
        </p>
      </div>
      <ProductForm />
    </PageWrapper>
  )
}
