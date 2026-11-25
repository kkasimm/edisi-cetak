// Foto placeholder: adegan SVG dengan kontras tinggi (dua siluet di depan matahari
// pada seed genap), supaya perlakuan duotone terlihat matang walau belum ada foto asli.
const palettes = [
  ['#F6DCC4', '#D9805F', '#3E1020'],
  ['#F2D2B4', '#C96B55', '#4A1424'],
  ['#F5D6CB', '#C25872', '#3A0F1E'],
  ['#EFD8B8', '#B9744F', '#44190F'],
]

export function placeholderSrc(seed = 0, w = 600, h = 800) {
  const [a, b, c] = palettes[Math.abs(seed) % palettes.length]
  const couple = seed % 2 === 0
  const sx = couple ? 0.5 : 0.25 + ((seed * 37) % 50) / 100
  const sy = couple ? 0.42 : 0.3
  const figs = couple
    ? `<g fill="${c}">
        <circle cx="${w * 0.42}" cy="${h * 0.5}" r="${w * 0.05}"/>
        <path d="M${w * 0.36} ${h} V${h * 0.62} Q${w * 0.36} ${h * 0.545} ${w * 0.42} ${h * 0.545} Q${w * 0.48} ${h * 0.545} ${w * 0.48} ${h * 0.62} V${h}Z"/>
        <circle cx="${w * 0.57}" cy="${h * 0.53}" r="${w * 0.047}"/>
        <path d="M${w * 0.51} ${h} V${h * 0.65} Q${w * 0.51} ${h * 0.575} ${w * 0.57} ${h * 0.575} Q${w * 0.63} ${h * 0.575} ${w * 0.63} ${h * 0.65} V${h}Z"/>
      </g>`
    : ''
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${a}"/>
    <circle cx="${w * sx}" cy="${h * sy}" r="${w * 0.2}" fill="#FFF6EA"/>
    <path d="M0 ${h * 0.64} Q ${w * 0.3} ${h * 0.46} ${w * 0.6} ${h * 0.62} T ${w} ${h * 0.56} V${h} H0Z" fill="${b}"/>
    <path d="M0 ${h * 0.82} Q ${w * 0.4} ${h * 0.68} ${w} ${h * 0.84} V${h} H0Z" fill="${c}"/>
    ${figs}
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
