// Memakai REST API Supabase lewat fetch, tanpa library tambahan.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
}

async function request(path, options = {}) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  })
  if (!res.ok) throw new Error(`Supabase ${res.status}`)
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export const supabaseAdapter = {
  mode: 'supabase',

  // RSVP tidak bisa dibaca publik, jadi tidak meminta baris kembali.
  async addRsvp(entry) {
    await request('rsvps', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(entry),
    })
    return entry
  },

  listGuestbook() {
    return request('guestbook?select=*&order=created_at.desc&limit=100')
  },

  async addGuestbook(entry) {
    const [row] = await request('guestbook', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(entry),
    })
    return row
  },
}