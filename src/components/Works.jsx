import { useMemo, useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { FolderGit2 } from 'lucide-react'
import { works, yearFilters } from '../data/works'
import WorkCard from './WorkCard'
import WorkModal from './WorkModal'

export default function Works() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const filtered = useMemo(
    () => (filter === 'all' ? works : works.filter((w) => w.year === filter)),
    [filter],
  )

  return (
    <section id="work" className="scroll-mt-20 py-20 sm:py-28">
      <div className="section">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow mb-3">
              <FolderGit2 size={14} /> Portfolio
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Selected Work</h2>
            <p className="mt-2 max-w-lg text-zinc-600 dark:text-zinc-400">
              Hackathons, product builds and coursework across two years — click any card for the
              full story and gallery.
            </p>
          </div>

          {/* Filter tabs */}
          <LayoutGroup>
            <div className="inline-flex flex-wrap gap-1 rounded-full border border-zinc-200 bg-zinc-100/60 p-1 dark:border-zinc-800 dark:bg-zinc-900/60">
              {yearFilters.map((f) => {
                const isActive = filter === f.key
                return (
                  <button
                    key={String(f.key)}
                    onClick={() => setFilter(f.key)}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-black'
                        : 'text-zinc-600 hover:text-accent-600 dark:text-zinc-300 dark:hover:text-accent-300'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-500 to-accent-400 shadow-glow-sm"
                      />
                    )}
                    <span className="relative z-10">{f.label}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Grid — no AnimatePresence here on purpose: with mode="popLayout" and no
            exit variant, filtered-out cards never unmount and the filter silently
            stops working. A plain list keeps the entrance animation and filters correctly. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w, i) => (
            <WorkCard key={w.slug} work={w} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <WorkModal work={active} onClose={() => setActive(null)} />
    </section>
  )
}
