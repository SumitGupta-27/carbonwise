import { MapPin, Smartphone, TrainFront, Repeat, ShoppingBag, TreePine, ShoppingBasket, Recycle } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import TipCard from '../components/ecotips/TipCard'

const TIPS = [
  {
    icon: MapPin,
    title: 'Buy local products',
    text: 'Shorter supply chains mean less transportation emissions. Look for local or regional sellers before buying from overseas.',
  },
  {
    icon: Smartphone,
    title: 'Reduce unnecessary electronics',
    text: 'Electronics carry some of the highest manufacturing footprints. Ask if an upgrade is truly needed before buying new.',
  },
  {
    icon: TrainFront,
    title: 'Choose rail instead of air',
    text: 'Air freight can emit many times more CO2e per km than rail or sea. Pick slower shipping when you can.',
  },
  {
    icon: Repeat,
    title: 'Reuse products',
    text: 'Extending a product\u2019s life — repairing, repurposing, or simply using it longer — reduces demand for new manufacturing.',
  },
  {
    icon: ShoppingBag,
    title: 'Buy second-hand items',
    text: 'Pre-owned goods skip the manufacturing footprint almost entirely. Thrift and resale markets are an easy win.',
  },
  {
    icon: TreePine,
    title: 'Plant trees',
    text: 'Trees absorb CO2 over their lifetime. Supporting reforestation helps offset footprints you can\u2019t eliminate outright.',
  },
  {
    icon: ShoppingBasket,
    title: 'Use reusable bags',
    text: 'Small habits compound. Reusable bags and packaging cut down on single-use plastic waste tied to every order.',
  },
  {
    icon: Recycle,
    title: 'Recycle packaging responsibly',
    text: 'Sort and recycle shipping materials properly instead of sending them straight to landfill.',
  },
]

export default function EcoTips() {
  return (
    <PageWrapper>
      <div className="max-w-xl mb-10">
        <p className="label-eyebrow mb-2">Eco tips</p>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-3">Small habits, real impact</h1>
        <p className="text-ink-light/60 dark:text-ink-dark/60">
          Practical, everyday choices that lower the footprint behind what you buy.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TIPS.map((tip, i) => (
          <TipCard key={tip.title} {...tip} delay={i * 0.05} />
        ))}
      </div>
    </PageWrapper>
  )
}
