import { motion, useReducedMotion } from 'framer-motion'
import {
  Brain,
  ChartLine,
  ChartPie,
  Database,
  Layers,
  Film,
  Code2,
  Workflow,
} from 'lucide-react'
import { SKILL_ICONS } from '../assets/skillLogos'

/* ------------------------------------------------------------------
   Add or remove a skill by editing one line here — the layout, counts
   and animations are all driven off this data.
     brand skill  ->  { name: 'React', icon: 'react' }
     generic one  ->  { name: 'SQL', Icon: Database }   (a lucide icon)
------------------------------------------------------------------ */
const GROUPS = [
  {
    label: 'Frontend',
    hint: 'Interfaces & the web',
    span: 'lg:col-span-2',
    skills: [
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css3' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    label: 'Backend & Cloud',
    hint: 'Servers, data & deployment',
    span: 'lg:col-span-2',
    skills: [
      { name: 'Express.js', icon: 'express' },
      { name: 'SQL', Icon: Database },
      { name: 'NoSQL', Icon: Layers },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Cloudinary', icon: 'cloudinary' },
    ],
  },
  {
    label: 'AI / ML & Data',
    hint: 'Models, analysis & notebooks',
    span: 'lg:col-span-2',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'Machine Learning', Icon: Brain },
      { name: 'Data Analysis', Icon: ChartLine },
      { name: 'Data Visualization', Icon: ChartPie },
      { name: 'Jupyter Notebook', icon: 'jupyter' },
      { name: 'Ollama', icon: 'ollama' },
      { name: 'Orange', icon: 'orange' },
    ],
  },
  {
    label: 'Tools & Workflow',
    hint: 'The day-to-day kit',
    span: 'lg:col-span-4',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'visualstudiocode' },
      { name: 'Antigravity', Icon: Code2 },
      { name: 'Postman', icon: 'postman' },
      { name: 'MS Office', icon: 'microsoftoffice' },
    ],
  },
  {
    label: 'Design & Media',
    hint: 'Visual & content',
    span: 'lg:col-span-2',
    skills: [
      { name: 'Canva', icon: 'canva' },
      { name: 'Video Editing', Icon: Film },
    ],
  },
]

function BrandGlyph({ icon, size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill={`#${icon.hex}`}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  )
}

function SkillChip({ skill, variants }) {
  const brand = skill.icon ? SKILL_ICONS[skill.icon] : null
  const Glyph = skill.Icon
  return (
    <motion.li
      variants={variants}
      className="flex items-center gap-2 rounded-xl border border-black/[0.06] bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2b6bff]/30 hover:shadow-[0_10px_22px_-10px_rgba(43,107,255,0.45)]"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {brand ? (
          <BrandGlyph icon={brand} size={18} />
        ) : (
          <Glyph size={16} className="text-[#2b6bff]" strokeWidth={1.75} />
        )}
      </span>
      <span className="whitespace-nowrap text-[13px] font-medium text-[#2a2f38]">
        {skill.name}
      </span>
    </motion.li>
  )
}

const SkillsSection = () => {
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
  const card = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease, staggerChildren: reduce ? 0 : 0.035 },
    },
  }
  const chip = {
    hidden: { opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0 : 0.35, ease } },
  }

  return (
    <section
      id="skills"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#F2F4F8] text-[#0B0D12]"
    >
      {/* soft brand wash — same #2B6BFF as the dark sections, dialled down */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(55% 45% at 100% 0%, rgba(43,107,255,0.10), transparent 70%),
            radial-gradient(50% 45% at 0% 100%, rgba(43,107,255,0.08), transparent 70%)
          `,
        }}
      />
      {/* faint dot grid, the light-theme cousin of the dark grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgba(12,13,18,0.055) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/[0.06]" />
      <div className="pointer-events-none absolute left-2 top-3 select-none font-serif text-[26vw] leading-none text-black/[0.035] sm:left-6 sm:text-[11vw]">
        03
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        {/* ---------- header, mirroring the Education block ---------- */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#2b6bff]">03</span>
          <motion.span
            variants={drawLine}
            className="h-px flex-1 origin-left bg-gradient-to-r from-black/15 to-transparent"
          />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#2b6bff]">Skills</span>
        </div>

        <motion.h2
          variants={rise}
          className="mt-8 font-serif text-4xl leading-[1.1] text-[#0B0D12] sm:text-5xl"
        >
          Skills &amp; Tools
        </motion.h2>
        <motion.p variants={rise} className="mt-4 max-w-xl text-sm leading-relaxed text-[#5A6069]">
          The languages, frameworks and tools I build and experiment with — grouped by where they
          sit in the stack.
        </motion.p>

        {/* ---------- bento grid of categories ---------- */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {GROUPS.map((group) => (
            <motion.div
              key={group.label}
              variants={card}
              className={`group relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white/75 p-6 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(20,30,60,0.35)] ${group.span}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-tight text-[#0B0D12]">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] text-[#9AA1AB]">
                  {String(group.skills.length).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#9AA1AB]">
                {group.hint}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} variants={chip} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default SkillsSection