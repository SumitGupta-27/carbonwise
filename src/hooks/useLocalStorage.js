import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const resolveInitial = () => (typeof initialValue === 'function' ? initialValue() : initialValue)

  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : resolveInitial()
    } catch (err) {
      console.warn(`useLocalStorage: could not read "${key}"`, err)
      return resolveInitial()
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`useLocalStorage: could not write "${key}"`, err)
    }
  }, [key, value])

  return [value, setValue]
}
