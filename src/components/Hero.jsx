import { motion } from 'framer-motion'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Ambient background */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-500/20 blur-3xl" />

      <div className="section relative grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="eyebrow mb-5">
            <Sparkles size={14} /> {profile.role}
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl"
          >
            {profile.name}
            <span className="mt-2 block text-gradient">{profile.headline}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.p variants={item} className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
            {profile.education.degree} · {profile.education.university} · GPAX {profile.education.gpax}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary">
              View My Work <ArrowDown size={16} />
            </a>
            <a href={profile.primaryContact.href} className="btn-ghost">
              <Mail size={16} /> Get in Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="mx-auto w-full max-w-xs md:max-w-none"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-accent-500/40 via-transparent to-accent-400/30 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 shadow-xl dark:border-zinc-800">
              <img
                src={profile.photo}
                alt={profile.name}
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{profile.current.label}</p>
              <p className="text-sm font-semibold text-accent-600 dark:text-accent-400">
                {profile.current.value}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
