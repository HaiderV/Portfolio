import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  Phone,
  Mail,
  Send,
  Check,
  Loader2,
  CircleAlert,
  User,
  ArrowUpRight,
  MapPin,
  X,
} from 'lucide-react'

const EMAILJS_SERVICE_ID = 'service_kmjjhjd'
const EMAILJS_TEMPLATE_ID = 'template_gkqjmc4'
const EMAILJS_PUBLIC_KEY = '5i6hT-LOz6zRImSww'

const DETAILS = [
  { icon: User, label: 'Name', value: 'Haider S Vadgamwala', href: null },
  { icon: Phone, label: 'Phone', value: '7483597460', href: 'tel:+917483597460' },
  { icon: Mail, label: 'Email', value: 'haidervadgamwala2@gmail.com', href: 'mailto:haidervadgamwala2@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Bangalore', href: null },
]

const inputBase =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-[#2b6bff]/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#2b6bff]/20'

function Field({ label, name, type = 'text', textarea = false, placeholder, required = true }) {
  const id = `contact-${name}`
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/40"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          required={required}
          placeholder={placeholder}
          className={`${inputBase} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={inputBase}
        />
      )}
    </div>
  )
}

function DetailRow({ item }) {
  const Icon = item.icon
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#5b8bff] transition-colors duration-300 group-hover:border-[#2b6bff]/40 group-hover:text-[#8aabff]">
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.2em] text-white/35">
          {item.label}
        </span>
        <span className="block truncate text-sm text-white/85">{item.value}</span>
      </span>
      {item.href && (
        <ArrowUpRight
          size={15}
          className="ml-auto shrink-0 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/55"
        />
      )}
    </>
  )

  const cls =
    'group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 backdrop-blur-xl transition-[border-color,background-color] duration-300'

  return item.href ? (
    <a href={item.href} className={`${cls} hover:border-[#2b6bff]/30 hover:bg-white/[0.05]`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

const ContactSection = () => {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
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

  useEffect(() => {
    if (status !== 'success' && status !== 'error') return undefined
    const timeout = window.setTimeout(() => setStatus('idle'), 5000)
    return () => window.clearTimeout(timeout)
  }, [status])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    const form = e.currentTarget

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const banner = {
    success: {
      cls: 'text-[#17613f]',
      icon: <Check size={17} className="mt-0.5 shrink-0 text-[#218653]" />,
      text: 'Message sent — thanks for reaching out. I\u2019ll get back to you soon.',
    },
    error: {
      cls: 'text-[#8b3434]',
      icon: <CircleAlert size={17} className="mt-0.5 shrink-0 text-[#c34747]" />,
      text: 'Something went wrong. Please try again, or email me directly at haidervadgamwala2@gmail.com.',
    },
  }

  return (
    <section
      id="contact"
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
        08
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        {/* ---------- header ---------- */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#3b74ff]">08</span>
          <motion.span
            variants={drawLine}
            className="h-px flex-1 origin-left bg-gradient-to-r from-white/20 to-transparent"
          />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#3b74ff]">Contact</span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---------- left: details ---------- */}
          <div className="lg:col-span-5">
            <motion.h2
              variants={rise}
              className="font-serif text-4xl leading-[1.1] text-white/90 sm:text-5xl"
            >
              Get in touch
            </motion.h2>
            <motion.p
              variants={rise}
              className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:text-base"
            >
              Have a project, an opportunity, or just want to say hello? Send a message and
              I&rsquo;ll get back to you.
            </motion.p>

            <motion.div variants={rise} className="mt-8 space-y-3">
              {DETAILS.map((item) => (
                <DetailRow key={item.label} item={item} />
              ))}
            </motion.div>
          </div>

          {/* ---------- right: form ---------- */}
          <motion.div variants={rise} className="lg:col-span-7">
            <div className="glass-edge relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" />
                  <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                </div>
                <Field label="Subject" name="subject" placeholder="What&rsquo;s this about?" />
                <Field
                  label="Message"
                  name="message"
                  textarea
                  placeholder="Tell me a little more…"
                />

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#2b6bff] px-6 py-3.5 text-sm font-medium text-white shadow-[0_18px_44px_-18px_rgba(43,107,255,0.95)] transition-all duration-300 hover:bg-[#3d78ff] hover:shadow-[0_22px_54px_-18px_rgba(43,107,255,1)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  <span className="text-[11px] text-white/30">All fields required</span>
                </div>
              </form>

            </div>
          </motion.div>
        </div>

      </motion.div>

      <AnimatePresence>
        {banner[status] && (
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : 28, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : 28, y: reduce ? 0 : 12 }}
            transition={{ duration: reduce ? 0 : 0.3, ease }}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live={status === 'error' ? 'assertive' : 'polite'}
            className="fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#111318]/95 p-4 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:bottom-6 sm:right-6"
          >
            <div className="grain pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light" />
            <span
              className={`absolute inset-y-0 left-0 w-1 ${status === 'success' ? 'bg-emerald-400' : 'bg-rose-400'}`}
            />
            <div className="relative flex items-start gap-3 pl-1">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                {banner[status].icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold tracking-wide">
                  {status === 'success' ? 'Message delivered' : 'Couldn’t send message'}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/60">
                  {banner[status].text}
                </p>
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => setStatus('idle')}
                className="shrink-0 rounded-full p-1 text-white/40 transition hover:bg-white/[0.08] hover:text-white"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ContactSection
