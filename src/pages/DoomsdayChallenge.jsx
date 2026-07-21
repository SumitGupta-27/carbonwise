import { Award, Crown, Gift, Globe2, Timer, Trophy, Users } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ComingSoonBadge from '../components/ui/ComingSoonBadge'

function CountdownIllustration() {
  return <div className="relative mx-auto grid h-44 w-44 place-items-center rounded-full border-[10px] border-lime-500/30 bg-forest-900 shadow-[0_0_50px_rgba(168,224,99,0.2)]"><div className="absolute inset-2 rounded-full border border-dashed border-lime-500/60 animate-[spin_16s_linear_infinite]" /><div className="relative text-center"><Timer className="mx-auto mb-2 text-lime-400" size={28} /><span className="block font-display text-4xl font-semibold">7</span><span className="font-mono text-xs uppercase tracking-widest text-forest-100">days</span></div></div>
}

export default function DoomsdayChallenge() {
  return (
    <PageWrapper>
    <section className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-forest-900 via-forest-800 to-slate-800 px-6 py-14 sm:px-12 text-white">
      <div className="absolute -right-10 -top-12 h-56 w-56 rounded-full bg-lime-500/15 blur-3xl animate-float" />
      <div className="relative grid lg:grid-cols-[1.35fr_0.65fr] items-center gap-10"><div><ComingSoonBadge className="mb-5" /><h1 className="text-4xl sm:text-5xl font-display font-semibold leading-tight">🌍 Doomsday Challenge</h1><p className="mt-4 max-w-xl text-lg text-forest-50/80">Reduce your carbon footprint for 7 days and compete with another user.</p><p className="mt-5 text-sm text-forest-100/70">You’ll be matched randomly with another CarbonWise member. Make lower-impact choices, log them daily, and see who creates the biggest positive shift.</p></div><CountdownIllustration /></div>
    </section>

    <section className="grid lg:grid-cols-3 gap-6 py-10">
      <Card className="lg:col-span-2 bg-white/55 dark:bg-surface-dark/60 backdrop-blur-md" hover><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="label-eyebrow mb-2">Mock challenge card</p><h2 className="text-2xl font-display font-semibold">The seven-day low-impact sprint</h2><p className="mt-2 text-sm text-ink-light/60 dark:text-ink-dark/60">A daily check-in turns simple swaps into a visible head-to-head journey.</p></div><Badge tone="lime">Random match</Badge></div><div className="mt-7 grid sm:grid-cols-2 gap-4"><div className="rounded-xl bg-forest-500/8 p-4"><Users size={19} className="text-forest-500 mb-3" /><p className="text-xs text-ink-light/50 dark:text-ink-dark/50">Your challenger</p><p className="font-display text-lg font-semibold">EcoExplorer_42</p></div><div className="rounded-xl bg-lime-500/15 p-4"><Globe2 size={19} className="text-forest-600 dark:text-lime-400 mb-3" /><p className="text-xs text-ink-light/50 dark:text-ink-dark/50">Goal</p><p className="font-display text-lg font-semibold">Make each day count</p></div></div></Card>
      <Card className="bg-forest-500 text-white"><Gift size={23} className="text-lime-400 mb-4" /><p className="text-xs uppercase tracking-widest text-forest-100">Reward preview</p><h2 className="font-display text-2xl font-semibold mt-2">Forest Guardian</h2><p className="mt-3 text-sm text-forest-50/80">Win a streak badge, profile glow, and a place in the seasonal impact hall.</p></Card>
    </section>

    <section className="grid md:grid-cols-2 gap-6 pb-4"><Card hover><div className="flex items-center gap-3 mb-5"><Award className="text-lime-600" /><h2 className="font-display text-2xl font-semibold">Badge preview</h2></div><div className="flex items-center gap-4 rounded-xl border border-forest-500/15 bg-forest-500/5 p-4"><div className="grid h-14 w-14 place-items-center rounded-full bg-lime-500/25 text-forest-600"><Trophy /></div><div><p className="font-semibold">Seven Day Steward</p><p className="text-sm text-ink-light/60 dark:text-ink-dark/60">Complete every daily check-in.</p></div></div></Card><Card hover><div className="flex items-center gap-3 mb-5"><Crown className="text-clay-500" /><h2 className="font-display text-2xl font-semibold">Leaderboard preview</h2></div>{[['1', 'Nila', '18.4 kg saved'], ['2', 'You', '15.2 kg saved'], ['3', 'Arjun', '12.8 kg saved']].map(([rank, name, score]) => <div key={name} className="flex items-center justify-between border-b last:border-0 border-forest-900/5 py-3"><span className="font-mono text-forest-500">{rank}</span><span className="flex-1 ml-4 font-medium">{name}</span><span className="text-sm text-ink-light/55 dark:text-ink-dark/55">{score}</span></div>)}</Card></section>
    </PageWrapper>
  )
}
