import { motion } from 'framer-motion'
import { ArrowRight, Leaf, MessageCircleHeart, Sprout, Trophy, UsersRound } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import ComingSoonBadge from '../components/ui/ComingSoonBadge'

const features = [
  { icon: UsersRound, title: 'Eco Groups', text: 'Find your people around low-waste living, conscious fashion, local food, and more.' },
  { icon: MessageCircleHeart, title: 'Sustainability Feed', text: 'Share small wins, practical swaps, and actions that make greener choices easier.' },
  { icon: Trophy, title: 'Weekly Leaderboards', text: 'Celebrate consistent progress with friendly, impact-first challenges.' },
  { icon: Sprout, title: 'Green Discussions', text: 'Ask thoughtful questions and learn with a community that cares about the details.' },
]

export default function Community() {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden rounded-xl2 border border-forest-500/15 bg-white/45 dark:bg-forest-900/20 backdrop-blur-xl px-6 py-16 sm:px-12 text-center">
        <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-lime-500/15 blur-2xl animate-float" />
        <div className="absolute -right-6 bottom-0 text-forest-500/10 dark:text-lime-500/10 animate-drift"><Leaf size={230} strokeWidth={1} /></div>
        <ComingSoonBadge className="relative mb-5" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="relative mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-forest-500 text-white shadow-soft">
          <UsersRound size={34} />
        </motion.div>
        <h1 className="relative text-4xl sm:text-5xl font-display font-semibold">A greener future grows <span className="text-forest-500">together.</span></h1>
        <p className="relative mx-auto mt-5 max-w-2xl text-lg text-ink-light/65 dark:text-ink-dark/65">CarbonWise Community is a thoughtful space to exchange ideas, celebrate progress, and turn everyday climate action into shared momentum.</p>
        <button className="relative mt-8 btn-primary" type="button">Join the early interest list <ArrowRight size={16} /></button>
      </section>

      <section className="py-16">
        <div className="mb-8"><p className="label-eyebrow mb-2">A preview of what is growing</p><h2 className="text-3xl font-display font-semibold">Built for encouragement, not perfection.</h2></div>
        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((feature, index) => <Card key={feature.title} hover delay={index * 0.08} className="bg-white/55 dark:bg-surface-dark/60 backdrop-blur-md"><div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-forest-500/12 text-forest-500"><feature.icon size={21} /></div><h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3><p className="text-sm leading-relaxed text-ink-light/60 dark:text-ink-dark/60">{feature.text}</p></Card>)}
        </div>
      </section>

      <section className="rounded-xl2 bg-forest-900 text-white p-7 sm:p-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-lime-500/10 blur-3xl" />
        <p className="relative label-eyebrow !text-lime-400 mb-3">Community roadmap</p>
        <div className="relative grid md:grid-cols-3 gap-6">
          {[['First roots', 'Interest list, member profiles, and curated Eco Groups.'], ['Shared momentum', 'A sustainability feed, discussion prompts, and community spotlights.'], ['Collective impact', 'Friendly challenges, leaderboards, and local action circles.']].map(([phase, text], i) => <div key={phase} className="border-l border-lime-500/50 pl-4"><span className="font-mono text-xs text-lime-400">0{i + 1}</span><h3 className="font-display text-xl font-semibold mt-1 mb-2">{phase}</h3><p className="text-sm text-forest-50/75">{text}</p></div>)}
        </div>
      </section>
    </PageWrapper>
  )
}
