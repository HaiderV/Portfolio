import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'

/* ------------------------------------------------------------------
   Add an entry by appending another object — the track, the nodes and
   the spacing all render from this array. Newest first reads best.

   role        job / position title
   org         company or organisation
   kind        short badge, e.g. 'Internship' | 'Full-time' | 'Freelance'
   duration    how long, e.g. '2 weeks' | 'Jun – Aug 2025'
   location    optional — shown only if you fill it in
   description what you did
   tags        optional list of small chips
   link        optional URL; when set the card becomes a link
------------------------------------------------------------------ */
const EXPERIENCE = [
  {
    role: 'Web Development Intern',
    org: 'Inamigos Foundation',
    kind: 'Internship',
    duration: '2 weeks',
    location: '',
    description:
      'Developed web solutions to support social welfare and community outreach campaigns during an internship at Inamigos Foundation.',
    tags: ['Web Development'],
    link: null,
  },
]

const ExperienceSection = () => {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1]

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.1 } } }
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease } },
  }
  const drawLine = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: reduce ? 0 : 1, ease } },
  }
  const drawRail = {
    hidden: { scaleY: 0 },
    show: { scaleY: 1, transition: { duration: reduce ? 0 : 1.1, ease, delay: reduce ? 0 : 0.15 } },
  }
  const popNode = {
    hidden: { scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.45, ease, delay: reduce ? 0 : 0.45 },
    },
  }

  return (
    <section
      id="experiences"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#08090D] text-white"
    >
      {/* blue highlights, same corners as the Education block */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(58% 52% at 0% 0%, rgba(43,107,255,0.20), transparent 70%),
            radial-gradient(58% 52% at 100% 100%, rgba(43,107,255,0.20), transparent 70%)
          `,
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* faint editorial watermark */}
      <div className="pointer-events-none absolute left-0 top-2 select-none font-serif text-[34vw] leading-[0.8] text-white/[0.035] sm:left-2 sm:text-[12vw]">
        05
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        {/* ---------- header ---------- */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#3b74ff]">05</span>
          <motion.span
            variants={drawLine}
            className="h-px flex-1 origin-left bg-gradient-to-r from-white/20 to-transparent"
          />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#3b74ff]">Experience</span>
        </div>

        <motion.h2
          variants={rise}
          className="mt-8 font-serif text-4xl leading-[1.1] text-white/90 sm:text-5xl"
        >
          Where I&rsquo;ve worked
        </motion.h2>
        <motion.p variants={rise} className="mt-4 max-w-xl text-sm leading-relaxed text-white/45">
          Roles, internships and the work behind them.
        </motion.p>

        {/* ---------- the track ---------- */}
        <ol className="relative mt-16">
          {/* rail */}
          <motion.span
            aria-hidden
            variants={drawRail}
            className="pointer-events-none absolute bottom-4 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-[#2b6bff] via-[#2b6bff]/45 to-transparent"
          />
          {/* tick marks along the rail */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-4 left-[-4px] top-2 hidden w-[23px] opacity-[0.12] sm:block"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0 1px, transparent 1px 16px)',
            }}
          />

          {EXPERIENCE.map((item, i) => {
            const Card = item.link ? motion.a : motion.div
            const linkProps = item.link
              ? { href: item.link, target: '_blank', rel: 'noreferrer' }
              : {}

            return (
              <motion.li
                key={`${item.org}-${item.role}-${i}`}
                variants={rise}
                className="relative pb-10 pl-9 last:pb-0 sm:pl-14"
              >
                {/* node on the rail */}
                <motion.span
                  aria-hidden
                  variants={popNode}
                  className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center"
                >
                  <span className="absolute h-[15px] w-[15px] rounded-full border border-[#2b6bff]/45" />
                  <span className="absolute h-[15px] w-[15px] rounded-full bg-[#2b6bff]/15 blur-[3px]" />
                  <span className="relative h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_12px_2px_rgba(43,107,255,0.85)]" />
                </motion.span>

                {/* card */}
                <Card
                  {...linkProps}
                  className={`glass-edge group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 sm:p-6 ${
                    item.link ? 'hover:border-[#2b6bff]/35 hover:shadow-[0_24px_60px_-34px_rgba(43,107,255,0.8)]' : ''
                  }`}
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B0D12]">
                      {item.kind}
                    </span>
                    <span className="rounded-full border border-[#2b6bff]/35 bg-[#2b6bff]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#7ba0ff]">
                      {item.duration}
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                        <MapPin size={11} />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-medium tracking-tight text-white sm:text-xl">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-white/40">
                    {item.org}
                  </p>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>

                  {item.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.li>
            )
          })}
        </ol>
      </motion.div>
    </section>
  )
}

export default ExperienceSection
