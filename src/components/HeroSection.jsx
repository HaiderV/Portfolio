import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import GlassBlobs from './GlassBlobs'

const ease = [0.16, 1, 0.3, 1]

/* Inline brand glyph — lucide dropped brand icons, so we ship our own. */
const Linkedin = ({ size = 13, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.46-2.2 2.96V21h-4z" />
  </svg>
)

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: 0.25 + i * 0.12 },
  }),
}

const headlineReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.15, ease, delay: 0.35 },
  },
}

/* Bottom contact row. */
const ContactRow = () => {
  const items = [
    {
      icon: Linkedin,
      label: 'linkedin.com/in/haider-vadgamwala',
      href: 'https://www.linkedin.com/in/haider-vadgamwala-220728281/?isSelfProfile=true',
      target: '_blank',
    },
    { icon: Phone, label: '+91 74835 97460', href: 'tel:+917483597460' },
    {
      icon: Mail,
      label: 'haidervadgamwala2@gmail.com',
      href: 'mailto:haidervadgamwala2@gmail.com',
    },
  ]
  return (
    <motion.div
      variants={fadeUp}
      custom={2}
      initial="hidden"
      animate="show"
      className="relative z-30 flex flex-col items-center gap-4 pb-2"
    >
      <p className="font-serif text-lg italic text-white/85 sm:text-xl">
        Let&rsquo;s build something together?
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white/45 sm:text-xs">
        {items.map(({ icon: Icon, label, href, target }) => (
          <a
            key={label}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noreferrer' : undefined}
            className="group flex items-center gap-2 transition hover:text-white/80"
          >
            <Icon size={13} className="text-white/35 transition group-hover:text-[#2b6bff]" />
            <span className="truncate">{label}</span>
          </a>
        ))}
      </div>
    </motion.div>
  )
}

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#f4f4f5] text-white"
    >
      {/* ---------- Background stack ---------- */}
      <div className="hero-background pointer-events-none absolute inset-0" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light" />

      {/* ---------- Foreground content ---------- */}
      <div className="relative z-30 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        {/* headline block sits UNDER the canvas (z-10) so blobs float over it */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-10 text-center">
          <motion.h1
            variants={headlineReveal}
            initial="hidden"
            animate="show"
            className="hero-word select-none font-sans uppercase"
          >
            PORTFOLIO
          </motion.h1>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col items-center gap-4 sm:mt-10"
          >
            <h2 className="font-serif text-3xl font-medium tracking-tight text-[#f2f2f3] sm:text-4xl lg:text-5xl">
              Haider Vadgamwala
            </h2>
            <div className="flex flex-col items-center gap-2 text-[#9aa0a6] sm:flex-row sm:gap-3">
              <span className="font-serif text-lg italic tracking-wide sm:text-xl">
                Backend Developer
              </span>
              <span className="hidden text-2xl font-extralight text-[#3a3a40] sm:inline">•</span>
              <p className="text-sm tracking-wide text-[#8a8f96] sm:text-base">
                AIML <span className="px-1 font-mono text-[#2f2f36]">&amp;</span> Cloud Enthusiast
              </p>
            </div>
          </motion.div>
        </div>

        <ContactRow />
      </div>

      {/* ---------- WebGL glass layer (over the headline, under the UI) ---------- */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <GlassBlobs />
      </div>

    </section>
  )
}

export default HeroSection