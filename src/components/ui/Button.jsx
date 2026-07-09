import { forwardRef } from 'react'

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink-light/70 dark:text-ink-dark/70 hover:bg-forest-500/10 hover:text-forest-600 dark:hover:text-forest-300 transition-colors',
  danger: 'inline-flex items-center justify-center gap-2 rounded-full bg-clay-500 text-white font-semibold px-5 py-2.5 hover:bg-clay-500/90 active:scale-[0.98] transition-all',
}

const Button = forwardRef(({ variant = 'primary', className = '', children, ...rest }, ref) => {
  return (
    <button ref={ref} className={`${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
