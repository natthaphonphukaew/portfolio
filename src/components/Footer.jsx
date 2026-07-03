import { motion } from 'framer-motion'
import { Mail, Phone, Instagram, Facebook, ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'

const iconFor = {
  email: Mail,
  phone: Phone,
  instagram: Instagram,
  facebook: Facebook,
}

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-zinc-200 py-20 dark:border-zinc-900">
      <div className="section">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-3xl" />

          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <span className="eyebrow mb-3">
                <Mail size={14} /> Get in Touch
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-black tracking-tight sm:text-4xl"
              >
                Let’s build something <span className="text-gradient">meaningful</span>.
              </motion.h2>
              <p className="mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
                Open to internships and opportunities in System Analysis, Business Analysis and
                product development. The fastest way to reach me is email.
              </p>
              <a href={profile.primaryContact.href} className="btn-primary mt-6">
                <Mail size={16} /> {profile.primaryContact.label}
              </a>
            </div>

            {/* Contact list */}
            <ul className="space-y-2">
              {profile.contacts.map((c) => {
                const Icon = iconFor[c.type] || Mail
                return (
                  <li key={c.type}>
                    <a
                      href={c.href}
                      target={c.type === 'email' || c.type === 'phone' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/50 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-glow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-500/15 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-black dark:text-accent-400">
                        <Icon size={17} />
                      </span>
                      <span className="text-sm font-medium">{c.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-4 py-2 font-medium transition-all hover:-translate-y-0.5 hover:border-accent-400 hover:text-accent-600 dark:border-zinc-700 dark:hover:text-accent-300"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
