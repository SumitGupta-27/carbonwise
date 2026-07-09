import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, PackageSearch, Gauge, TrendingDown, Sparkles } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import AnimatedNumber from '../components/ui/AnimatedNumber'
import { useData } from '../context/DataContext'

function EarthRingsIllustration() {
  return (
    <svg viewBox="0 0 420 420" className="w-full max-w-md mx-auto" role="img" aria-label="Illustration of concentric growth rings representing tracked footprint over time">
      <defs>
        <radialGradient id="earthGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3EA26D" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3EA26D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#255A73" />
          <stop offset="100%" stopColor="#1D475C" />
        </linearGradient>
      </defs>

      <circle cx="210" cy="210" r="200" fill="url(#earthGlow)" />

      {/* orbit rings — tree-ring / orbit motif */}
      {[80, 110, 140, 168].map((r, i) => (
        <circle
          key={r}
          cx="210"
          cy="210"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? '#1F7A5C' : '#A8E063'}
          strokeOpacity={0.18 + i * 0.05}
          strokeWidth="1.5"
          strokeDasharray={i === 3 ? '2 6' : 'none'}
        />
      ))}

      {/* globe */}
      <g>
        <circle cx="210" cy="210" r="72" fill="url(#oceanGrad)" />
        <path
          d="M160 175c10-14 30-18 42-8 8 6 18 4 26-2 10-8 24-6 30 4-4 14-20 20-34 18-10-2-18 4-22 14-6 14-22 20-36 14-14-6-18-24-6-40z"
          fill="#3EA26D"
          opacity="0.9"
        />
        <path
          d="M175 245c14-6 28 0 32 12 4 10-2 22-14 26-14 4-28-4-30-18-1-9 4-16 12-20z"
          fill="#1F7A5C"
          opacity="0.85"
        />
      </g>

      {/* orbiting product dots */}
      {[
        { r: 110, angle: 40, color: '#A8E063' },
        { r: 140, angle: 190, color: '#1F7A5C' },
        { r: 168, angle: 300, color: '#478BA0' },
        { r: 80, angle: 260, color: '#A8E063' },
      ].map((dot, i) => {
        const rad = (dot.angle * Math.PI) / 180
        const x = 210 + dot.r * Math.cos(rad)
        const y = 210 + dot.r * Math.sin(rad)
        return (
          <circle key={i} cx={x} cy={y} r="6" fill={dot.color} className="animate-float" style={{ animationDelay: `${i * 0.6}s` }} />
        )
      })}
    </svg>
  )
}

export default function Landing() {
  const { products } = useData()
  const totalKg = products.reduce((s, p) => s + p.footprint, 0)

  return (
    <PageWrapper className="!pt-8">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-eyebrow mb-4 flex items-center gap-2"
          >
            <Sparkles size={14} /> UN SDG 13 — Climate Action
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-[1.08] mb-6"
          >
            Track Your Carbon Footprint.<br />
            <span className="text-forest-500">Build a Greener Future.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-ink-light/65 dark:text-ink-dark/65 max-w-lg mb-8"
          >
            Every online order carries a hidden environmental cost. CarbonWise estimates the CO₂e behind
            each purchase — by category, weight, material and shipping — so you can see your habits
            add up, and start choosing differently.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/add-product" className="btn-primary">
              Get Started <ArrowRight size={16} />
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              Learn More
            </a>
          </motion.div>

          {products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-3 text-sm text-ink-light/55 dark:text-ink-dark/55"
            >
              <Gauge size={16} className="text-forest-500" />
              You've already tracked <span className="font-mono font-semibold text-ink-light dark:text-ink-dark"><AnimatedNumber value={totalKg} decimals={1} suffix=" kg" /></span> CO₂e
            </motion.div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>
          <EarthRingsIllustration />
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 scroll-mt-20">
        <div className="text-center mb-14">
          <p className="label-eyebrow mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold">Three steps to a clearer picture</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: PackageSearch,
              title: 'Log a purchase',
              text: 'Add a product with its category, material, weight and shipping details.',
            },
            {
              icon: Gauge,
              title: 'See the estimate',
              text: 'CarbonWise instantly estimates the footprint in kg CO₂e using transparent assumptions.',
            },
            {
              icon: TrendingDown,
              title: 'Spot the pattern',
              text: 'Dashboards and insights reveal your highest-impact habits so you can shift them.',
            },
          ].map((step, i) => (
            <Card key={step.title} delay={i * 0.1} hover>
              <div className="w-11 h-11 rounded-xl bg-forest-500/12 flex items-center justify-center mb-4">
                <step.icon size={20} className="text-forest-500" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">{step.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden rounded-xl2 bg-forest-500 text-white px-8 py-14 text-center mt-8">
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-lime-500/20 animate-drift" />
        <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-white/5 animate-float" />
        <h2 className="relative text-3xl sm:text-4xl font-display font-semibold mb-4">Ready to see your footprint?</h2>
        <p className="relative text-forest-50/85 max-w-lg mx-auto mb-8">
          It takes less than a minute to log your first product and start building a more conscious shopping habit.
        </p>
        <Link to="/add-product" className="relative inline-flex items-center gap-2 rounded-full bg-white text-forest-600 font-semibold px-6 py-3 hover:bg-forest-50 transition-colors">
          Add your first product <ArrowRight size={16} />
        </Link>
      </section>
    </PageWrapper>
  )
}
