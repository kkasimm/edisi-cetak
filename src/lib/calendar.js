const fmt = (iso) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, '')

export function googleCalendarUrl(ev, coupleTitle) {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${ev.title} ${coupleTitle}`,
    dates: `${fmt(ev.start)}/${fmt(ev.end)}`,
    location: `${ev.venue}, ${ev.address}`,
  })
  return `https://calendar.google.com/calendar/render?${p}`
}

export function mapsUrl(ev) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapsQuery)}`
}

export function downloadIcs(events, coupleTitle) {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Edisi Cetak//ID',
    ...events.flatMap((ev) => [
      'BEGIN:VEVENT',
      `UID:${ev.id}@edisi-cetak`,
      `DTSTAMP:${fmt(new Date().toISOString())}`,
      `DTSTART:${fmt(ev.start)}`,
      `DTEND:${fmt(ev.end)}`,
      `SUMMARY:${ev.title} ${coupleTitle}`,
      `LOCATION:${ev.venue}\\, ${ev.address}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([lines], { type: 'text/calendar' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: 'undangan.ics' })
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
