const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const siblings = Array.from(el.parentElement.querySelectorAll('.anim'));
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = (idx * 0.08) + 's';
      el.classList.add('visible');
      io.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.anim').forEach(el => io.observe(el));