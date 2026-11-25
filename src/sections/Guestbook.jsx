import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { db } from '../lib/data'
import { formatDate } from '../lib/guest'
import { ease } from '../lib/motion'
import Button from '../components/ui/Button'
import LineReveal from '../components/ui/LineReveal'

export default function Guestbook({ guest }) {
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [name, setName] = useState(guest)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    db.listGuestbook()
      .then((rows) => alive && setItems(rows))
      .catch(() => alive && setLoadError(true))
      .finally(() => alive && setLoaded(true))
    return () => { alive = false }
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) { setError('Isi nama dan ucapan Anda.'); return }
    setError('')
    setStatus('sending')
    try {
      const row = await db.addGuestbook({ name: name.trim(), message: message.trim() })
      setItems((p) => [row, ...p])
      setMessage('')
      setStatus('idle')
    } catch {
      setStatus('idle')
      setError('Ucapan belum terkirim. Coba lagi sebentar lagi.')
    }
  }

  return (
    <div className="bg-blush/60">
      <section id="ucapan" aria-labelledby="ucapan-judul" className="mx-auto w-full max-w-6xl px-5 py-20 md:px-12 md:py-32">
        <LineReveal className="font-display text-[length:var(--text-title)] text-wine">
          <span id="ucapan-judul">Surat pembaca</span>
        </LineReveal>
        <p className="mt-4">Tinggalkan doa dan ucapan Anda di halaman ini.</p>

        <form onSubmit={submit} noValidate className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <label htmlFor="gb-nama" className="font-display text-xl text-wine">Nama</label>
            <input id="gb-nama" className="field" maxLength={80} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="md:col-span-8">
            <label htmlFor="gb-pesan" className="font-display text-xl text-wine">Ucapan</label>
            <textarea id="gb-pesan" className="field" maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="md:col-span-12">
            {error && <p role="alert" className="mb-4 text-rose">{error}</p>}
            <Button type="submit" variant="solid" disabled={status === 'sending'}>
              <Send size={18} aria-hidden="true" />{status === 'sending' ? 'Mengirim…' : 'Kirim ucapan'}
            </Button>
          </div>
        </form>

        <div className="mt-16 border-t-4 border-wine pt-10" aria-live="polite">
          {loadError && <p>Ucapan belum bisa dimuat. Muat ulang halaman untuk mencoba lagi.</p>}
          {loaded && !loadError && items.length === 0 && <p>Belum ada ucapan. Jadilah yang pertama menulis.</p>}
          <ul className="gap-12 md:columns-2">
            <AnimatePresence initial={false}>
              {items.map((it) => (
                <motion.li
                  key={it.id}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: ease.settle }}
                  className="mb-10 break-inside-avoid border-t border-wine/30 pt-4"
                >
                  <p className="font-display text-xl italic leading-snug text-wine">“{it.message}”</p>
                  <p className="mt-3 font-text">
                    {it.name}
                    <span className="ml-2 italic text-cocoa/70">
                      {formatDate(it.created_at, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </section>
    </div>
  )
}
