import { Cloud, Target, TrendingUp, Leaf } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'

const SECTIONS = [
  {
    icon: Cloud,
    title: 'What is a carbon footprint?',
    text:
      'A carbon footprint is the total amount of greenhouse gases — expressed as kg of CO2 equivalent (CO2e) — released into the atmosphere as a result of an activity, product, or lifestyle. For a purchased product, that includes raw materials, manufacturing, and the journey it takes to reach you.',
  },
  {
    icon: TrendingUp,
    title: 'Why tracking it matters',
    text:
      'Most people never see the emissions behind an online order — they see a price and a delivery date. Making that hidden cost visible is the first step toward reducing it: small, repeated choices compound into meaningful change over a year of purchases.',
  },
  {
    icon: Target,
    title: 'UN SDG 13 — Climate Action',
    text:
      'Sustainable Development Goal 13 calls for urgent action to combat climate change and its impacts. Individual consumption is a meaningful lever alongside policy and industry change — CarbonWise is a small, practical tool built in that spirit.',
  },
  {
    icon: Leaf,
    title: 'How CarbonWise helps',
    text:
      'CarbonWise estimates a footprint for each product you log using its category, material, weight and shipping method, then visualizes your habits over time — highlighting your highest-impact categories and celebrating lower-impact choices.',
  },
]

export default function About() {
  return (
    <PageWrapper>
      <div className="max-w-2xl mb-14">
        <p className="label-eyebrow mb-3">About CarbonWise</p>
        <h1 className="text-4xl font-display font-semibold mb-4">Making an invisible cost visible</h1>
        <p className="text-ink-light/65 dark:text-ink-dark/65 text-lg">
          CarbonWise doesn't claim laboratory-grade accuracy. It gives you a consistent, directional
          estimate so you can compare purchases against each other and notice your own patterns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {SECTIONS.map((s, i) => (
          <Card key={s.title} delay={i * 0.08}>
            <div className="w-11 h-11 rounded-xl bg-forest-500/12 flex items-center justify-center mb-4">
              <s.icon size={20} className="text-forest-500" />
            </div>
            <h2 className="font-display font-semibold text-xl mb-2">{s.title}</h2>
            <p className="text-sm text-ink-light/60 dark:text-ink-dark/60 leading-relaxed">{s.text}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8 text-center" delay={0.3}>
        <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">
          Every estimate in this app is educational. It is meant to build awareness and support better
          decisions — not to replace a certified life-cycle assessment.
        </p>
      </Card>
    </PageWrapper>
  )
}
