import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { gallery } from '../config/wedding'
import { ease } from '../lib/motion'
import LineReveal from '../components/ui/LineReveal'
import Photo from '../components/ui/Photo'

function Lightbox({ index, onClose, onIndex }) {
  const closeRef = useRef(null)
  const root = useRef(null)
  const n = gallery.length
  const go = useCallback((d) => onIndex((index + d + n) % n), [index, n, onIndex])

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev; opener?.focus?.() }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const f = root.current.querySelectorAll('button')
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  const item = gallery[index]
  return (
    <motion.div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Penampil foto"
      className="fixed inset-0 z-[45] flex flex-col bg-paper"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.7, ease: ease.press }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-12">
        <p className="font-text italic text-wine">{index + 1} dari {n}</p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Tutup" className="grid size-12 place-items-center bg-wine text-paper">
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <motion.div
        className="grid min-h-0 flex-1 place-items-center px-5"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(_, i) => { if (i.offset.x < -80) go(1); else if (i.offset.x > 80) go(-1) }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: ease.lift }}
          >
            <Photo src={item.src} alt={item.alt} seed={index} ratio={item.ratio} tone="color" className="h-[min(68svh,700px)] max-w-[90vw]" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-12">
        <button type="button" onClick={() => go(-1)} aria-label="Foto sebelumnya" className="grid size-12 place-items-center border-2 border-wine text-wine">
          <ChevronLeft aria-hidden="true" />
        </button>
        <p className="text-center italic">{item.alt}</p>
        <button type="button" onClick={() => go(1)} aria-label="Foto berikutnya" className="grid size-12 place-items-center border-2 border-wine text-wine">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const strip = useRef(null)
  const [open, setOpen] = useState(null)
  const scrollBy = (d) => strip.current?.scrollBy({ left: d * strip.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section id="galeri" aria-labelledby="galeri-judul" className="py-20 md:py-32">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-5 md:px-12">
        <LineReveal className="font-display text-[length:var(--text-title)] text-wine">
          <span id="galeri-judul">Lembar kenangan</span>
        </LineReveal>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Geser ke kiri" className="grid size-11 place-items-center border-2 border-wine text-wine"><ChevronLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Geser ke kanan" className="grid size-11 place-items-center border-2 border-wine text-wine"><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>

      <ul
        ref={strip}
        className="hide-scrollbar mt-10 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-5 pb-8 md:gap-8 md:px-12"
      >
        {gallery.map((g, i) => (
          <li
            key={g.id}
            className={`flex-none snap-center ${i % 2 ? 'mt-10 md:mt-16' : ''}`}
            style={{ height: 'min(58svh, 520px)', aspectRatio: g.ratio }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Perbesar foto: ${g.alt}`}
              className={`group block h-full w-full ${i % 3 === 0 ? '-rotate-1' : i % 3 === 1 ? 'rotate-1' : ''}`}
            >
              <Photo src={g.src} alt="" seed={i} ratio={null} className="h-full w-full" colorOnHover />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
