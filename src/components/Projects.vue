<script setup>
import { ref, computed } from 'vue'
import { state, t } from '../i18n'
import { projects } from '../data'

const featured = projects[0]
const title = (p) => (p.title ? p.title[state.lang] : t().projects.empty)
const hasLinks = (p) => p.live || p.repo || p.video || p.privateRepo

const yt = computed(() => {
  const m = (featured.video || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return m ? m[1] : null
})
const isFile = computed(() => /\.(mp4|webm)(\?.*)?$/i.test(featured.video || ''))
const playing = ref(false)
</script>

<template>
  <section id="projects" class="section" aria-labelledby="proj-h">
    <div class="top">
      <h2 id="proj-h">{{ t().projects.title }}</h2>
      <p class="intro">{{ t().projects.intro }}</p>
    </div>

    <article class="main" aria-labelledby="feat-h">
      <img v-if="featured.images[0]" :src="featured.images[0]" :alt="title(featured)" class="shot" loading="lazy" />
      <div v-if="yt" class="video">
        <iframe v-if="playing" :src="'https://www.youtube-nocookie.com/embed/' + yt + '?autoplay=1&rel=0'" :title="t().projects.video + ': ' + title(featured)" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
        <button v-else type="button" class="play" :style="{ backgroundImage: featured.poster ? 'url(' + featured.poster + ')' : 'none' }" @click="playing = true">
          <span class="mono">▶ {{ t().projects.play }}</span>
        </button>
      </div>
      <video v-else-if="isFile" class="video" controls preload="none" :poster="featured.poster" :src="featured.video" :aria-label="title(featured)"></video>
      <div class="info">
        <p class="mono tag">No. {{ featured.no }}<span v-if="featured.placeholder"> · {{ t().projects.p1.note }}</span></p>
        <h3 id="feat-h">{{ title(featured) }}</h3>
        <p class="desc">{{ featured.desc[state.lang] }}</p>
        <p class="mono stack">{{ featured.stack.join(' · ') }}</p>
        <div v-if="hasLinks(featured)" class="links">
          <a v-if="featured.live" class="btn" :href="featured.live" target="_blank" rel="noopener">{{ t().projects.live }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <a v-if="featured.repo" class="btn" :href="featured.repo" target="_blank" rel="noopener">{{ t().projects.repo }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <a v-if="featured.video && !yt && !isFile" class="btn" :href="featured.video" target="_blank" rel="noopener">{{ t().projects.video }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <span v-if="featured.privateRepo" class="mono soon">{{ t().projects.onRequest }}</span>
        </div>
        <span v-else class="mono soon">{{ t().projects.link }}</span>
      </div>
    </article>

    <div class="gallery" v-if="projects.slice(1).some(x => x.images[0])">
      <figure v-for="x in projects.slice(1).filter(x => x.images[0])" :key="x.no" class="fig">
        <img :src="x.images[0]" :alt="title(x)" loading="lazy" width="1440" height="900" />
        <figcaption class="mono">No. {{ x.no }} · {{ title(x) }}</figcaption>
      </figure>
    </div>

    <table class="cat mono">
      <thead>
        <tr>
          <th scope="col">{{ t().projects.cols.no }}</th>
          <th scope="col">{{ t().projects.cols.title }}</th>
          <th scope="col">{{ t().projects.cols.year }}</th>
          <th scope="col" class="st">{{ t().projects.cols.stack }}</th>
          <th scope="col" class="lk"><span class="sr">Links</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in projects" :key="p.no" :class="{ empty: !p.title }">
          <td>{{ p.no }}</td>
          <th scope="row" class="nm">{{ title(p) }}</th>
          <td>{{ p.year }}</td>
          <td class="st">{{ p.stack.length ? p.stack.join(' · ') : '—' }}</td>
          <td class="lk">
            <a v-if="p.live" :href="p.live" target="_blank" rel="noopener">{{ t().projects.live }} ↗</a>
            <a v-if="p.repo" :href="p.repo" target="_blank" rel="noopener">{{ t().projects.repo }} ↗</a>
            <span v-if="p.privateRepo">{{ t().projects.onRequest }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.top { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(2rem, 5vw, 5rem); border-top: 1px solid var(--rule); padding-top: 2rem; }
.intro { color: var(--mute); align-self: end; }
.main { margin-top: 3rem; background: var(--panel); border: 1px solid var(--rule); padding: clamp(1.5rem, 4vw, 3rem); display: grid; gap: 2rem; }
.shot { width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; border: 1px solid var(--rule); }
.video { width: 100%; aspect-ratio: 16 / 9; border: 1px solid var(--rule); background: var(--wall); }
.video iframe { width: 100%; height: 100%; border: 0; display: block; }
.play { width: 100%; height: 100%; display: grid; place-items: center; background-size: cover; background-position: center; color: var(--ink); cursor: pointer; border: 0; transition: background-color .25s; }
.play:hover span { background: var(--accent); color: var(--accent-ink); }
.play span { background: var(--wall); border: 1px solid var(--ink); padding: .8rem 1.4rem; font-size: .85rem; transition: background .25s, color .25s; }
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); gap: 1.25rem; margin-top: 3rem; }
.fig { margin: 0; border: 1px solid var(--rule); background: var(--panel); }
.fig img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
.fig figcaption { padding: .7rem .9rem; font-size: .75rem; color: var(--mute); border-top: 1px solid var(--rule); }
.info { display: grid; gap: 1rem; max-width: 46rem; }
.tag { font-size: .75rem; color: var(--accent); }
h3 { font-size: clamp(1.8rem, 3.5vw, 2.75rem); font-weight: 700; }
.desc { color: var(--mute); }
.stack { font-size: .8rem; }
.links { display: flex; flex-wrap: wrap; gap: .75rem; padding-top: 1rem; border-top: 1px solid var(--rule); }
.soon { font-size: .8rem; color: var(--mute); border-top: 1px solid var(--rule); padding-top: 1rem; }
.links .soon { border: 0; padding: 0; align-self: center; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.cat { width: 100%; border-collapse: collapse; font-size: .85rem; margin-top: 3rem; }
.cat th, .cat td { text-align: left; padding: .85rem 0; border-bottom: 1px solid var(--rule); font-weight: 400; vertical-align: baseline; }
.cat thead th { color: var(--mute); font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; }
.cat td:first-child, .cat thead th:first-child { width: 5rem; color: var(--mute); }
.cat td:nth-child(3), .cat thead th:nth-child(3) { width: 5rem; color: var(--mute); }
.st { width: 14rem; color: var(--mute); }
.lk { width: 15rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: flex-end; }
.lk a { border-bottom: 1px solid var(--accent); }
.lk a:hover { color: var(--accent); }
.nm { font-family: var(--font-display); font-size: 1.25rem; font-weight: 600; letter-spacing: -.01em; }
.empty .nm { color: var(--mute); font-weight: 400; }
@media (max-width: 860px) { .top { grid-template-columns: 1fr; } .st { display: none; } .lk { width: auto; } }
</style>
