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
      <p class="mono langs hang" style="--i:2">{{ t().about.hu }}: {{ t().about.huLevel }} · {{ t().about.en }}: {{ t().about.enLevel }}</p>
      <a href="#contact" class="btn hang" style="--i:3">{{ t().hero.cta }} <span aria-hidden="true">→</span></a>
    </div>

    <figure class="who hang" style="--i:2">
      <img src="/profile.png" alt="Majoros Péter" width="460" height="460" />
      <figcaption>
        <a class="mono" :href="GITHUB" target="_blank" rel="noopener">github.com/majorospeter98 ↗ <span class="sr">({{ t().hero.github }}, {{ t().projects.open }})</span></a>
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
.hero { position: relative; max-width: 90rem; margin: 0 auto; padding: clamp(3rem, 8vw, 7rem) clamp(1.25rem, 4vw, 3rem) 0; display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: clamp(2rem, 5vw, 5rem); align-items: end; }
.glow { position: absolute; left: -10%; top: -20%; width: 70%; height: 120%; background: radial-gradient(closest-side, rgba(var(--spot), var(--spot-a)), transparent); pointer-events: none; }
.left { position: relative; display: flex; flex-direction: column; align-items: flex-start; }
.name { font-size: clamp(3.4rem, 10vw, 6rem); font-weight: 800; letter-spacing: -.045em; line-height: .92; margin-bottom: 2rem; }
.name span { display: block; }
.bio { max-width: 52ch; color: var(--ink); font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.45; margin-bottom: 1rem; }
.langs { font-size: .8rem; color: var(--mute); margin-bottom: 2.25rem; }

.who { position: relative; margin: 0; justify-self: end; width: min(100%, 22rem); border: 1px solid var(--rule); background: var(--panel); }
.who img { display: block; width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; }
.who figcaption { border-top: 1px solid var(--rule); padding: .8rem .75rem; font-size: .75rem; white-space: nowrap; }
.who a { color: var(--mute); border-bottom: 1px solid transparent; transition: color .2s, border-color .2s; }
.who a:hover { color: var(--ink); border-color: var(--accent); }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@media (max-width: 860px) {
  .hero { grid-template-columns: 1fr; align-items: start; }
  .who { justify-self: start; width: min(100%, 15rem); }
}
</style>
