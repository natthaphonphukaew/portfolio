import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ theme, toggle }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-zinc-200/70 bg-white/70 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-[#0a0a0a]/70'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="section flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-accent-400 text-black shadow-glow-sm transition-transform duration-300 group-hover:scale-110">
            N
          </span>
          <span className="hidden sm:inline">Natthaphon</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-1 hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-accent-600 dark:text-zinc-300 dark:hover:text-accent-300"
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent-500 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>
      </nav>
    </motion.header>
  )
}
