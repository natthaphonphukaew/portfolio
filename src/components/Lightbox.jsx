import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const open = index !== null && index >= 0

  const prev = useCallback(
    (e) => {
      e?.stopPropagation()
      onNavigate((index - 1 + images.length) % images.length)
    },
    [index, images.length, onNavigate],
  )
  const next = useCallback(
    (e) => {
      e?.stopPropagation()
      onNavigate((index + 1) % images.length)
    },
    [index, images.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, prev, next])

  if (!open) return null
  const current = images[index]

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 sm:left-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-500 hover:text-black"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 sm:right-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-500 hover:text-black"
            >
              <ChevronRight size={26} />
            </button>
          </>
        )}

        <motion.figure
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[88vh] max-w-5xl flex-col items-center"
        >
          <img
            src={current.src}
            alt={current.caption || ''}
            className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
          />
          {current.caption && (
            <figcaption className="mt-3 text-center text-sm text-zinc-300">
              {current.caption}
              <span className="ml-2 text-zinc-500">
                {index + 1} / {images.length}
              </span>
            </figcaption>
          )}
        </motion.figure>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
