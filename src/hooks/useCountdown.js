import { useEffect, useState } from 'react'
import { getRemaining } from '../lib/countdown'

export function useCountdown(targetISO) {
  const [t, setT] = useState(() => getRemaining(targetISO))
  useEffect(() => {
    const id = setInterval(() => setT(getRemaining(targetISO)), 1000)
    return () => clearInterval(id)
  }, [targetISO])
  return t
}
