import React from 'react'
import useAnimateOnScroll from './hooks/useAnimateOnScroll'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Stack from './components/Stack'
import Ecosystem from './components/Ecosystem'
import Community from './components/Community'
import Footer from './components/Footer'

export default function App() {
  useAnimateOnScroll()

  return (
    <div className="min-h-screen font-dmsans text-ink0 bg-bg0">
      <div className="glow-orb" />
      <div className="glow-orb2" />
      <Nav />
      <main className="pt-6">
        <Hero />
        <Capabilities />
        <Stack />
        <Ecosystem />
        <section className="manifesto anim">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12">
            <h2 className="manifesto-hl">"Every idea is a node. <span className="text-g">DevSnapz</span> connects them into something <em className="text-gold">real</em>."</h2>
            <p className="manifesto-body">Not backed by investors. Not powered by a large team. Driven by curiosity, built by building — one project at a time.</p>
          </div>
        </section>
        <Community />
      </main>
      <Footer />
    </div>
  )
}
