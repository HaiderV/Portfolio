import { motion, useReducedMotion } from 'framer-motion'
import { Download, ArrowUpRight } from 'lucide-react'

/* ------------------------------------------------------------------
   Point this at your PDF.

   Default (recommended): keep the file at  src/assets/resume.pdf
   — Vite fingerprints it and the import below returns its URL.

   If instead you put it in  public/resume.pdf  , delete the import
   and use:   const RESUME_URL = '/resume.pdf'
------------------------------------------------------------------ */
import resumePdf from '../assets/resume.pdf'

const RESUME_URL = resumePdf
const RESUME_FILENAME = 'Haider-Vadgamwala-Resume.pdf'

/* Decorative "document" preview — pure CSS, no image needed. */
const ResumeMock = () => (
  <div className="relative mx-auto w-full max-w-[250px]">
    <div className="pointer-events-none absolute -inset-10 rounded-full bg-[#2b6bff]/20 blur-3xl" />

    {/* back sheet */}
    <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[3deg] rounded-2xl border border-white/10 bg-white/[0.02]" />

    {/* front sheet */}
    <div className="glass-edge relative rotate-[-4deg] rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2b6bff]" />
        <span className="h-2.5 w-24 rounded bg-white/25" />
      </div>

      <div className="mt-5 space-y-2">
        <div className="h-2 w-full rounded bg-white/[0.12]" />
        <div className="h-2 w-11/12 rounded bg-white/10" />
        <div className="h-2 w-4/5 rounded bg-white/10" />
      </div>

      <div className="mt-5 space-y-2">
        <div className="h-2 w-1/3 rounded bg-white/20" />
        <div className="h-2 w-full rounded bg-white/[0.12]" />
        <div className="h-2 w-10/12 rounded bg-white/10" />
        <div className="h-2 w-3/4 rounded bg-white/10" />
      </div>

      <span className="absolute -bottom-4 -right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2b6bff] text-white shadow-[0_16px_34px_-12px_rgba(43,107,255,1)]">
        <Download size={18} />
      </span>
    </div>
  </div>
)

const ResumeSection = () => {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1]

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.1 } } }
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.65, ease } },
  }
  const drawLine = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: reduce ? 0 : 1, ease } },
  }
  const settle = {
    hidden: { opacity: 0, rotate: reduce ? -4 : -12, y: reduce ? 0 : 16 },
    show: { opacity: 1, rotate: -4, y: 0, transition: { duration: reduce ? 0 : 0.8, ease } },
  }

  return (
    <section
      id="resume"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#08090D] text-white"
    >
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

      <div className="pointer-events-none absolute left-0 top-2 select-none font-serif text-[34vw] leading-[0.8] text-white/[0.035] sm:left-2 sm:text-[12vw]">
        07
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        {/* ---------- header ---------- */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#3b74ff]">07</span>
          <motion.span
            variants={drawLine}
            className="h-px flex-1 origin-left bg-gradient-to-r from-white/20 to-transparent"
          />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#3b74ff]">Resume</span>
        </div>

        {/* ---------- panel ---------- */}
        <motion.div
          variants={rise}
          className="glass-edge mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl sm:p-10 lg:p-12"
        >
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* copy + button */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl leading-[1.1] text-white/90 sm:text-5xl">
                Resume
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
                The full picture in one file — experience, education and skills, ready to
                download.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.a
                  variants={rise}
                  href={RESUME_URL}
                  download={RESUME_FILENAME}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#2b6bff] px-6 py-3.5 text-sm font-medium text-white shadow-[0_18px_44px_-18px_rgba(43,107,255,0.95)] transition-all duration-300 hover:bg-[#3d78ff] hover:shadow-[0_22px_54px_-18px_rgba(43,107,255,1)]"
                >
                  <Download
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                  Download resume
                </motion.a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors duration-300 hover:text-white/80"
                >
                  or open in a new tab
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/45">
                  PDF
                </span>
                <span className="text-[11px] text-white/30">{RESUME_FILENAME}</span>
              </div>
            </div>

            {/* document mock */}
            <div className="lg:col-span-5">
              <motion.div variants={settle}>
                <ResumeMock />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ResumeSection