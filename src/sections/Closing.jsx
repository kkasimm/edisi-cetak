import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { couple, edition, events } from '../config/wedding'
import { formatDate } from '../lib/guest'
import { ease } from '../lib/motion'
import Button from '../components/ui/Button'

export default function Closing() {
  const reduce = useReducedMotion()
  return (
    <footer className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-between px-5 pb-10 pt-24 md:px-12">
      {/* Tinta basah (rose) perlahan mengering menjadi wine */}
      <motion.h2
        className="font-display text-[clamp(3rem,13vw,9.5rem)] leading-[0.9]"
        initial={reduce ? false : { color: '#CF4560' }}
        whileInView={{ color: '#6B1E2E' }}
        viewport={{ once: true, margin: '0px 0px -25% 0px' }}
        transition={{ duration: 3, ease: ease.ink }}
      >
        Sampai bertemu<br />di halaman<br />berikutnya.
      </motion.h2>

      <div className="mt-20 flex flex-col gap-8 border-t border-wine/30 pt-6 md:flex-row md:items-end md:justify-between">
        <p className="max-w-[44ch] italic">
          Terima kasih telah menjadi bagian dari halaman ini. {edition.tagline} ini dicetak di Surabaya
          untuk {formatDate(events[0].start, { day: 'numeric', month: 'long', year: 'numeric' })}.
        </p>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="font-display text-2xl text-wine">{couple.first.name} &amp; {couple.second.name} {couple.hashtag}</p>
          <Button variant="ghost" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}>
            <ArrowUp size={18} aria-hidden="true" />Kembali ke sampul
          </Button>
        </div>
      </div>
    </footer>
  )
}
