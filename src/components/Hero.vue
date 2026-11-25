<script setup lang="ts">
import { t } from '../i18n'
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
      <div class="actions hang" style="--i:2">
        <a class="btn primary" href="#contact">{{ t().hero.cta }}</a>
        <a class="btn" href="#projects">{{ t().hero.projects }}</a>
      </div>
      <p class="langs hang" style="--i:3">{{ t().about.hu }}: {{ t().about.huLevel }} · {{ t().about.en }}: {{ t().about.enLevel }}</p>
    </div>

    <div class="mat hang" style="--i:2">
      <img
        src="/projects/profile.webp"
        :alt="t().hero.photoAlt"
        width="460"
        height="460"
        fetchpriority="high"
        decoding="async"
      />
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; max-width: 90rem; margin: 0 auto; padding: clamp(3rem, 8vw, 7rem) clamp(1.25rem, 4vw, 3rem) 0; display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: clamp(2rem, 5vw, 5rem); align-items: end; }
.glow { position: absolute; left: 0; right: 0; top: 0; height: 30rem; background: linear-gradient(180deg, rgba(var(--spot), calc(var(--spot-a) * .55)), transparent 75%); pointer-events: none; }
.left { position: relative; display: flex; flex-direction: column; align-items: flex-start; }
.name { font-size: clamp(3.4rem, 10vw, 6rem); font-weight: 800; letter-spacing: -.035em; line-height: .95; margin-bottom: 2rem; }
.name span { display: block; }
.bio { color: var(--ink); font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.45; }
.actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
.actions .btn { min-height: 2.75rem; }
.langs { font-size: .875rem; color: var(--mute); margin-top: 1.5rem; }

/* the portrait hangs in a mat; greyscale until hovered so it sits in the palette */
.mat { position: relative; justify-self: end; width: min(100%, 20rem); border: 1px solid var(--rule); background: var(--panel); padding: .9rem; }
.mat img { display: block; width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; object-position: 50% 30%; filter: grayscale(1) contrast(1.06) brightness(.94); transition: filter .5s cubic-bezier(.16, 1, .3, 1); }
.mat:hover img { filter: none; }

@media (max-width: 860px) {
  .hero { grid-template-columns: 1fr; align-items: start; }
  .mat { justify-self: start; width: min(100%, 15rem); }
}
@media (prefers-reduced-motion: reduce) { .mat img { transition: none; } }
</style>
