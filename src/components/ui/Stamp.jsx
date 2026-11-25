import { useId } from 'react'

// Cap bundar dengan teks melingkar. Warna mengikuti `currentColor`.
export default function Stamp({ ring = 'Alya dan Raka — 20 Maret 2027 — ', center = '20.03', bottom = '2027', className = '' }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`Cap ${center} ${bottom}`}>
      <defs>
        <path id={uid} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fontSize="16" fill="currentColor" fontFamily="var(--font-display)">
        <textPath href={`#${uid}`} textLength="440" lengthAdjust="spacing">{ring}</textPath>
      </text>
      <text x="100" y="106" textAnchor="middle" fontSize="32" fill="currentColor" fontFamily="var(--font-display)">{center}</text>
      <text x="100" y="130" textAnchor="middle" fontSize="18" fill="currentColor" fontFamily="var(--font-text)" fontStyle="italic">{bottom}</text>
    </svg>
  )
}
