'use client'

import { createContext, useContext } from 'react'
import { useThemeStore } from './store-theme'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <ThemeContext.Provider value= {{ theme, toggleTheme }
}>
  { children }
  </ThemeContext.Provider>
  )
}


export const useTheme = () => useContext(ThemeContext)