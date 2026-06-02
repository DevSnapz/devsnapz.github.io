import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="relative sticky top-0 z-50 bg-[rgba(8,8,8,0.95)] backdrop-blur-md border-b border-[rgba(46,46,44,1)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-4">
        <a href="#" className="font-outfit font-extrabold text-[0.95rem] sm:text-[1.05rem] text-ink0 leading-tight">
          Dev<span className="text-g">Snapz</span>
        </a>

        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          <a className="text-[0.72rem] sm:text-xs font-dmmono text-ink1 hover:text-ink0" href="#capabilities">Work</a>
          <a className="text-[0.72rem] sm:text-xs font-dmmono text-ink1 hover:text-ink0" href="#stack">Stack</a>
          <a className="text-[0.72rem] sm:text-xs font-dmmono text-ink1 hover:text-ink0" href="#ecosystem">Ecosystem</a>
          <a className="text-[0.72rem] sm:text-xs font-dmmono text-ink1 hover:text-ink0" href="#community">Community</a>
          <a className="text-[0.72rem] sm:text-xs font-dmmono text-g-text bg-[rgba(27,206,146,0.07)] border border-[rgba(14,122,87,1)] rounded-md px-2.5 py-1.5" href="#community">Join</a>
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="md:hidden inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-dmmono text-ink1 hover:text-ink0"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[rgba(27,206,146,0.08)] text-g">
            {open ? '×' : '≡'}
          </span>
        </button>
      </div>

      <div className={`absolute right-4 top-full z-40 mt-2 w-[min(260px,calc(100%-1rem))] overflow-hidden rounded-xl border border-[rgba(46,46,44,1)] bg-[rgba(8,8,8,0.95)] shadow-2xl ring-1 ring-white/5 transition-all duration-200 md:hidden ${open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
        <div className="flex flex-col gap-2 p-3">
          <a onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(46,46,44,1)] px-4 py-3 text-sm font-dmmono text-ink1 hover:text-ink0 hover:bg-[rgba(255,255,255,0.03)]" href="#capabilities">Work</a>
          <a onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(46,46,44,1)] px-4 py-3 text-sm font-dmmono text-ink1 hover:text-ink0 hover:bg-[rgba(255,255,255,0.03)]" href="#stack">Stack</a>
          <a onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(46,46,44,1)] px-4 py-3 text-sm font-dmmono text-ink1 hover:text-ink0 hover:bg-[rgba(255,255,255,0.03)]" href="#ecosystem">Ecosystem</a>
          <a onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(46,46,44,1)] px-4 py-3 text-sm font-dmmono text-ink1 hover:text-ink0 hover:bg-[rgba(255,255,255,0.03)]" href="#community">Community</a>
          <a onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(14,122,87,1)] bg-[rgba(27,206,146,0.07)] px-4 py-3 text-sm font-dmmono text-g-text text-center" href="#community">Join</a>
        </div>
      </div>
    </nav>
  )
}
