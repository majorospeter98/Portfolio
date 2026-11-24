<script setup>
import { reactive } from 'vue'
import { state, t } from '../i18n'
import { projects } from '../data'

const title = (p) => p.title[state.lang]
const cur = reactive({})
const playing = reactive({})

// images may be plain strings or { src, alt:{hu,en}, caption:{hu,en} }
const shots = (p) =>
  (p.images || []).map((im) =>
    typeof im === 'string'
      ? { src: im, alt: title(p), caption: '' }
      : { src: im.src, alt: im.alt?.[state.lang] || title(p), caption: im.caption?.[state.lang] || '' },
  )
const current = (p) => shots(p)[cur[p.no] || 0]
const ytId = (p) => {
  const m = (p.video || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return m ? m[1] : null
}
const isFile = (p) => /\.(mp4|webm)(\?.*)?$/i.test(p.video || '')
const hasLinks = (p) => p.live || p.repo || p.video || p.privateRepo
</script>

<template>
  <section id="projects" class="section" aria-labelledby="proj-h">
    <div class="top">
      <h2 id="proj-h">{{ t().projects.title }}</h2>
    </div>

    <div class="list">
    <article v-for="(p, idx) in projects" :key="p.no" class="card" :class="{ compact: idx > 0 }" :aria-labelledby="'p-' + p.no">
      <div class="media">
        <figure v-if="current(p)" class="stage">
          <img :src="current(p).src" :alt="current(p).alt" class="shot" width="1910" height="950" :loading="p.no === projects[0].no ? 'eager' : 'lazy'" />
          <figcaption v-if="current(p).caption" class="mono cap">{{ (cur[p.no] || 0) + 1 }}/{{ shots(p).length }} · {{ current(p).caption }}</figcaption>
        </figure>
        
        <ul v-if="shots(p).length > 1" class="thumbs" :aria-label="title(p)">
          <li v-for="(s, i) in shots(p)" :key="s.src">
            <button type="button" :aria-pressed="i === (cur[p.no] || 0)" :aria-label="s.caption || s.alt" @click="cur[p.no] = i">
              <img :src="s.src" alt="" loading="lazy" width="320" height="160" />
            </button>
          </li>
        </ul>

        <div v-if="ytId(p)" class="video">
          <iframe v-if="playing[p.no]" :src="'https://www.youtube-nocookie.com/embed/' + ytId(p) + '?autoplay=1&rel=0'" :title="t().projects.video + ': ' + title(p)" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
          <button v-else type="button" class="play" :style="{ backgroundImage: p.poster ? 'url(' + p.poster + ')' : 'none' }" @click="playing[p.no] = true">
            <span class="mono">▶ {{ t().projects.play }}</span>
          </button>
        </div>
        <video v-else-if="isFile(p)" class="video" controls preload="none" :poster="p.poster" :src="p.video" :aria-label="title(p)"></video>
      </div>

      <div class="info">
        <p class="mono tag">No. {{ p.no }}<span v-if="p.year && p.year !== '—'"> · {{ p.year }}</span></p>
        <h3 :id="'p-' + p.no">{{ title(p) }}</h3>
        <p class="desc">{{ p.desc[state.lang] }}</p>
        <p v-if="p.stack.length" class="mono stack">{{ p.stack.join(' · ') }}</p>
        <ul v-if="p.highlights?.[state.lang]?.length" class="hl">
          <li v-for="h in p.highlights[state.lang]" :key="h">{{ h }}</li>
        </ul>
        <div v-if="hasLinks(p)" class="links">
          <a v-if="p.live" class="btn" :href="p.live" target="_blank" rel="noopener">{{ t().projects.live }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <a v-if="p.repo" class="btn" :href="p.repo" target="_blank" rel="noopener">{{ t().projects.repo }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <a v-if="p.video && !ytId(p) && !isFile(p)" class="btn" :href="p.video" target="_blank" rel="noopener">{{ t().projects.video }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <span v-if="p.privateRepo" class="mono soon">{{ t().projects.onRequest }}</span>
        </div>
      </div>
    </article>
    </div>
  </section>
</template>

<style scoped>
.top { border-top: 1px solid var(--rule); padding-top: 2rem; }
.list { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
.card { margin: 0; background: var(--panel); border: 1px solid var(--rule); padding: clamp(1.25rem, 3vw, 2.5rem); display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(1.5rem, 4vw, 3.5rem); align-items: start; }
.media { display: grid; gap: 1rem; min-width: 0; }
.stage { margin: 0; }
.shot { display: block; width: 100%; height: auto; aspect-ratio: 2 / 1; object-fit: cover; object-position: top; border: 1px solid var(--rule); background: var(--wall); }
.ph { display: grid; place-items: center; color: var(--mute); font-size: .8rem; border-style: dashed; }
.cap { font-size: .75rem; color: var(--mute); padding-top: .75rem; }
.thumbs { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr)); gap: .6rem; }
.thumbs button { display: block; width: 100%; padding: 0; border: 1px solid var(--rule); background: var(--wall); cursor: pointer; opacity: .6; transition: opacity .2s, border-color .2s; }
.thumbs button:hover { opacity: 1; }
.thumbs button[aria-pressed="true"] { opacity: 1; border-color: var(--accent); }
.thumbs img { display: block; width: 100%; height: auto; aspect-ratio: 2 / 1; object-fit: cover; object-position: top; }
.video { width: 100%; aspect-ratio: 16 / 9; border: 1px solid var(--rule); background: var(--wall); }
.video iframe { width: 100%; height: 100%; border: 0; display: block; }
.play { width: 100%; height: 100%; display: grid; place-items: center; background-size: cover; background-position: center; color: var(--ink); cursor: pointer; border: 0; background-color: transparent; }
.play:hover span { background: var(--accent); color: var(--accent-ink); }
.play span { background: var(--wall); border: 1px solid var(--ink); padding: .8rem 1.4rem; font-size: .85rem; transition: background .25s, color .25s; }
.info { display: grid; gap: 1rem; min-width: 0; }
.tag { font-size: .75rem; color: var(--mute); }
h3 { font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 700; }
.desc { color: var(--mute); }
.stack { font-size: .8rem; }
.hl { margin: 0; padding-left: 1.1rem; color: var(--mute); display: grid; gap: .3rem; }
.hl li::marker { color: var(--accent); }
.links { display: flex; flex-wrap: wrap; gap: .75rem; padding-top: 1rem; border-top: 1px solid var(--rule); }
.soon { font-size: .8rem; color: var(--mute); align-self: center; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.card:first-child { grid-column: 1 / -1; }
.compact { grid-template-columns: 1fr; gap: 1.25rem; align-content: start; }
.compact h3 { font-size: clamp(1.4rem, 2.2vw, 1.8rem); }
@media (max-width: 860px) { .card, .list { grid-template-columns: 1fr; } }
</style>
