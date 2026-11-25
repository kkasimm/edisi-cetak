import { CalendarPlus, MapPin, Download } from 'lucide-react'
import { couple, events } from '../config/wedding'
import { formatDate, formatTime } from '../lib/guest'
import { downloadIcs, googleCalendarUrl, mapsUrl } from '../lib/calendar'
import Button from '../components/ui/Button'
import LineReveal from '../components/ui/LineReveal'
import Section from '../components/ui/Section'

export default function Details() {
  const title = `${couple.first.name} & ${couple.second.name}`
  const d = events[0].start
  return (
    <div className="bg-blush/60">
      <Section id="acara" aria-labelledby="acara-judul">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <LineReveal className="font-display text-[clamp(3.25rem,13vw,8rem)] leading-[0.88] text-wine">
              <span id="acara-judul" className="sr-only">Acara</span>
              <span aria-hidden="true">{formatDate(d, { weekday: 'long' })},</span><br />
              <span aria-hidden="true">{formatDate(d, { day: 'numeric', month: 'long' })}</span><br />
              <span aria-hidden="true">{formatDate(d, { year: 'numeric' })}</span>
            </LineReveal>
          </div>

          <div className="space-y-14 md:col-span-7">
            {events.map((ev) => (
              <article key={ev.id} className="border-t-4 border-wine pt-6">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl text-wine md:text-4xl">{ev.title}</h3>
                  <p className="font-display text-5xl leading-none text-wine md:text-7xl">
                    {formatTime(ev.start)}<span className="ml-2 font-text text-base italic">WIB</span>
                  </p>
                </div>
                <p className="mt-5 font-display text-xl">{ev.venue}</p>
                <p className="italic">{ev.address}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button as="a" variant="ghost" href={mapsUrl(ev)} target="_blank" rel="noopener noreferrer">
                    <MapPin size={18} aria-hidden="true" />Buka peta
                  </Button>
                  <Button as="a" variant="solid" href={googleCalendarUrl(ev, title)} target="_blank" rel="noopener noreferrer">
                    <CalendarPlus size={18} aria-hidden="true" />Simpan ke kalender
                  </Button>
                </div>
              </article>
            ))}
            <Button variant="stamp" onClick={() => downloadIcs(events, title)}>
              <Download size={18} aria-hidden="true" />Unduh semua acara (.ics)
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
