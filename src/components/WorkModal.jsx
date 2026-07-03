import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Award, Users, BadgeCheck, FileText, CheckCircle2 } from 'lucide-react'
import Lightbox from './Lightbox'

export default function WorkModal({ work, onClose }) {
  const [lightbox, setLightbox] = useState(null)

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!work) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && lightbox === null && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [work, onClose, lightbox])

  return createPortal(
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* Cover header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img src={work.cover} alt={work.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-accent-500 hover:text-black"
              >
                <X size={20} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-300">
                  {work.type} · {work.yearLabel}
                </p>
                <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">{work.title}</h2>
                <p className="text-sm text-zinc-300">{work.subtitle}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7">
              {/* Meta chips */}
              <div className="mb-5 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  <BadgeCheck size={14} className="text-accent-500" /> {work.role}
                </span>
                {work.team && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                    <Users size={14} className="text-accent-500" /> {work.team}
                  </span>
                )}
                {work.award && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 px-3 py-1.5 font-semibold text-accent-700 dark:text-accent-300">
                    <Award size={14} /> {work.award}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-4">
                {work.description.map((p, i) => (
                  <p key={i} className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {p}
                  </p>
                ))}
              </div>

              {/* Highlights */}
              {work.highlights?.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                    Highlights
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {work.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {work.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {/* Report / doc link */}
              {work.docUrl && (
                <a href={work.docUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
                  <FileText size={16} /> {work.docLabel || 'View Report'}
                </a>
              )}

              {/* Gallery — uniform square thumbnails */}
              {work.gallery?.length > 0 && (
                <div className="mt-8">
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                    Gallery
                  </h4>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {work.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setLightbox(i)}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 dark:border-zinc-800"
                      >
                        <img
                          src={img.src}
                          alt={img.caption || `${work.title} ${i + 1}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="absolute inset-0 bg-accent-500/0 transition-colors duration-300 group-hover:bg-accent-500/15" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <Lightbox
            images={work.gallery || []}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={setLightbox}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
