import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.06 },
  }),
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <div className="section">
        <motion.span
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="eyebrow mb-4"
        >
          <Sparkles size={14} /> About Me
        </motion.span>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Bio + summary */}
          <div>
            {profile.about.map((p, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="mb-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg"
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="card mt-2 border-l-4 border-l-accent-500 p-5"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                In short
              </p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-200">{profile.summary}</p>
            </motion.div>
          </div>

          {/* Education card */}
          <motion.aside
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="card h-fit p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/15 text-accent-600 dark:text-accent-400">
                <GraduationCap size={22} />
              </span>
              <h3 className="text-lg font-bold">Education</h3>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Degree</dt>
                <dd className="font-semibold">{profile.education.degree}</dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Faculty</dt>
                <dd className="font-semibold">{profile.education.school}</dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">University</dt>
                <dd className="font-semibold">{profile.education.university}</dd>
              </div>
              <div className="flex gap-6">
                <div>
                  <dt className="text-zinc-500 dark:text-zinc-400">Standing</dt>
                  <dd className="font-semibold">{profile.education.year}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500 dark:text-zinc-400">GPAX</dt>
                  <dd className="font-semibold text-accent-600 dark:text-accent-400">
                    {profile.education.gpax}
                  </dd>
                </div>
              </div>
            </dl>
            <div className="mt-5 flex items-center gap-2 border-t border-zinc-200 pt-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <MapPin size={15} /> {profile.location}
            </div>
          </motion.aside>
        </div>

        {/* Skills */}
        <div className="mt-16">
          <motion.h3
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mb-6 text-xl font-bold sm:text-2xl"
          >
            Skills & Toolkit
          </motion.h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {profile.skills.map((group, i) => (
              <motion.div
                key={group.group}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="card p-5 transition-shadow duration-300 hover:shadow-glow-sm"
              >
                <h4 className="mb-3 text-sm font-bold text-accent-600 dark:text-accent-400">
                  {group.group}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
