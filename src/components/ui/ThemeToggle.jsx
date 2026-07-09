import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative w-14 h-8 rounded-full bg-forest-500/15 flex items-center px-1 transition-colors"
    >
      <span
        className={`absolute w-6 h-6 rounded-full bg-forest-500 shadow-soft flex items-center justify-center transition-transform duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? <Moon size={13} className="text-white" /> : <Sun size={13} className="text-white" />}
      </span>
    </button>
  )
}
