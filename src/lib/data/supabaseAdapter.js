// Memakai REST API Supabase lewat fetch, tanpa library tambahan.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

async function request(path, options) {
  const res = await fetch(`${url}/rest/v1/${path}`, { ...options, headers: { ...headers, ...options?.headers } })
  if (!res.ok) throw new Error(`Supabase ${res.status}`)
  return res.status === 204 ? null : res.json()
}

export const supabaseAdapter = {
  mode: 'supabase',
  async addRsvp(entry) {
    const [row] = await request('rsvps', { method: 'POST', body: JSON.stringify(entry) })
    return row
  },
  listGuestbook() {
    return request('guestbook?select=*&order=created_at.desc&limit=100')
  },
  async addGuestbook(entry) {
    const [row] = await request('guestbook', { method: 'POST', body: JSON.stringify(entry) })
    return row
  },
}
