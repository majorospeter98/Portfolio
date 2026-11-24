<script setup>
import { t } from '../i18n'

const GITHUB = 'https://github.com/majorospeter98'
</script>

<template>
  <section id="top" class="hero" aria-labelledby="name">
    <div class="glow" aria-hidden="true"></div>

    <div class="left">
      <h1 id="name" class="name hang" style="--i:0">
        <span>{{ t().hero.name[0] }}</span>
        <span>{{ t().hero.name[1] }}</span>
      </h1>
      <p class="bio hang" style="--i:1">{{ t().about.p1 }}</p>
      <a href="#contact" class="btn primary hang" style="--i:2">{{ t().hero.cta }} <span aria-hidden="true">→</span></a>
    </div>

    <figure class="exhibit hang" style="--i:2">
      <div class="mat">
        <img src="/profile.png" alt="Majoros Péter" width="460" height="460" />
      </div>
      <figcaption class="plaque">
        <span class="mono who">Majoros Péter</span>
        <span class="mono langs">{{ t().about.hu }}: {{ t().about.huLevel }} · {{ t().about.en }}: {{ t().about.enLevel }}</span>
        <a class="mono" :href="GITHUB" target="_blank" rel="noopener">github.com/majorospeter98 ↗ <span class="sr">({{ t().hero.github }}, {{ t().projects.open }})</span></a>
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
.hero { position: relative; max-width: 90rem; margin: 0 auto; padding: clamp(3rem, 8vw, 7rem) clamp(1.25rem, 4vw, 3rem) 0; display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: clamp(2rem, 5vw, 5rem); align-items: end; }
.glow { position: absolute; right: 0; top: -25%; width: 60%; height: 130%; background: radial-gradient(closest-side, rgba(var(--spot), var(--spot-a)), transparent); pointer-events: none; }
.left { position: relative; display: flex; flex-direction: column; align-items: flex-start; }
.name { font-size: clamp(3.4rem, 10vw, 6rem); font-weight: 800; letter-spacing: -.045em; line-height: .92; margin-bottom: 2rem; }
.name span { display: block; }
.bio { max-width: 52ch; color: var(--ink); font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.45; margin-bottom: 2.25rem; }

/* the portrait is hung like an exhibit: a mat, a frame, a placard */
.exhibit { position: relative; margin: 0; justify-self: end; width: min(100%, 20rem); }
.mat { border: 1px solid var(--rule); background: var(--panel); padding: .9rem; box-shadow: 0 18px 40px -18px rgba(0, 0, 0, .6); }
.mat img { display: block; width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; filter: grayscale(1) contrast(1.06) brightness(.94); transition: filter .5s cubic-bezier(.16, 1, .3, 1); }
.exhibit:hover .mat img, .exhibit:focus-within .mat img { filter: none; }
.plaque { display: grid; gap: .3rem; margin-top: .9rem; padding: .8rem .9rem; border: 1px solid var(--rule); background: var(--wall); font-size: .75rem; }
.who { color: var(--ink); font-size: .85rem; }
.langs { color: var(--mute); }
.plaque a { color: var(--mute); width: fit-content; border-bottom: 1px solid transparent; transition: color .2s, border-color .2s; }
.plaque a:hover { color: var(--ink); border-color: var(--accent); }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@media (max-width: 860px) {
  .hero { grid-template-columns: 1fr; align-items: start; }
  .exhibit { justify-self: start; width: min(100%, 16rem); }
  .glow { width: 100%; right: -20%; }
}
@media (prefers-reduced-motion: reduce) { .mat img { transition: none; } }
</style>
