import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Award, ArrowUpRight } from 'lucide-react'

const WorkCard = forwardRef(function WorkCard({ work, index, onOpen }, ref) {
  return (
    <motion.button
      ref={ref}
      layout
      onClick={() => onOpen(work)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left transition-shadow duration-300 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      {/* Cover — fixed aspect ratio keeps every card uniform */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={work.cover}
          alt={work.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

        {/* Year badge */}
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {work.yearLabel}
        </span>

        {/* Award badge */}
        {work.award && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-1 text-[11px] font-bold text-black shadow-glow-sm">
            <Award size={12} /> {work.award}
          </span>
        )}

        {/* Title over image */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-accent-300">
            {work.type}
          </p>
          <h3 className="text-lg font-bold text-white">{work.title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{work.subtitle}</p>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{work.role}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {work.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip !py-0.5 !text-[11px]">
              {t}
            </span>
          ))}
          {work.tags.length > 3 && (
            <span className="chip !py-0.5 !text-[11px]">+{work.tags.length - 3}</span>
          )}
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 transition-colors dark:text-accent-400">
          View details
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </motion.button>
  )
})

export default WorkCard
