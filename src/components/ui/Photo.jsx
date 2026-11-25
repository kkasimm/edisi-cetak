import { useState } from 'react'
import { placeholderSrc } from '../../lib/placeholder'

/**
 * Foto dengan perlakuan duotone dan fallback otomatis.
 * colorOnHover: lapisan warna asli memudar masuk saat hover/fokus pada elemen `.group`.
 * tone="color": selalu warna asli (mis. di lightbox).
 */
export default function Photo({ src, alt, seed = 0, ratio = 3 / 4, tone = 'duotone', colorOnHover = false, className = '', ...rest }) {
  const [failed, setFailed] = useState(false)
  const url = !src || failed ? placeholderSrc(seed) : src
  const base = 'absolute inset-0 h-full w-full object-cover'
  return (
    <div className={`relative overflow-hidden bg-blush ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        onError={() => setFailed(true)}
        className={base}
        style={{ filter: tone === 'duotone' ? 'url(#duotone-wine)' : 'none' }}
        {...rest}
      />
      {colorOnHover && (
        <img
          src={url}
          alt=""
          aria-hidden="true"
          draggable="false"
          className={`${base} opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100`}
        />
      )}
    </div>
  )
}
