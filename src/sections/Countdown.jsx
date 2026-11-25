import { AnimatePresence, motion } from 'framer-motion'
import { events } from '../config/wedding'
import { useCountdown } from '../hooks/useCountdown'
import { ease } from '../lib/motion'

function Digit({ value }) {
  return (
    <span className="relative inline-block h-[1.05em] w-[0.58em] overflow-hidden align-bottom tabular-nums">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: ease.press }}
          className="absolute inset-0 block text-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Rolling({ n, pad }) {
  const s = String(n).padStart(pad, '0')
  return (
    <span aria-hidden="true" className="inline-flex">
      {[...s].map((d, i) => <Digit key={s.length - i} value={d} />)}
    </span>
  )
}

export default function Countdown() {
  const t = useCountdown(events[0].start)
  return (
    <section aria-labelledby="hitung-judul" className="overflow-hidden bg-wine text-paper">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-12 md:py-36">
        <h2 id="hitung-judul" className="font-text text-[length:var(--text-body)] font-normal italic text-blush">
          Hitung mundur menuju hari bahagia
        </h2>
        {t.done ? (
          <p className="mt-6 font-display text-[clamp(3rem,12vw,9rem)] leading-[0.9]">Hari ini adalah harinya.</p>
        ) : (
          <>
            <p className="sr-only">
              {t.days} hari, {t.hours} jam, {t.minutes} menit lagi.
            </p>
            <div className="mt-4 flex items-end gap-4 font-display text-[clamp(7rem,34vw,24rem)] leading-[0.82]">
              <Rolling n={t.days} pad={3} />
              <span className="mb-[0.12em] font-text text-[length:var(--text-title)] italic text-blush">hari</span>
            </div>
            <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4 font-display text-[clamp(2.5rem,9vw,5.5rem)] leading-none">
              {[
                ['jam', t.hours],
                ['menit', t.minutes],
                ['detik', t.seconds],
              ].map(([label, v]) => (
                <span key={label} className="flex items-end gap-2">
                  <Rolling n={v} pad={2} />
                  <span className="mb-[0.15em] font-text text-lg italic text-blush">{label}</span>
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
