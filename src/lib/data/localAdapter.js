import { guestbookSeed } from '../../config/wedding'

const KEYS = { rsvps: 'ec:rsvps', guestbook: 'ec:guestbook' }

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage penuh atau diblokir */ }
}
const stamp = (entry) => ({
  id: crypto.randomUUID?.() ?? String(Date.now()),
  created_at: new Date().toISOString(),
  ...entry,
})

export const localAdapter = {
  mode: 'local',
  async addRsvp(entry) {
    const row = stamp(entry)
    write(KEYS.rsvps, [...read(KEYS.rsvps, []), row])
    return row
  },
  async listGuestbook() {
    return [...read(KEYS.guestbook, guestbookSeed)].sort((a, b) => b.created_at.localeCompare(a.created_at))
  },
  async addGuestbook(entry) {
    const row = stamp(entry)
    write(KEYS.guestbook, [row, ...read(KEYS.guestbook, guestbookSeed)])
    return row
  },
}
