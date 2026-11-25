import { motion, useReducedMotion } from 'framer-motion'
import { ease, dur } from '../../lib/motion'

const styles = {
  solid: 'bg-wine text-paper',
  stamp: 'bg-rose text-paper',
  ghost: 'border-2 border-wine text-wine',
  paper: 'bg-paper text-wine',
}

// Saat ditekan, tombol turun sedikit seperti cetakan yang menekan kertas.
export default function Button({ as = 'button', variant = 'solid', className = '', children, ...props }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.button
  const extra = as === 'button' ? { type: 'button' } : {}
  return (
    <Tag
      whileTap={reduce ? undefined : { y: 3, boxShadow: '0 0 0 0 #6B1E2E' }}
      initial={false}
      animate={{ boxShadow: '0 3px 0 0 #6B1E2E' }}
      transition={{ duration: dur.quick, ease: ease.press }}
      className={`inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 px-6 py-3 font-display text-lg tracking-tight disabled:opacity-50 ${styles[variant]} ${className}`}
      {...extra}
      {...props}
    >
      {children}
    </Tag>
  )
}
