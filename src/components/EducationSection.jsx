import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, GraduationCap } from 'lucide-react'

/* ------------------------------------------------------------------
   Drop real logos in by setting `logo` to an image path/URL, e.g.
   logo: '/logos/meta.svg'. While it's null the tile shows the badge
   monogram, so the layout is identical either way — the image just
   fills the same square.
------------------------------------------------------------------ */
const EDUCATION = [
  {
    badge: 'M',
    logo: 'data:image/png;base64,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',
    link: 'https://drive.google.com/file/d/1w7RBm7wubsdtXc5KONb2bzXHImkU2eS1/view?usp=drive_link',
    title: 'Frontend Developer',
    provider: 'Meta',
    status: 'Completed',
    desc: 'Completed frontend development course provided by Meta, focusing on modern UI and web fundamentals.',
  },
  {
    badge: 'AU',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy1pH7_JGQiPZ2uKFH5i34fpUUi3w1njb5OQ&s',
    link: 'https://drive.google.com/file/d/1ZhJbu80t6uYj-mbp_Fu0RI8-hvEZUFhm/view?usp=sharing',
    title: 'Data Science Using Python',
    provider: 'Aligarh University',
    status: 'Completed',
    desc: 'Completed Data Science using Python course from Aligarh University, covering basics of data analysis and tools.',
  },
  {
    badge: 'UC',
    logo: 'https://www.colorado.edu/imc/sites/default/files/styles/small_500px_25_display_size_/public/2025-07/athletics%20interlocking%20CU.png?itok=42K-3dJ8',
    link: 'https://www.coursera.org/account/accomplishments/verify/HD6P1SIKDYHE',
    title: 'Database Management Essentials',
    provider: 'University of Colorado · Coursera',
    status: 'Completed',
    desc: 'Completed Database Management Essentials from the University of Colorado through Coursera, covering core database concepts, relational database design, SQL, data modeling, and database management fundamentals.',
  },
  {
    badge: 'NM',
    logo: 'https://www.freepnglogos.com/uploads/ibm-logo-png/ibm-logo-png-transparent-svg-vector-bie-supply-3.png',
    link: 'https://www.coursera.org/account/accomplishments/verify/V635H420PTTF',
    title: 'Node.js & MongoDB: Developing Back-end Database Applications',
    provider: '', // TODO: add the provider
    status: 'Completed',
    desc: 'Completed the Node.js & MongoDB course on developing back-end database applications.',
  },
  {
    badge: 'CA',
    logo: 'https://caias.in/wp-content/uploads/2025/04/fav.webp',
    link: 'https://caias.in/programmes/bca-ai-and-ml/',
    title: 'BCA (AI & ML)',
    provider: 'Christ Academy Institute for Advanced Studies',
    status: 'Pursuing',
    desc: 'Pursuing BCA with AI & ML from Christ Academy Institute for Advanced Studies, building a strong tech foundation.',
  },
]

function LogoSlot({ item }) {
  return (
    <div className="glass-edge relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 group-hover:border-white/20 sm:h-16 sm:w-16">
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.provider || item.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-serif text-base text-white/45 transition-colors duration-300 group-hover:text-white/70 sm:text-lg">
          {item.badge}
        </span>
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}

function StatusChip({ status }) {
  const pursuing = status.toLowerCase() === 'pursuing'
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${
        pursuing
          ? 'border-[#2b6bff]/35 bg-[#2b6bff]/10 text-[#7ba0ff]'
          : 'border-white/10 bg-white/[0.03] text-white/45'
      }`}
    >
      {pursuing ? <GraduationCap size={11} /> : <Check size={11} />}
      {status}
    </span>
  )
}

const EducationSection = () => {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1]

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.08 } } }
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.65, ease } },
  }
  const drawLine = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: reduce ? 0 : 1, ease } },
  }

  return (
    <section id="education" className="relative w-full scroll-mt-24 overflow-hidden bg-[#08090D] text-white">
      {/* radial background: base #08090D + #2B6BFF @ 20% in the
          top-left and bottom-right corners, fading to transparent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(58% 52% at 0% 0%, rgba(43,107,255,0.20), transparent 70%),
            radial-gradient(58% 52% at 100% 100%, rgba(43,107,255,0.20), transparent 70%)
          `,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light" />
      <div className="pointer-events-none absolute left-2 top-3 select-none font-serif text-[26vw] leading-none text-white/[0.03] sm:left-6 sm:text-[11vw]">
        02
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
      <div className="mb-12">
        <div className="flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#3b74ff]">02</span>
          <motion.span
            variants={drawLine}
            className="h-px flex-1 origin-left bg-gradient-to-r from-white/20 to-transparent"
          />
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#3b74ff]">Education</span>
        </div>
        <motion.h2
          variants={rise}
          className="mt-8 font-serif text-4xl leading-[1.1] text-white/90 sm:text-5xl"
        >
          Education
        </motion.h2>
        <motion.p variants={rise} className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base">
          Courses and credentials I&rsquo;ve completed alongside the degree I&rsquo;m currently pursuing.
        </motion.p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
            {EDUCATION.map((item, i) => (
              <motion.li
                key={item.title}
                variants={rise}
                className="h-full"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${item.title} credential or program in a new tab`}
                  className="glass-edge group relative flex h-full flex-col rounded-3xl border border-white/[0.09] bg-white/[0.025] p-5 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#2b6bff]/35 hover:bg-white/[0.05] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b6bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090D] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-4">
                      <LogoSlot item={item} />
                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <StatusChip status={item.status} />
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/35 transition duration-300 group-hover:border-[#2b6bff]/35 group-hover:bg-[#2b6bff]/10 group-hover:text-[#8eacff]">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-base font-medium leading-snug text-white/85 transition-colors duration-300 group-hover:text-white sm:text-lg">
                      {item.title}
                    </h3>
                    {item.provider && (
                      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {item.provider}
                      </p>
                    )}
                    <p className="mt-4 text-sm leading-relaxed text-white/50">
                      {item.desc}
                    </p>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
      </motion.div>
    </section>
  )
}

export default EducationSection