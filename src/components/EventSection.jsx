import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Award, CalendarDays, MapPin, Sparkles } from 'lucide-react'

/* Add event entries here. Store the certificate as a shareable Google Drive URL. */
const EVENTS = [
  // {
  //   title: 'Event name',
  //   type: 'Hackathon',
  //   organizer: 'Organizer name',
  //   date: 'Month YYYY',
  //   location: 'City or online',
  //   description: 'A short note about the event.',
  //   logo: 'https://example.com/event-logo.png',
  //   certificateUrl: 'https://drive.google.com/...',
  // },

  {
    title: 'HackToBerFest 2026',
    type: 'Hackathon',
    organizer: 'KrowdKraft',
    date: 'Oct 2026',
    location: 'The Startup Park-Bangalore',
    description: 'My First Hackathon Experience, where I learned the basics of hackathons and how to work in a team to build a project from scratch.',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy2betC6XYPHLLM1A_wknI8c3cH2gjZrZxnp_aCrW2RQ&s',
    certificateUrl: 'https://drive.google.com/file/d/1hZFzahW7--X-CQ1PkIk4mADpEk5T5LZ6/view?usp=sharing',
  }, 

  {
    title: 'Internal Hackathon for SIH 2026',
    type: 'Ideathon',
    organizer: 'CAIAS',
    date: 'Aug 2026',
    location: 'Christ Academy Institute for Advanced Studies-Bengaluru',
    description: 'Participated in the Internal Hackathon for SIH 2026 as part of Team Code Crackers from II BCA, organized by the Department of Computer Science and Applications at CAIAS.',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR45YUctBxyg5lb3fLu2a2-ZIZYZRyfskYdJnamtrphhg&s=10',
    certificateUrl: 'https://drive.google.com/file/d/1-E6OMV490fPmXb5a5TVUqPeGHQMP_Kmp/view?usp=sharing',
},
]

