import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus, Send } from 'lucide-react'
import { db } from '../lib/data'
import { ease } from '../lib/motion'
import Button from '../components/ui/Button'
import LineReveal from '../components/ui/LineReveal'
import Section from '../components/ui/Section'
import Stamp from '../components/ui/Stamp'

export default function Rsvp({ guest }) {
  const reduce = useReducedMotion()
  const [f, setF] = useState({ name: guest, attending: null, guests: 1, message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    if (f.website) { setStatus('done'); return }
    const errs = {}
    if (!f.name.trim()) errs.name = 'Tulis nama Anda.'
    if (f.attending === null) errs.attending = 'Pilih salah satu jawaban.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      await db.addRsvp({
        name: f.name.trim(),
        attending: f.attending,
        guests: f.attending ? f.guests : 1,
        message: f.message.trim() || null,
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="rsvp" aria-labelledby="rsvp-judul">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <LineReveal className="font-display text-[length:var(--text-title)] text-wine">
            <span id="rsvp-judul">Konfirmasi kehadiran</span>
          </LineReveal>
          <p className="mt-4">Mohon beri tahu kami sebelum hari acara agar tempat Anda bisa disiapkan.</p>
        </div>

        <div className="md:col-span-7">
          {status === 'done' ? (
            <div role="status" className="relative border-t-4 border-wine pt-8">
              <h3 className="font-display text-3xl text-wine">Terima kasih, {f.name.trim() || 'sahabat'}.</h3>
              <p className="mt-3">
                {f.attending ? `Kami mencatat Anda hadir bersama ${f.guests} orang.` : 'Kami mencatat Anda tidak dapat hadir. Doa Anda tetap sampai.'}
              </p>
              <motion.div
                initial={reduce ? false : { scale: 1.8, opacity: 0, rotate: -24 }}
                animate={{ scale: 1, opacity: 1, rotate: -9 }}
                transition={{ duration: 0.5, ease: ease.press }}
                className="mt-8 w-40 text-rose"
              >
                <Stamp ring="Terkonfirmasi — Terkonfirmasi — " center="OK" bottom="tercatat" />
              </motion.div>
              <Button variant="ghost" className="mt-8" onClick={() => setStatus('idle')}>Ubah jawaban</Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-9 border-t-4 border-wine pt-8">
              <div className="hidden" aria-hidden="true">
                <label>Situs web<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} /></label>
              </div>

              <div>
                <label htmlFor="rsvp-nama" className="font-display text-xl text-wine">Nama lengkap</label>
                <input
                  id="rsvp-nama" className="field" autoComplete="name" maxLength={80}
                  value={f.name} onChange={(e) => set('name', e.target.value)}
                  aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'err-nama' : undefined}
                />
                {errors.name && <p id="err-nama" role="alert" className="mt-2 text-rose">{errors.name}</p>}
              </div>

              <fieldset>
                <legend className="font-display text-xl text-wine">Apakah Anda hadir?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[[true, 'Saya hadir'], [false, 'Maaf, tidak bisa hadir']].map(([val, label]) => (
                    <button
                      key={String(val)} type="button" aria-pressed={f.attending === val}
                      onClick={() => set('attending', val)}
                      className={`min-h-14 border-2 border-wine px-4 py-3 text-left font-display text-lg transition-colors duration-300 ${f.attending === val ? 'bg-wine text-paper' : 'text-wine'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {errors.attending && <p role="alert" className="mt-2 text-rose">{errors.attending}</p>}
              </fieldset>

              {f.attending && (
                <div>
                  <p className="font-display text-xl text-wine" id="jumlah-label">Jumlah tamu</p>
                  <div className="mt-3 flex items-center gap-5" role="group" aria-labelledby="jumlah-label">
                    <button type="button" aria-label="Kurangi" onClick={() => set('guests', Math.max(1, f.guests - 1))} className="grid size-12 place-items-center border-2 border-wine text-wine"><Minus size={18} aria-hidden="true" /></button>
                    <output aria-live="polite" className="w-10 text-center font-display text-4xl text-wine">{f.guests}</output>
                    <button type="button" aria-label="Tambah" onClick={() => set('guests', Math.min(8, f.guests + 1))} className="grid size-12 place-items-center border-2 border-wine text-wine"><Plus size={18} aria-hidden="true" /></button>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="rsvp-pesan" className="font-display text-xl text-wine">Pesan untuk kami (opsional)</label>
                <textarea id="rsvp-pesan" className="field" maxLength={500} value={f.message} onChange={(e) => set('message', e.target.value)} />
              </div>

              {status === 'error' && <p role="alert" className="text-rose">Belum terkirim. Periksa koneksi Anda, lalu coba lagi.</p>}
              <Button type="submit" variant="stamp" disabled={status === 'sending'}>
                <Send size={18} aria-hidden="true" />{status === 'sending' ? 'Mengirim…' : 'Kirim konfirmasi'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
