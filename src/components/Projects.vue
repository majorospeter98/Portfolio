<script setup lang="ts">
import { reactive, ref, computed, type ComponentPublicInstance } from 'vue'
import { state, t } from '../i18n'
import { projects, type Project } from '../data'

interface Shot {
  src: string
  alt: string
  caption: string
}

const title = (p: Project) => p.title[state.lang]
const active = ref(0)
const cur = reactive<Record<string, number>>({})
const playing = reactive<Record<string, boolean>>({})
const tabEls = ref<HTMLButtonElement[]>([])
const setTab = (el: Element | ComponentPublicInstance | null, i: number) => {
  if (el instanceof HTMLButtonElement) tabEls.value[i] = el
}

const project = computed(() => projects[active.value])

// images may be plain strings or { src, alt:{hu,en}, caption:{hu,en} }
const shots = (p: Project): Shot[] =>
  (p.images || []).map((im) =>
    typeof im === 'string'
      ? { src: im, alt: title(p), caption: '' }
      : { src: im.src, alt: im.alt?.[state.lang] || title(p), caption: im.caption?.[state.lang] || '' },
  )
const index = (p: Project) => cur[p.no] || 0
const current = (p: Project) => shots(p)[index(p)]
const ytId = (p: Project) => {
  const m = (p.video || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return m ? m[1] : null
}
const isFile = (p: Project) => /\.(mp4|webm)(\?.*)?$/i.test(p.video || '')
const hasLinks = (p: Project) => p.live || p.repo || p.video || p.privateRepo
// the address shown in the browser frame: the live demo only; no address bar text when there is none
const address = (p: Project) => (p.live || '').replace(/^https?:\/\//, '').replace(/\/$/, '')

function select(i: number) {
  active.value = i
}
function onKey(e: KeyboardEvent) {
  const n = projects.length
  const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 }
  const step = keys[e.key]
  let next: number | null = null
  if (step !== undefined) next = (active.value + step + n) % n
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = n - 1
  if (next === null) return
  e.preventDefault()
  select(next)
  tabEls.value[next]?.focus()
}
</script>

<template>
  <section id="projects" class="section" aria-labelledby="proj-h">
    <div class="top">
      <h2 id="proj-h">{{ t().projects.title }}</h2>
    </div>

    <div class="tabs" role="tablist" :aria-label="t().projects.title" @keydown="onKey">
      <button
        v-for="(p, i) in projects"
        :key="p.no"
        :ref="(el) => setTab(el, i)"
        :id="'tab-' + p.no"
        class="tab"
        type="button"
        role="tab"
        :aria-selected="i === active"
        :aria-controls="'panel-' + p.no"
        :tabindex="i === active ? 0 : -1"
        @click="select(i)"
      >{{ title(p) }}</button>
    </div>

    <article
      :key="project.no"
      :id="'panel-' + project.no"
      class="panel"
      :class="{ solo: !current(project) && !ytId(project) && !isFile(project) }"
      role="tabpanel"
      :aria-labelledby="'tab-' + project.no"
      tabindex="0"
    >
      <div v-if="current(project) || ytId(project) || isFile(project)" class="media">
        <div v-if="current(project)" class="win">
          <div class="bar" aria-hidden="true"><i></i><i></i><i></i><span v-if="address(project)">{{ address(project) }}</span></div>
          <img :src="current(project).src" :alt="current(project).alt" class="shot" />
        </div>
        <div v-if="shots(project).length > 1" class="ticks" role="group" :aria-label="title(project)">
          <button
            v-for="(s, i) in shots(project)"
            :key="s.src"
            type="button"
            class="tick"
            :aria-pressed="i === index(project)"
            :aria-label="s.caption || s.alt"
            @click="cur[project.no] = i"
          ></button>
        </div>
        <p v-if="current(project) && current(project).caption" class="cap" aria-live="polite">{{ index(project) + 1 }}/{{ shots(project).length }} · {{ current(project).caption }}</p>

        <div v-if="ytId(project)" class="video">
          <iframe v-if="playing[project.no]" :src="'https://www.youtube-nocookie.com/embed/' + ytId(project) + '?autoplay=1&rel=0'" :title="t().projects.video + ': ' + title(project)" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
          <button v-else type="button" class="play" :style="{ backgroundImage: project.poster ? 'url(' + project.poster + ')' : 'none' }" @click="playing[project.no] = true">
            <span>▶ {{ t().projects.play }}</span>
          </button>
        </div>
        <video v-else-if="isFile(project)" class="video" controls preload="none" :poster="project.poster" :src="project.video" :aria-label="title(project)"></video>
      </div>

      <div class="label">
        <h3>{{ title(project) }}</h3>
        <p class="desc">{{ project.desc[state.lang] }}</p>
        <p v-if="project.stack.length" class="stack">{{ project.stack.join(' · ') }}</p>
        <ul v-if="project.highlights?.[state.lang]?.length" class="hl">
          <li v-for="h in project.highlights[state.lang]" :key="h">{{ h }}</li>
        </ul>
        <div v-if="hasLinks(project)" class="links">
          <a v-if="project.live" class="btn" :href="project.live" target="_blank" rel="noopener">{{ t().projects.live }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <a v-if="project.repo" class="btn" :href="project.repo" target="_blank" rel="noopener">{{ t().projects.repo }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <a v-if="project.video && !ytId(project) && !isFile(project)" class="btn" :href="project.video" target="_blank" rel="noopener">{{ t().projects.video }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
          <span v-if="project.privateRepo" class="soon">{{ t().projects.onRequest }}</span>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.top { border-top: 1px solid var(--rule); padding-top: 2rem; }

/* segmented control: one cell per project, the active one inverted */
.tabs { display: flex; width: fit-content; max-width: 100%; margin-top: 2.5rem; border: 1px solid var(--rule); overflow-x: auto; scrollbar-width: thin; }
.tab { flex: none; padding: .8rem 1.4rem; font: inherit; font-size: 1rem; font-weight: 600; color: var(--mute); background: transparent; border: 0; border-right: 1px solid var(--rule); cursor: pointer; white-space: nowrap; transition: color .2s, background .2s; }
.tab:last-child { border-right: 0; }
.tab:hover { color: var(--ink); }
.tab[aria-selected="true"] { background: var(--ink); color: var(--wall); }
.tab:focus-visible { outline-offset: -3px; }

.panel { display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 3fr); gap: clamp(1.5rem, 4vw, 3rem); margin-top: 1.75rem; align-items: start; animation: swap .4s cubic-bezier(.16, 1, .3, 1); }
.panel.solo { grid-template-columns: minmax(0, 1fr); }
.panel:focus-visible { outline-offset: 6px; }
@keyframes swap { from { opacity: 0; transform: translateY(8px); } }

.media { display: grid; gap: .9rem; min-width: 0; }
.win { border: 1px solid var(--rule); background: var(--panel); overflow: hidden; }
.bar { display: flex; align-items: center; gap: .4rem; height: 2.1rem; padding: 0 .8rem; background: color-mix(in srgb, var(--panel) 70%, var(--rule)); border-bottom: 1px solid var(--rule); }
.bar i { width: .6rem; height: .6rem; border-radius: 50%; background: var(--rule); flex: none; }
.bar span { margin-left: .6rem; flex: 1; max-width: 22rem; padding: .15rem .8rem; font-size: .8125rem; color: var(--mute); background: var(--wall); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.shot { display: block; width: 100%; height: auto; filter: brightness(.95); }

.ticks { display: flex; gap: .4rem; }
.tick { flex: 1; height: 1.5rem; padding: 0; border: 0; background: transparent; cursor: pointer; position: relative; }
.tick::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 3px; margin-top: -1.5px; background: var(--rule); transition: background .2s; }
@media (pointer: coarse) { .tick { height: 2.75rem; } }
.tick:hover::after { background: var(--mute); }
.tick[aria-pressed="true"]::after { background: var(--accent); }
.cap { font-size: .875rem; color: var(--mute); }

.video { width: 100%; aspect-ratio: 16 / 9; border: 1px solid var(--rule); background: var(--wall); }
.video iframe { width: 100%; height: 100%; border: 0; display: block; }
.play { width: 100%; height: 100%; display: grid; place-items: center; background-size: cover; background-position: center; color: var(--ink); cursor: pointer; border: 0; background-color: transparent; }
.play:hover span { background: var(--accent); color: var(--accent-ink); }
.play span { background: var(--wall); border: 1px solid var(--ink); padding: .8rem 1.4rem; font-size: .85rem; transition: background .25s, color .25s; }

.label { display: grid; gap: .9rem; min-width: 0; padding-top: 1.1rem; border-top: 1px solid var(--ink); }
.solo .label { max-width: 40rem; }
h3 { font-size: clamp(1.7rem, 2.8vw, 2.3rem); font-weight: 700; }
.desc { color: var(--mute); }
.stack { font-size: .9rem; font-weight: 500; }
.hl { margin: 0; padding-left: 1.1rem; color: var(--mute); display: grid; gap: .3rem; }
.hl li::marker { color: var(--accent); }
.links { display: flex; flex-wrap: wrap; gap: .75rem; padding-top: .3rem; }
.links .btn { text-transform: none; letter-spacing: 0; font-size: .95rem; }
.soon { font-size: .85rem; color: var(--mute); align-self: center; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@media (max-width: 860px) {
  .panel { grid-template-columns: minmax(0, 1fr); }
  .tabs { width: 100%; }
  .tab { flex: 1 1 0; min-width: 0; min-height: 2.75rem; padding: .6rem .5rem; font-size: .9rem; white-space: normal; line-height: 1.2; }
}
@media (prefers-reduced-motion: reduce) { .panel { animation: none; } }
</style>
