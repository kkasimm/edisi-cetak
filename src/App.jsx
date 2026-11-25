import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { getGuestName } from './lib/guest'
import ProgressBar from './components/ui/ProgressBar'
import MusicToggle from './components/ui/MusicToggle'
import Opening from './sections/Opening'
import Hero from './sections/Hero'
import Story from './sections/Story'
import Details from './sections/Details'
import Countdown from './sections/Countdown'
import Gallery from './sections/Gallery'
import Rsvp from './sections/Rsvp'
import Guestbook from './sections/Guestbook'
import Closing from './sections/Closing'

const guest = getGuestName()

export default function App() {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Kunci scroll selama opening.
  useEffect(() => {
    document.documentElement.style.overflow = opened ? '' : 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [opened])

  return (
    <>
      <ProgressBar />
      <main inert={!opened}>
        <Hero active={opened} guest={guest} />
        <Story />
        <Details />
        <Countdown />
        <Gallery />
        <Rsvp guest={guest} />
        <Guestbook guest={guest} />
        <Closing />
      </main>
      <AnimatePresence>
        {!opened && <Opening key="opening" guest={guest} onOpen={() => setOpened(true)} />}
      </AnimatePresence>
      <MusicToggle />
    </>
  )
}
