import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)

  // React to scroll — tighten + deepen the glass.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track the section crossing a consistent point in the viewport.
  useEffect(() => {
    const sections = LINKS
      .map((link) => ({ link, element: document.getElementById(link.href.slice(1)) }))
      .filter(({ element }) => element)
    if (!sections.length) return

    let frame = 0
    const updateActiveSection = () => {
      frame = 0
      const marker = window.innerHeight * 0.35
      const atPageBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      const current = atPageBottom
        ? sections[sections.length - 1]
        : sections.find(({ element }) => {
            const bounds = element.getBoundingClientRect()
            return bounds.top <= marker && bounds.bottom > marker
          }) || sections.reduce((previous, section) => {
            return section.element.getBoundingClientRect().top <= marker ? section : previous
          }, sections[0])

      setActive(current.link.name)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (link) => {
    setActive(link.name)
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 sm:pt-6">
      {/* ---------- Desktop: floating glass capsule ---------- */}
      <nav
        className={`glass-edge relative hidden items-center gap-1 rounded-full border border-white/10 px-2 py-2 backdrop-blur-2xl md:flex ${
          scrolled
            ? 'bg-[#0b0b0f]/85 shadow-[0_10px_44px_-14px_rgba(0,0,0,0.95)]'
            : 'bg-white/[0.045]'
        }`}
      >
        {/* light catching the top rim */}
        <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        {LINKS.map((link) => {
          const isActive = active === link.name
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNav(link)}
              className={`relative z-10 rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              {isActive && (
                <span
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#2b6bff] to-[#0051ff] shadow-[0_0_26px_-4px_rgba(43,107,255,0.85),inset_0_1px_0_rgba(255,255,255,0.45)]"
                />
              )}
              {link.name}
            </a>
          )
        })}
      </nav>

      {/* ---------- Mobile: compact glass bar ---------- */}
      <nav
        className={`glass-edge relative flex w-full max-w-md items-center justify-between rounded-2xl border border-white/10 px-4 py-3 backdrop-blur-2xl md:hidden ${
          scrolled ? 'bg-[#0b0b0f]/85' : 'bg-white/[0.05]'
        }`}
      >
        <span className="text-sm font-semibold tracking-tight text-white">
          HV<span className="text-[#2b6bff]">.</span>
        </span>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/15"
        >
          <Menu size={16} />
        </button>
      </nav>

      {/* ---------- Mobile sheet ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-edge relative mx-4 mt-5 rounded-3xl border border-white/10 bg-[#0b0b0f]/92 p-5 backdrop-blur-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-white/45">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNav(link)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                    className={`rounded-xl px-4 py-3 text-base transition ${
                      active === link.name
                        ? 'bg-white/10 font-medium text-white'
                        : 'text-white/65 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header