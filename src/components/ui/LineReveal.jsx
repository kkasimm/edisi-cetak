import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../lib/motion'

// Judul "terangkat" dari balik garis, satu kali saat masuk layar.
export default function LineReveal({ as: Tag = 'h2', className = '', delay = 0, children }) {
  const reduce = useReducedMotion()
  return (
    <Tag className={className}>
      <span className="-mt-[0.12em] block overflow-hidden pb-[0.1em] pt-[0.12em]">
        <motion.span
          className="block"
          initial={reduce ? false : { y: '110%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 1.05, ease: ease.settle, delay }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  )
}
