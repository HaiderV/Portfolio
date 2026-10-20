import { motion, useReducedMotion } from 'framer-motion'
import { Server, GitBranch, Cloud, Brain, Target, ArrowUpRight } from 'lucide-react'

const FOCUS = [
  { icon: Server, label: 'Backend Development' },
  { icon: GitBranch, label: 'DevOps' },
  { icon: Cloud, label: 'Cloud Computing' },
  { icon: Brain, label: 'AI / Machine Learning' },
]

const AboutSection = () => {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1]

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09 } },
  }
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease } },
  }
  const drawLine = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: reduce ? 0 : 1, ease } },
  }

  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#08090d] text-white">
      {/* seam with the hero above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* soft brand glow + grain — pure CSS, no WebGL here */}
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full opacity-70 blur-2xl sm:h-96 sm:w-96"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(43,107,255,0.32), rgba(43,107,255,0.06) 55%, transparent 72%)',
        }}
      />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(120,140,255,0.18), transparent 68%)',
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light" />

      {/* faint editorial watermark */}
      <div className="pointer-events-none absolute right-2 top-3 select-none font-serif text-[26vw] leading-none text-white/[0.03] sm:right-6 sm:text-[11vw]">
        01
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        {/* ---------- eyebrow ---------- */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#3b74ff]">About</span>
          <motion.span
            variants={drawLine}
            className="h-px flex-1 origin-left bg-gradient-to-r from-white/35 via-white/20 to-transparent"
          />
          <span className="text-[11px] tracking-[0.35em] text-[#3b74ff]">01</span>
        </div>

        {/* ---------- lead statement ---------- */}
        <motion.p
          variants={rise}
          className="mt-10 max-w-4xl font-serif text-2xl leading-[1.35] text-white/70 sm:text-3xl lg:text-[2.6rem] lg:leading-[1.3]"
        >
          I&rsquo;m a second-year BCA student specializing in{' '}
          <span className="text-white">Artificial Intelligence and Machine Learning</span>, focused
          on developing practical skills across software development, data, and cloud technologies.
        </motion.p>

        {/* ---------- prose + focus panel ---------- */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 text-[15px] leading-relaxed text-white/55 sm:text-base lg:col-span-7">
            <motion.p variants={rise}>
              My interests span backend development, DevOps, cloud computing, and AI/ML. I enjoy
              understanding how different parts of a system work together, from building backend
              services and working with databases to deploying and maintaining applications.
            </motion.p>
            <motion.p variants={rise}>
              I believe in <span className="text-white/90">discipline over motivation</span> and
              focus on improving through consistent learning and hands-on practice. I prefer turning
              what I learn into real projects, experimenting with different technologies, and
              solving problems rather than simply consuming content.
            </motion.p>
          </div>

          <motion.div variants={rise} className="lg:col-span-5">
            <div className="glass-edge relative rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
              <h3 className="px-1 text-[11px] uppercase tracking-[0.28em] text-white/40">
                Focus areas
              </h3>
              <ul className="mt-4 space-y-1">
                {FOCUS.map(({ icon: Icon, label }) => (
                  <motion.li
                    key={label}
                    variants={rise}
                    className="group flex items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-300 hover:bg-white/[0.04]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#4b7dff] transition-colors duration-300 group-hover:border-[#2b6bff]/40 group-hover:text-[#7ba0ff]">
                      <Icon size={16} />
                    </span>
                    <span className="text-sm text-white/65 transition-colors duration-300 group-hover:text-white">
                      {label}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="ml-auto text-white/15 transition-colors duration-300 group-hover:text-white/50"
                    />
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ---------- long-term goal ---------- */}
        <motion.div
          variants={rise}
          className="glass-edge relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl sm:p-9"
        >
          <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#2b6bff] via-[#2b6bff]/40 to-transparent" />
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2b6bff]/30 bg-[#2b6bff]/10 text-[#6b93ff]">
              <Target size={18} />
            </span>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                Long-term goal
              </h3>
              <p className="mt-3 font-serif text-lg leading-relaxed text-white/85 sm:text-xl lg:text-[1.4rem]">
                My long-term goal is to move into <span className="text-white">MLOps</span>,
                combining machine learning with backend engineering, cloud infrastructure, and
                scalable deployment practices to build reliable production-ready systems.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AboutSection
