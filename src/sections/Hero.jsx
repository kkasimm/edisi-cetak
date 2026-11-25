import { motion, useReducedMotion } from 'framer-motion'
import { couple, edition, events, gallery } from '../config/wedding'
import { formatDate } from '../lib/guest'
import { ease } from '../lib/motion'
import Photo from '../components/ui/Photo'
import Stamp from '../components/ui/Stamp'

const names = 'text-[clamp(5.5rem,27vw,18rem)] leading-[0.8]'

function Line({ children, active, i, align = '' }) {
  const reduce = useReducedMotion()
  return (
    <span className={`-mt-[0.12em] block overflow-hidden pb-[0.08em] pt-[0.12em] ${align}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: '108%' }}
        animate={{ y: active ? 0 : '108%' }}
        transition={{ duration: 1.25, ease: ease.settle, delay: active ? 0.55 + i * 0.16 : 0 }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero({ active, guest }) {
  const reduce = useReducedMotion()
  const date = formatDate(events[0].start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <header id="sampul" className="relative min-h-[100svh] overflow-hidden px-5 pb-14 pt-6 md:px-12">
      <div className="flex items-baseline justify-between border-b border-wine/30 pb-3 font-text italic text-wine">
        <span>{edition.tagline}</span>
        <span>{edition.number}</span>
      </div>

      <h1 className={`relative z-10 mt-10 font-display text-wine mix-blend-multiply ${names}`}>
        <span className="sr-only">{couple.first.full} dan {couple.second.full}</span>
        <span aria-hidden="true" className="block">
          <Line active={active} i={0}>{couple.first.name}</Line>
          <Line active={active} i={1} align="text-right">{couple.second.name}</Line>
        </span>
      </h1>

      <motion.div
        className="relative -mt-[16vw] ml-auto w-[70%] max-w-[560px] md:-mt-[7vw]"
        initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: active ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
        transition={{ duration: 1.5, ease: ease.ink, delay: active ? 0.9 : 0 }}
      >
        <Photo src={gallery[0].src} alt={gallery[0].alt} seed={0} ratio={4 / 5} />
      </motion.div>
      <Stamp className="absolute left-[8%] top-[calc(36vw+9rem)] z-20 w-28 -rotate-12 text-rose md:left-[14%] md:w-40" />

      <div className="relative z-10 mt-14 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl leading-tight text-wine md:text-4xl">{date}</p>
          <p className="mt-1 font-text italic">{events[0].venue}, Surabaya</p>
        </div>
        <p className="font-text italic leading-tight">
          Kepada Yth.<br />
          <span className="font-display text-2xl not-italic text-wine">{guest || 'Tamu undangan'}</span>
        </p>
      </div>

      <a href="#cerita" className="mt-12 flex w-fit items-center gap-3 font-text italic text-wine">
        <motion.span
          aria-hidden="true"
          className="block h-10 w-px origin-top bg-wine"
          animate={reduce ? undefined : { scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, ease: ease.ink, repeat: Infinity }}
        />
        Gulir untuk membaca
      </a>
    </header>
  )
}
