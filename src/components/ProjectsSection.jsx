import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ------------------------------------------------------------------
   Projects are data-driven — add one by dropping in another object.
   `link` decides the footer label: GitHub -> "View code", anything
   else (a deployed URL) -> "View live".
------------------------------------------------------------------ */
const PROJECTS = [
  {
    type: 'Data Science',
    title: 'Spam Email Detector',
    description:
      'Developed a supervised machine learning model for spam email detection, trained on a labeled dataset to classify emails with reliable accuracy.',
    link: 'https://github.com/HaiderV/Data-Science-Project---Email-Spam-Detector',
  },
  {
    type: 'Data Science',
    title: 'Image Classifier',
    description:
      'Built using the MNIST dataset to effectively train and predict handwritten digit recognition with high accuracy.',
    link: 'https://github.com/HaiderV/Data-Science-Project---Image-Classification',
  },
  {
    type: 'Front-End',
    title: 'Weather App',
    description:
      'A real-time weather dashboard using API integration featuring a clean UI and intuitive location search options.',
    link: 'https://github.com/HaiderV/Front_End_Project--3--weather',
  },
  {
    type: 'Front-End',
    title: 'Currency Converter',
    description:
      'Supports over 100 currencies with real-time conversion rates and a decent, user-friendly interface.',
    link: 'https://github.com/HaiderV/Front_End_Project--4--currency',
  },
  {
    type: 'Front-End',
    title: 'HV_Cloths',
    description:
      'A modern e-commerce platform for browsing and purchasing clothing items with a sleek, responsive design.',
    link: 'https://github.com/HaiderV/HV_Cloths',
  },
  {
    type: 'Front-End',
    title: 'CAIAS NOTES',
    description:
      'A student-focused platform for accessing, previewing, and downloading academic notes, built with React, TypeScript, Firebase, and Cloudinary.',
    link: 'https://github.com/HaiderV/CAIAS-NOTES',
  },
  {
    type: 'Full-Stack',
    title: 'PAPER-PILOT',
    description:
      'Paper Pilot — A Dockerized PDF processing tool that converts scanned PDFs into searchable, OCR-enabled documents using OCRmyPDF. Includes Ghostscript-based PDF compression and optimization for efficient file handling.',
    link: 'https://github.com/HaiderV/PaperPilot',
  },
  {
    type: 'Full-Stack',
    title: 'Repair-Replace',
    description:
      'Repair Before Replace is an AI-powered platform that analyzes damaged items and determines whether they are better repaired or replaced. It provides repair difficulty, estimated costs, required tools, and replacement alternatives to help users make a practical and cost-effective decision.',
    link: 'https://github.com/HaiderV/Hackathon-Repair-Replace',
  },
  {
    type: 'Full-Stack',
    title: 'Fit-Cloths',
    description: 'Fit Cloths is an end-to-end bespoke tailoring and e-commerce application that bridges computer vision anthropometry with an intelligent RAG styling agent. It allows users to capture tailoring-accurate body measurements from just two ordinary photos and receive personalized outfit recommendations tailored directly to their silhouette.',
    link: 'https://github.com/HaiderV/Fit-Cloths',
  },
  {
    type: 'Full-Stack',
    title: 'Student-GatePass-Exit-Management-System',
    description: 'A smarter way to manage who enters, who exits, and what happens at the gate.',
    link: 'https://github.com/HaiderV/Student-Gate-Pass-Exit-Management-System',
  },
]

/* one accent per discipline, kept in the same blue family */
const TINTS = {
  'Data Science': { dot: '#6D5EF8', text: '#5B4BE0', bg: 'rgba(109,94,248,0.10)', border: 'rgba(109,94,248,0.24)' },
  'Front-End': { dot: '#2B6BFF', text: '#2B6BFF', bg: 'rgba(43,107,255,0.10)', border: 'rgba(43,107,255,0.24)' },
  'Full-Stack': { dot: '#0E9F8E', text: '#0B8477', bg: 'rgba(14,159,142,0.10)', border: 'rgba(14,159,142,0.24)' },
}
const FALLBACK_TINT = { dot: '#2B6BFF', text: '#2B6BFF', bg: 'rgba(43,107,255,0.10)', border: 'rgba(43,107,255,0.24)' }

const FILTERS = ['All', 'Data Science', 'Front-End', 'Full-Stack']

function ProjectCard({ project, index, reduce, ease }) {
  const tint = TINTS[project.type] || FALLBACK_TINT
  const isRepo = project.link.includes('github.com')

  return (
    <motion.a
      layout
      href={project.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
      transition={{ duration: reduce ? 0 : 0.35, ease }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white/75 p-6 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-[#2b6bff]/25 hover:shadow-[0_26px_60px_-32px_rgba(20,30,60,0.42)]"
    >
      {/* hairline that lights up on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2b6bff]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] text-[#9AA1AB]">{String(index + 1).padStart(2, '0')}</span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]"
          style={{ background: tint.bg, borderColor: tint.border, color: tint.text }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: tint.dot }} />
          {project.type}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#0B0D12]">{project.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-[#5A6069]">{project.description}</p>

      <div className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-medium text-[#2b6bff]">
        <span>{isRepo ? 'View code' : 'View live'}</span>
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </motion.a>
  )
}

const ProjectsSection = () => {
  const [filter, setFilter] = useState('All')
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1]

  const shown = useMemo(
    () => PROJECTS.map((p, i) => ({ ...p, _i: i })).filter((p) => filter === 'All' || p.type === filter),
    [filter],
  )

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
    <section
      id="projects"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#F2F4F8] text-[#0B0D12]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(55% 45% at 100% 0%, rgba(43,107,255,0.10), transparent 70%),
            radial-gradient(50% 45% at 0% 100%, rgba(43,107,255,0.08), transparent 70%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgba(12,13,18,0.055) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/[0.06]" />

      {/* faint editorial watermark, matching the Skills block */}
      <div className="pointer-events-none absolute left-0 top-2 select-none font-serif text-[34vw] leading-[0.8] text-black/[0.04] sm:left-2 sm:text-[12vw]">
        04
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
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#2b6bff]">04</span>
          <motion.span
            variants={drawLine}
            className="h-px flex-1 origin-left bg-gradient-to-r from-black/15 to-transparent"
          />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#2b6bff]">Projects</span>
        </div>

        <motion.h2
          variants={rise}
          className="mt-8 font-serif text-4xl leading-[1.1] text-[#0B0D12] sm:text-5xl"
        >
          Projects
        </motion.h2>
        <motion.p variants={rise} className="mt-4 max-w-xl text-sm leading-relaxed text-[#5A6069]">
          A mix of data science, front-end and full-stack work — from trained models to deployed
          tools. Filter by discipline to narrow it down.
        </motion.p>

        {/* ---------- filters ---------- */}
        <motion.div
          variants={rise}
          className="mt-10 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-300 ${
                    on
                      ? 'border-[#2b6bff] bg-[#2b6bff] text-white shadow-[0_10px_24px_-12px_rgba(43,107,255,0.9)]'
                      : 'border-black/[0.08] bg-white/70 text-[#5A6069] hover:border-[#2b6bff]/30 hover:text-[#0B0D12]'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>
          <span className="font-mono text-[11px] text-[#9AA1AB]">
            {String(shown.length).padStart(2, '0')} {shown.length === 1 ? 'project' : 'projects'}
          </span>
        </motion.div>

        {/* ---------- grid ---------- */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={project._i}
                reduce={reduce}
                ease={ease}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ProjectsSection