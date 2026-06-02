import React, { useEffect, useState } from 'react'

function SunIcon({ className = '' }: { className?: string }){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2v1.5" />
        <path d="M12 20.5V22" />
        <path d="M4.22 4.22l1.06 1.06" />
        <path d="M18.72 18.72l1.06 1.06" />
        <path d="M2 12h1.5" />
        <path d="M20.5 12H22" />
        <path d="M4.22 19.78l1.06-1.06" />
        <path d="M18.72 5.28l1.06-1.06" />
      </g>
    </svg>
  )
}

function MoonIcon({ className = '' }: { className?: string }){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ThemeToggle(){
  const [theme, setTheme] = useState<'light'|'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light') return 'light'
      if (saved === 'dark') return 'dark'
    } catch (e) {}
    return 'dark'
  })

  useEffect(() => {
    if (theme === 'light') document.documentElement.classList.add('light')
    else document.documentElement.classList.remove('light')
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  return (
    <button
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={() => setTheme((t) => t === 'light' ? 'dark' : 'light')}
      className="inline-flex items-center justify-center h-12 w-12 rounded-md text-ink1 hover:text-ink0"
    >
      {theme === 'light'
        ? <SunIcon className="h-5 w-5" />
        : <MoonIcon className="h-5 w-5" />
      }
    </button>
  )
}
