import React from 'react'

const items = [
  { num: '01', name: 'AI Applications', desc: 'LLM-powered products, intelligent pipelines, and tools that learn from context.' },
  { num: '02', name: 'Full-Stack Web', desc: 'End-to-end systems from pixel-perfect UIs to resilient backend architectures.' },
  { num: '03', name: 'System Design', desc: 'Distributed architectures built to handle complexity, failure, and scale.' },
  { num: '04', name: 'DevTools & CLIs', desc: 'Scripts, automations, and developer utilities that eliminate repetitive work.' }
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12">
      <div className="font-dmmono text-xs uppercase tracking-wider text-ink2 mb-6 anim">Core capabilities</div>
      <div className="flex items-end justify-between flex-wrap gap-4">
        <h2 className="font-outfit font-extrabold text-[clamp(1.8rem,3vw,2.6rem)] leading-tight anim">What we<br/>build.</h2>
        <p className="text-ink1 max-w-[520px] text-sm anim text-left sm:text-right">Four distinct disciplines. One unified vision of technology that actually moves the needle.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[rgba(46,46,44,1)] rounded-xl overflow-hidden mt-8">
        {items.map((it) => (
          <div key={it.num} className="bg-bg1 p-6">
            <div className="text-[2.5rem] font-outfit font-extrabold text-ink3 mb-3">{it.num}</div>
            <div className="w-10 h-10 rounded-md bg-[rgba(27,206,146,0.08)] border border-[rgba(14,122,87,1)] flex items-center justify-center mb-3">
              <svg className="w-4 h-4 stroke-g" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="2.5" /></svg>
            </div>
            <div className="font-outfit font-semibold">{it.name}</div>
            <div className="text-sm text-ink1 mt-2">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
