<script setup>
import { ref } from 'vue'
import { state, t } from '../i18n'
import { projects } from '../data'

const active = ref(0)
const top = projects.slice(0, 3)
const title = (p) => (p.title ? p.title[state.lang] : t().hero.prep)
const spot = ref({ x: '70%', y: '30%' })
function move(e) {
  const r = e.currentTarget.getBoundingClientRect()
  spot.value = { x: ((e.clientX - r.left) / r.width) * 100 + '%', y: ((e.clientY - r.top) / r.height) * 100 + '%' }
}
</script>

<template>
  <section id="top" class="hero" aria-labelledby="name">
    <div class="glow" aria-hidden="true"></div>

    <div class="left">
      <h1 id="name" class="name hang" style="--i:0">
        <span>{{ t().hero.name[0] }}</span>
        <span>{{ t().hero.name[1] }}</span>
      </h1>
      <p class="wall hang" style="--i:2">{{ t().hero.wall }}</p>
      <a href="#contact" class="btn hang" style="--i:3">{{ t().hero.cta }} <span aria-hidden="true">→</span></a>
    </div>

    <div class="right">
      <figure
        class="exhibit hang"
        style="--i:1"
        :style="{ '--sx': spot.x, '--sy': spot.y }"
        tabindex="0"
        :class="{ on: active === 0 }"
        @pointermove="move"
        @pointerenter="active = 0"
        @focus="active = 0"
      >
        <!-- Placeholder illustration: abstract application window, not a real screenshot -->
        <img v-if="top[0].images[0]" :src="top[0].images[0]" :alt="title(top[0])" class="art shot" />
        <svg v-else viewBox="0 0 640 400" role="img" :aria-label="title(top[0])" class="art">
          <rect width="640" height="400" fill="#1b2438" />
          <rect x="0" y="0" width="640" height="34" fill="#232e48" />
          <circle cx="20" cy="17" r="5" fill="#ff5a3c" /><circle cx="38" cy="17" r="5" fill="#6b7896" /><circle cx="56" cy="17" r="5" fill="#6b7896" />
          <rect x="0" y="34" width="150" height="366" fill="#17203a" />
          <g fill="#3a4a72"><rect x="18" y="58" width="100" height="10" rx="2" /><rect x="18" y="84" width="76" height="10" rx="2" /><rect x="18" y="110" width="90" height="10" rx="2" /><rect x="18" y="136" width="64" height="10" rx="2" /></g>
          <rect x="18" y="58" width="100" height="10" rx="2" fill="#ff5a3c" />
          <g fill="#2c3a5e"><rect x="176" y="58" width="220" height="26" rx="3" /><rect x="176" y="104" width="438" height="70" rx="3" /><rect x="176" y="194" width="212" height="170" rx="3" /><rect x="402" y="194" width="212" height="170" rx="3" /></g>
          <g stroke="#6b82b8" stroke-width="2" fill="none"><polyline points="190,340 230,300 270,318 310,270 350,290 372,236" /><polyline points="416,330 450,312 490,320 530,260 590,240" /></g>
        </svg>
        <div class="beam" aria-hidden="true"></div>
        <figcaption class="plaque">
          <span class="mono no">No. 001 · {{ t().hero.onView }}</span>
          <strong>{{ title(top[0]) }}</strong>
          <span class="mono meta">{{ top[0].stack.join(' · ') }}</span>
        </figcaption>
      </figure>

      <div class="pair">
        <div v-for="(p, i) in top.slice(1)" :key="p.no" class="frame hang" :style="{ '--i': 4 + i }" @pointerenter="active = i + 1" :class="{ on: active === i + 1 }">
          <span class="mono no">No. {{ p.no }}</span>
          <span class="prep">{{ title(p) }}</span>
        </div>
      </div>
    </div>

    <dl class="strip mono" aria-label="Catalogue">
      <template v-for="(p, i) in top" :key="p.no">
        <div class="row" :class="{ on: active === i }" @pointerenter="active = i">
          <dt>{{ p.no }}</dt>
          <dd>{{ title(p) }}</dd>
          <dd class="stack">{{ p.stack.length ? p.stack.join(' · ') : '—' }}</dd>
        </div>
      </template>
    </dl>
  </section>
</template>

<style scoped>
.hero { position: relative; max-width: 90rem; margin: 0 auto; padding: clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem) 0; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(2rem, 5vw, 5rem); }
.glow { position: absolute; right: 0; top: -10%; width: 62%; height: 80%; background: radial-gradient(closest-side, rgba(var(--spot), var(--spot-a)), transparent); pointer-events: none; }
.left { display: flex; flex-direction: column; align-items: flex-start; padding-top: clamp(0rem, 2vw, 2rem); position: relative; }
.name { font-size: clamp(3.4rem, 9.5vw, 6rem); font-weight: 800; letter-spacing: -.045em; line-height: .92; margin-bottom: 2rem; }
.name span { display: block; }
.wall { font-size: clamp(1.15rem, 1.8vw, 1.4rem); line-height: 1.4; color: var(--mute); max-width: 28ch; margin-bottom: 2.25rem; }

.right { position: relative; display: grid; gap: 1.25rem; align-content: start; }
.exhibit { position: relative; margin: 0; border: 1px solid var(--rule); background: var(--panel); overflow: hidden; outline-offset: 4px; transition: border-color .3s; }
.exhibit.on, .exhibit:hover, .exhibit:focus-visible { border-color: var(--accent); }
.art { display: block; width: 100%; height: auto; }
.shot { aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
.beam { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at var(--sx, 70%) var(--sy, 30%), rgba(var(--spot), .16), transparent 45%); opacity: .7; transition: opacity .3s; }
.plaque { position: absolute; left: 1rem; bottom: 1rem; display: grid; gap: .15rem; background: var(--wall); border: 1px solid var(--rule); padding: .75rem 1rem; max-width: calc(100% - 2rem); }
.plaque strong { font-size: 1.05rem; letter-spacing: -.01em; }
.no { font-size: .75rem; color: var(--accent); }
.meta { font-size: .72rem; color: var(--mute); }

.pair { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.frame { border: 1px dashed var(--rule); min-height: 7.5rem; padding: .9rem 1rem; display: flex; flex-direction: column; justify-content: space-between; transition: border-color .3s; }
.frame.on { border-color: var(--accent); }
.prep { color: var(--mute); font-size: .95rem; }

.strip { grid-column: 1 / -1; margin: clamp(2rem, 5vw, 4rem) 0 0; border-top: 1px solid var(--rule); font-size: .8rem; }
.row { display: grid; grid-template-columns: 5rem minmax(0, 1fr) minmax(0, 14rem); gap: 1rem; padding: .85rem 0; border-bottom: 1px solid var(--rule); color: var(--mute); transition: color .25s, background .25s; }
.row dt { color: var(--mute); }
.row dd { margin: 0; }
.row.on { color: var(--ink); background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 12%, transparent), transparent); }
.row.on dt { color: var(--accent); }

@media (max-width: 860px) {
  .hero { grid-template-columns: 1fr; }
  .stack { display: none; }
  .row { grid-template-columns: 4rem minmax(0, 1fr); }
  .glow { width: 100%; }
}
</style>
