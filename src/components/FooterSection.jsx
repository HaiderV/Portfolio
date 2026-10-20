import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, MapPin } from 'lucide-react'
import { SOCIAL_ICONS } from '../assets/socialIcons'
import hvLogo from '../assets/hv-logo.png'

/* Royal purplish blue, sitting alongside the site's blue */
const ACCENT = '#6D5EF8'

const NAV = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { key: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/haider-vadgamwala-220728281/' },
  { key: 'github', name: 'GitHub', url: 'https://github.com/HaiderV' },
  { key: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/haider.vad/' },
  { key: 'x', name: 'X', url: 'https://x.com/Haider_Vadgam' },
]

/* ------------------------------------------------------------------
   The sign is GHOST by default and only lights up on a flash.

   `values` sits at ~0.12 (barely-there ghost) for most of the cycle,
   then snaps to 1 for a few hundred milliseconds — a loose bulb
   stuttering on, not a clean on/off blink. Because the glow is part
   of the same element, opacity scales text AND glow together: dim
   ghost when idle, full bloom on the flash.

   `values` and `times` must stay the same length; times run 0 -> 1.
------------------------------------------------------------------ */
const FLICKER_VALUES = [0.12, 0.12, 1, 0.16, 1, 0.1, 0.92, 0.12, 0.12, 1, 0.14, 0.88, 0.12, 0.12]
const FLICKER_TIMES = [0, 0.3, 0.305, 0.33, 0.335, 0.36, 0.365, 0.4, 0.72, 0.725, 0.75, 0.755, 0.79, 1]
const FLICKER_DURATION = 10

/* A restrained white bloom keeps the wordmark ghostlike between flashes. */
const SIGN_GLOW =
  'drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(0 0 20px rgba(255,255,255,0.18)) drop-shadow(0 0 48px rgba(255,255,255,0.08))'

function SocialGlyph({ name, size = 17 }) {
  const icon = SOCIAL_ICONS[name]
  if (!icon) return null
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  )
}

const FooterSection = () => {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1]

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.08 } } }
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease } },
  }

  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })

  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      {/* ---------- proper black night ---------- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(90% 60% at 50% -12%, rgba(112,120,180,0.10), transparent 70%),
            radial-gradient(65% 55% at 8% 104%, rgba(109,94,248,0.17), transparent 70%),
            radial-gradient(65% 55% at 94% 100%, rgba(43,107,255,0.11), transparent 72%),
            #000000
          `,
        }}
      />
      {/* stars */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 38px 54px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 152px 26px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1.2px 1.2px at 214px 96px, rgba(255,255,255,0.55), transparent),
            radial-gradient(1px 1px at 92px 132px, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 268px 158px, rgba(255,255,255,0.45), transparent),
            radial-gradient(1.2px 1.2px at 176px 208px, rgba(255,255,255,0.38), transparent),
            radial-gradient(1px 1px at 58px 236px, rgba(255,255,255,0.3), transparent)
          `,
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
          opacity: 0.7,
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.1]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------- brand ---------- */}
          <div className="lg:col-span-5">
            <motion.div variants={rise} className="flex items-center gap-3">
              <span className="inline-flex rounded-[17px] shadow-[0_12px_30px_-16px_rgba(109,94,248,0.9)]">
                <img
                  src={hvLogo}
                  alt="HV logo"
                  className="h-11 w-11 rounded-[17px] object-cover"
                />
              </span>
              <span className="text-sm font-semibold tracking-tight">Haider S Vadgamwala</span>
            </motion.div>

            <motion.p variants={rise} className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
              Backend developer exploring cloud, data and machine learning — turning what I learn
              into things that actually run.
            </motion.p>

            <motion.div variants={rise} className="mt-5 flex items-center gap-2 text-sm text-white/55">
              <MapPin size={14} style={{ color: ACCENT }} />
              Bangalore
            </motion.div>
          </div>

          {/* ---------- navigate ---------- */}
          <motion.nav variants={rise} className="lg:col-span-4" aria-label="Footer">
            <h3 className="text-[11px] uppercase tracking-[0.28em] text-white/35">Navigate</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {NAV.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors duration-300 hover:text-white"
                  >
                    <span
                      className="h-1 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-[#6d5ef8]"
                      aria-hidden
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ---------- connect ---------- */}
          <motion.div variants={rise} className="lg:col-span-3">
            <h3 className="text-[11px] uppercase tracking-[0.28em] text-white/35">Connect</h3>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/55 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6d5ef8]/45 hover:bg-[#6d5ef8]/10 hover:text-[#b3a8ff] hover:shadow-[0_16px_34px_-16px_rgba(109,94,248,0.95)]"
                >
                  <SocialGlyph name={s.key} />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={toTop}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-white/55 backdrop-blur-xl transition-all duration-300 hover:border-[#6d5ef8]/45 hover:text-white"
            >
              Back to top
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <motion.div
          variants={rise}
          className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 sm:flex-row"
        >
          <span className="text-xs text-white/35">
            © {new Date().getFullYear()} Haider S Vadgamwala
          </span>
          <span className="text-xs text-white/25">Designed &amp; built by me</span>
        </motion.div>

        {/* ---------- the sign ---------- */}
        <motion.div variants={rise} className="mt-10">
          {/* opacity lives on the wrapper so the glow is rasterised once and
              only composited while it flickers */}
          <motion.div
            className="footer-sign"
            style={{ willChange: 'opacity' }}
            animate={reduce ? undefined : { opacity: FLICKER_VALUES }}
            transition={
              reduce
                ? undefined
                : {
                    duration: FLICKER_DURATION,
                    times: FLICKER_TIMES,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 115"
              preserveAspectRatio="xMidYMid meet"
              className="footer-wordmark block w-full"
              style={{ filter: SIGN_GLOW }}
            >
              <defs>
                <linearGradient id="footerSignGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F2F2F6" />
                  <stop offset="100%" stopColor="#D2D2DC" />
                </linearGradient>
              </defs>
              <text
                x="500"
                y="99"
                textAnchor="middle"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                fontSize="92"
                fontWeight="800"
                fill="url(#footerSignGrad)"
                style={{
                  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                HAIDER VADGAMWALA
              </text>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default FooterSection
