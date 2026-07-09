import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = false, delay = 0, as: As = motion.div, ...rest }) {
  return (
    <As
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={`panel p-6 ${hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : ''} ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}
