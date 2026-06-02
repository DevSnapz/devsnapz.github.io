import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t border-ink3/30 mt-10">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="font-outfit text-2xl font-extrabold tracking-tight">Dev<span className="text-g">Snapz</span></div>
          <p className="max-w-xl text-sm text-ink1">A polished hub for builders, designers, makers, and open-source collaborators — built to connect ideas and launch projects.</p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-ink2 sm:items-end">
          <span>© {new Date().getFullYear()} DevSnapz</span>
          <span className="inline-flex items-center gap-2 text-ink1">
            <span className="hidden sm:inline">⚡</span>
            code · connect · evolve
          </span>
        </div>
      </div>
    </footer>
  )
}
