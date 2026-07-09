import { Link } from 'react-router-dom'
import { Github, Leaf, Mail, Target } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-forest-900/5 dark:border-forest-50/5 mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg mb-3">
            <span className="w-8 h-8 rounded-full bg-forest-500 flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </span>
            CarbonWise
          </Link>
          <p className="text-sm text-ink-light/60 dark:text-ink-dark/60 max-w-xs">
            An educational tool for estimating and tracking the carbon footprint of your online purchases.
          </p>
        </div>

        <div>
          <p className="label-eyebrow mb-3">About</p>
          <ul className="space-y-2 text-sm text-ink-light/65 dark:text-ink-dark/65">
            <li><Link to="/about" className="hover:text-forest-600 dark:hover:text-forest-300 transition-colors">Why CarbonWise</Link></li>
            <li><Link to="/insights" className="hover:text-forest-600 dark:hover:text-forest-300 transition-colors">Insights</Link></li>
            <li><Link to="/eco-tips" className="hover:text-forest-600 dark:hover:text-forest-300 transition-colors">Eco Tips</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-eyebrow mb-3">Connect</p>
          <ul className="space-y-2 text-sm text-ink-light/65 dark:text-ink-dark/65">
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-forest-600 dark:hover:text-forest-300 transition-colors">
                <Github size={15} /> GitHub repository
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-forest-600 dark:hover:text-forest-300 transition-colors">
                <Mail size={15} /> Contact the team
              </a>
            </li>
            <li>
              <a
                href="https://sdgs.un.org/goals/goal13"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-forest-600 dark:hover:text-forest-300 transition-colors"
              >
                <Target size={15} /> UN SDG 13
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-900/5 dark:border-forest-50/5 py-6">
        <p className="text-center text-xs text-ink-light/45 dark:text-ink-dark/45">
          Built for SDG 13 — Climate Action. Estimates are educational, not a certified life-cycle assessment.
        </p>
      </div>
    </footer>
  )
}
