import { useEffect } from 'react'

export default function useAnimateOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const siblings = Array.from(el.parentElement!.querySelectorAll('.anim')) as HTMLElement[]
          const idx = siblings.indexOf(el)
          el.style.transitionDelay = (idx * 0.08) + 's'
          el.classList.add('visible')
          io.unobserve(el)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.anim').forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])
}
