import { motion, useScroll } from 'framer-motion'

export default function ProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-rose"
    />
  )
}
