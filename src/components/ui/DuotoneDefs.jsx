// Filter duotone: bayangan wine, sorotan paper. Dipasang sekali di root.
export default function DuotoneDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <filter id="duotone-wine" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.42 0.96" />
            <feFuncG type="table" tableValues="0.12 0.92" />
            <feFuncB type="table" tableValues="0.18 0.87" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  )
}
