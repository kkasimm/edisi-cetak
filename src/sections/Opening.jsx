import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { couple, edition, events } from '../config/wedding'
import { formatDate } from '../lib/guest'
import { ease } from '../lib/motion'

const ROLLER = 64
const names = 'text-[clamp(5.5rem,27vw,18rem)] leading-[0.8]'

// Satu tata letak, dua lapisan: kerangka garis (belum tercetak) dan tinta penuh (tercetak).
function Cover({ solid, guest }) {
  const ink = solid
    ? { color: '#6B1E2E' }
    : { color: 'transparent', WebkitTextStroke: '1px rgba(107,30,46,0.3)' }
  const date = formatDate(events[0].start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <div
      aria-hidden={!solid}
      className="absolute inset-0 flex flex-col justify-between px-5 pb-8 md:px-12 md:pb-12"
      style={{ paddingTop: ROLLER + 20 }}
    >
      <div className="flex items-baseline justify-between font-text italic text-wine">
        <span>{edition.tagline}</span>
        <span>{edition.number}</span>
      </div>
      <div className={`font-display ${names}`} style={ink}>
        <span className="block">{couple.first.name}</span>
        <span className="block text-right">{couple.second.name}</span>
      </div>
      <div className="flex items-end justify-between gap-6 text-wine">
        <p className="font-text italic leading-tight">
          Kepada Yth.<br />
          <span className="font-display text-2xl not-italic">{guest || 'Tamu undangan'}</span>
        </p>
        <p className="max-w-[10ch] text-right font-display text-xl leading-tight md:max-w-none">{date}</p>
      </div>
    </div>
  )
}

export default function Opening({ guest, onOpen }) {
  const reduce = useReducedMotion()
  const box = useRef(null)
  const busy = useRef(false)
  const nudge = useRef(null)
  const [h, setH] = useState(0)
  const y = useMotionValue(0)
  const hMV = useMotionValue(0)

  useEffect(() => {
    const el = box.current
    const measure = () => { setH(el.offsetHeight); hMV.set(el.offsetHeight) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [hMV])

  // Isyarat awal: roller bergerak sedikit, berhenti begitu tamu menyentuhnya.
  useEffect(() => {
    if (reduce) return
    nudge.current = animate(y, [0, 16, 0], { duration: 1.5, ease: ease.ink, repeat: Infinity, repeatDelay: 1.6 })
    return () => nudge.current?.stop()
  }, [reduce, y])

  const max = Math.max(0, h - ROLLER)
  const clip = useTransform([y, hMV], ([v, hh]) => `inset(0px 0px ${Math.max(0, hh - v - ROLLER / 2)}px 0px)`)
  const hint = useTransform(y, [0, 90], [1, 0])

  const complete = async (duration) => {
    if (busy.current) return
    busy.current = true
    nudge.current?.stop()
    await animate(y, max, { duration: reduce ? 0.01 : duration, ease: ease.press })
    await new Promise((r) => setTimeout(r, reduce ? 150 : 1000))
    onOpen()
  }

  const release = () => {
    if (busy.current) return
    if (y.get() > max * 0.55) complete(0.6)
    else animate(y, 0, { duration: 0.9, ease: ease.settle })
  }

  return (
    <motion.div
      ref={box}
      role="dialog"
      aria-label="Pembuka undangan"
      className="fixed inset-0 z-40 overflow-hidden bg-paper"
      exit={{ y: '-100%' }}
      transition={{ duration: 1.25, ease: ease.settle }}
    >
      {/* tanda registrasi cetak */}
      {['left-4 top-4', 'right-4 top-4', 'left-4 bottom-4', 'right-4 bottom-4'].map((p) => (
        <span key={p} aria-hidden="true" className={`absolute ${p} size-3 border-wine/40 [border-width:0_0_1px_1px]`} />
      ))}

      <Cover guest={guest} />
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Cover solid guest={guest} />
      </motion.div>

      <button
        type="button"
        onClick={() => complete(1.8)}
        className="absolute bottom-[8.5rem] left-5 z-20 min-h-11 font-text italic text-wine underline underline-offset-4 md:left-12"
      >
        Ketuk untuk mencetak
      </button>

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: max }}
        dragElastic={0}
        dragMomentum={false}
        onPointerDown={() => nudge.current?.stop()}
        onDragEnd={release}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); complete(1.8) } }}
        role="button"
        tabIndex={0}
        aria-label="Roller cetak. Seret ke bawah, atau tekan Enter, untuk mencetak undangan."
        style={{ y, height: ROLLER }}
        className="absolute inset-x-0 top-0 z-10 cursor-grab shadow-[0_20px_30px_-14px_rgba(107,30,46,0.5)] active:cursor-grabbing"
      >
        <div
          className="absolute inset-0 bg-wine"
          style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,.24), rgba(255,255,255,0) 38%, rgba(0,0,0,.3))' }}
        />
        <motion.span style={{ opacity: hint }} className="relative grid h-full place-items-center font-text italic text-paper">
          Seret ke bawah untuk mencetak
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
