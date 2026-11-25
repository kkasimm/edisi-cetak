// Nama tamu dari tautan: https://situs-anda.com/?to=Budi%20Santoso
export function getGuestName() {
  try {
    const n = new URLSearchParams(window.location.search).get('to')
    return n ? n.trim().slice(0, 60) : ''
  } catch {
    return ''
  }
}

export const formatDate = (iso, opts) =>
  new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', ...opts }).format(new Date(iso))

export const formatTime = (iso) =>
  formatDate(iso, { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', '.')