function EventCard({ event, index, reduce, ease }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.65, ease } },
      }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1018]/80 transition-colors duration-300 hover:border-[#2b6bff]/35"
    >
      <div className="relative flex h-32 items-end justify-between overflow-hidden border-b border-white/[0.08] bg-[#101521] p-4 sm:h-36 sm:p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse at 82% 100%, rgba(43,107,255,0.27), transparent 54%), radial-gradient(circle at 12% 0%, rgba(109,94,248,0.16), transparent 46%)',
          }}
        />
        <span className="pointer-events-none absolute right-4 top-3 font-mono text-[10px] tracking-[0.2em] text-white/30 sm:right-5 sm:top-4">
          EVENT / {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-[#dbe4f0] shadow-[0_14px_35px_-18px_rgba(43,107,255,0.75)] sm:h-16 sm:w-16">
          {event.logo ? (
            <img
              src={event.logo}
              alt={`${event.organizer || event.title} logo`}
              className="h-full w-full object-contain p-1.5 mix-blend-multiply"
              loading="lazy"
            />
          ) : (
            <Sparkles aria-hidden="true" size={24} className="text-[#527be0]" />
          )}
        </div>
        <div className="relative z-10 ml-4 min-w-0 text-right">
          <span className="block text-[9px] uppercase tracking-[0.24em] text-white/40 sm:text-[10px]">
            Participation
          </span>
          <span className="mt-1 block truncate font-mono text-sm uppercase tracking-[0.12em] text-[#a9c0ff] sm:text-base sm:tracking-[0.18em]">
            {event.type}
          </span>
          <span className="ml-auto mt-2 block h-px w-12 bg-gradient-to-l from-[#5b88ff]/70 to-transparent sm:w-16" />
        </div>
      </div>

      <div className="relative p-4 sm:p-7">
        <div className="flex flex-col items-start gap-2 text-[10px] uppercase tracking-[0.13em] text-white/45 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 sm:text-[11px] sm:tracking-[0.15em]">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <CalendarDays size={13} className="shrink-0 text-[#6f96ff]" />
            {event.date}
          </span>
          {event.location && (
            <span className="inline-flex min-w-0 items-start gap-1.5">
              <MapPin size={13} className="mt-0.5 shrink-0 text-[#6f96ff]" />
              {event.location}
            </span>
          )}
        </div>
        <h3 className="mt-4 break-words font-serif text-xl leading-tight text-white/90 sm:text-[1.7rem]">
          {event.title}
        </h3>
        {event.organizer && (
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
            {event.organizer}
          </p>
        )}
        {event.description && (
          <p className="mt-4 text-sm leading-relaxed text-white/55">{event.description}</p>
        )}

        <div className="mt-6 border-t border-dashed border-white/10 pt-5">
          {event.certificateUrl ? (
            <a
              href={event.certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-[#8eaeff] transition-colors hover:text-white"
            >
              <Award size={16} />
              View certificate
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs text-white/35">
              <Award size={15} />
              Certificate link coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

const EventSection = () => {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1]
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  }
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.65, ease } },
  }
  const drawLine = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: reduce ? 0 : 1, ease } },
  }

  return (
    <section
      id="events"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#08090D] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(48% 52% at 8% 38%, rgba(43,107,255,0.14), transparent 72%), radial-gradient(38% 45% at 94% 84%, rgba(109,94,248,0.12), transparent 70%)',
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -left-8 top-0 select-none font-serif text-[34vw] leading-[0.8] text-white/[0.025] sm:left-2 sm:text-[12vw]">
        06
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#3b74ff]">06</span>
          <motion.span
            variants={drawLine}
            className="h-px flex-1 origin-left bg-gradient-to-r from-white/20 to-transparent"
          />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#3b74ff]">Events</span>
        </div>

        <div className="mt-8 grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <motion.h2
              variants={rise}
              className="max-w-2xl font-serif text-3xl leading-[1.08] text-white/90 sm:text-5xl lg:text-6xl"
            >
              Big ideas.
              <br className="hidden sm:block" />
              <span className="text-white/45">Real-world energy.</span>
            </motion.h2>
            <motion.p variants={rise} className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:mt-5 sm:text-base">
              Hackathons, ideathons and the rooms where ideas turn into action — with certificates to show for it.
            </motion.p>
          </div>
          <motion.div
            variants={rise}
            className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-white/45 md:inline-flex"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2b6bff]/15 text-[#83a4ff]">
              <Sparkles size={14} />
            </span>
            {String(EVENTS.length).padStart(2, '0')} moments logged
          </motion.div>
        </div>

        {EVENTS.length > 0 ? (
          <motion.div
            variants={container}
            className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3"
          >
            {EVENTS.map((event, index) => (
              <EventCard
                key={`${event.title}-${event.date}-${index}`}
                event={event}
                index={index}
                reduce={reduce}
                ease={ease}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={rise}
            className="glass-edge relative mt-14 overflow-hidden rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.025] p-7 sm:p-10 lg:mt-16"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-[#2b6bff]/10 blur-3xl"
            />
            <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#2b6bff]/25 bg-[#2b6bff]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#8eaeff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5a8cff]" />
                  Archive ready
                </span>
                <h3 className="mt-5 font-serif text-2xl text-white/85 sm:text-3xl">
                  The next big idea starts here.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  Add your hackathons, ideathons and other events to the EVENTS list in this component. Each entry can include a logo and a Google Drive certificate link.
                </p>
              </div>
              <div className="relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center sm:mr-5">
                <span className="absolute inset-0 rounded-full border border-white/10" />
                <span className="absolute inset-3 rounded-full border border-dashed border-[#2b6bff]/35" />
                <span className="absolute h-20 w-20 rounded-full bg-[#2b6bff]/15 blur-xl" />
                <Sparkles size={30} className="relative text-[#8eaeff]" />
                <span className="absolute right-3 top-5 h-2 w-2 rounded-full bg-[#8eaeff] shadow-[0_0_14px_4px_rgba(43,107,255,0.65)]" />
                <span className="absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full bg-white/65" />
              </div>
            </div>
          </motion.div>
        )}

        {EVENTS.length > 0 && (
          <motion.div variants={rise} className="mt-8 text-right text-[10px] uppercase tracking-[0.2em] text-white/30">
            {EVENTS.length} {EVENTS.length === 1 ? 'event' : 'events'} documented
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default EventSection
