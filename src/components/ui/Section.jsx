export default function Section({ id, className = '', children, ...props }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-20 md:px-10 md:py-32 ${className}`} {...props}>
      {children}
    </section>
  )
}
