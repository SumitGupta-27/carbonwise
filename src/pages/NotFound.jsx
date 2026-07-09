import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'

export default function NotFound() {
  return (
    <PageWrapper className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="w-16 h-16 rounded-full bg-forest-500/10 flex items-center justify-center mb-6">
        <Compass size={28} className="text-forest-500" />
      </div>
      <h1 className="text-3xl font-display font-semibold mb-2">Page not found</h1>
      <p className="text-ink-light/60 dark:text-ink-dark/60 max-w-sm mb-8">
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <Link to="/" className="btn-primary">Back to home</Link>
    </PageWrapper>
  )
}
