import { useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { music } from '../../config/wedding'

// Tidak autoplay: musik hanya menyala setelah tamu menekan tombol.
export default function MusicToggle() {
  const audio = useRef(null)
  const [on, setOn] = useState(false)
  if (!music.src) return null
  const toggle = async () => {
    const el = audio.current
    if (!el) return
    try {
      if (on) { el.pause(); setOn(false) } else { await el.play(); setOn(true) }
    } catch { setOn(false) }
  }
  return (
    <>
      <audio ref={audio} src={music.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? 'Jeda musik latar' : 'Putar musik latar'}
        className="fixed bottom-4 right-4 z-[55] grid size-12 place-items-center bg-wine text-paper"
      >
        {on ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
      </button>
    </>
  )
}
