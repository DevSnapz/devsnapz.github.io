import React from 'react'

export default function Ecosystem(){
  return (
    <section id="ecosystem" className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12">
      <div className="font-dmmono text-xs uppercase tracking-wider text-ink2 mb-6 anim">Featured ecosystem</div>
      <div className="grid md:grid-cols-2 gap-6 bg-bg1 border border-[rgba(46,46,44,1)] rounded-xl overflow-hidden">
        <div className="p-6 md:border-r border-[rgba(46,46,44,1)]">
          <div className="inline-flex items-center gap-2 font-dmmono text-xs text-g-text bg-[rgba(27,206,146,0.07)] border border-[rgba(14,122,87,1)] rounded-full px-3 py-1 mb-4">
            <span className="w-2 h-2 rounded-full bg-g" /> Live · Flagship
          </div>
          <div className="text-2xl font-outfit font-extrabold mb-2">AiVerse</div>
          <p className="text-ink1 mb-4">Our flagship AI platform — built to make artificial intelligence more useful, accessible, and genuinely engaging. Explore intelligent tools crafted for real workflows.</p>
          <div className="flex gap-3">
            <a className="font-dmmono text-sm bg-g text-bg0 px-4 py-2 rounded-md" href="https://aiverse.frozenn.in" target="_blank" rel="noopener noreferrer">Visit AiVerse ↗</a>
            <a className="font-dmmono text-sm border border-[rgba(46,46,44,1)] px-4 py-2 rounded-md" href="https://github.com/DevSnapz" target="_blank" rel="noopener noreferrer">View Source</a>
          </div>
        </div>
        <div className="p-6 bg-bg2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-ink2 uppercase">Status</div>
              <div className="text-lg font-outfit font-bold text-g">Production ●</div>
            </div>
            <div>
              <div className="text-xs text-ink2 uppercase">Domain</div>
              <div className="font-dmmono text-ink1">aiverse.frozenn.in</div>
            </div>
            <div>
              <div className="text-xs text-ink2 uppercase">Category</div>
              <div className="text-lg">AI Platform</div>
            </div>
            <div>
              <div className="text-xs text-ink2 uppercase">Built with</div>
              <div className="font-dmmono text-g-text">React · Node.js · LLMs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
