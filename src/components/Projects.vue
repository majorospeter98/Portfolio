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

const hasMedia = (p: Project) => Boolean(current(p) || ytId(p) || isFile(p))
const videoBox = 'aspect-video w-full border border-rule bg-wall'

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
    <div class="border-t border-rule pt-8">
      <h2 id="proj-h">{{ t().projects.title }}</h2>
    </div>

    <div class="mt-10 flex w-fit max-w-full overflow-x-auto border border-rule [scrollbar-width:thin] narrow:grid narrow:w-full narrow:grid-cols-2" role="tablist" :aria-label="t().projects.title" @keydown="onKey">
      <button
        v-for="(p, i) in projects"
        :key="p.no"
        :ref="(el) => setTab(el, i)"
        :id="'tab-' + p.no"
        class="flex-none cursor-pointer whitespace-nowrap border-r border-rule bg-transparent px-[1.4rem] py-[.8rem] text-[1rem] font-semibold text-mute transition-colors last:border-r-0 hover:text-ink focus-visible:-outline-offset-3 aria-selected:bg-ink aria-selected:text-wall narrow:min-h-11 narrow:min-w-0 narrow:even:border-r-0 narrow:[&:nth-child(-n+2)]:border-b narrow:whitespace-normal narrow:px-2 narrow:py-[.6rem] narrow:text-[.9rem] narrow:leading-[1.2]"
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
      class="mt-7 grid animate-swap items-start gap-[clamp(1.5rem,4vw,3rem)] focus-visible:outline-offset-6 motion-reduce:animate-none narrow:grid-cols-[minmax(0,1fr)]"
      :class="hasMedia(project) ? 'grid-cols-[minmax(0,8fr)_minmax(0,3fr)]' : 'grid-cols-[minmax(0,1fr)]'"
      role="tabpanel"
      :aria-labelledby="'tab-' + project.no"
      tabindex="0"
    >
      <div v-if="hasMedia(project)" class="grid min-w-0 gap-[.9rem]">
        <div v-if="current(project)" class="overflow-hidden border border-rule bg-panel">
          <img :src="current(project).src" :alt="current(project).alt" class="block aspect-2/1 w-full bg-white object-contain brightness-95" />
        </div>
        <div v-if="shots(project).length > 1" class="flex gap-[.4rem]" role="group" :aria-label="title(project)">
          <button
            v-for="(s, i) in shots(project)"
            :key="s.src"
            type="button"
            class="relative h-6 flex-1 cursor-pointer bg-transparent p-0 after:absolute after:inset-x-0 after:top-1/2 after:-mt-[1.5px] after:h-[3px] after:bg-rule after:transition-colors hover:after:bg-mute aria-pressed:after:bg-accent pointer-coarse:h-11"
            :aria-pressed="i === index(project)"
            :aria-label="s.caption || s.alt"
            @click="cur[project.no] = i"
          ></button>
        </div>
        <p v-if="current(project) && current(project).caption" class="text-[.875rem] text-mute" aria-live="polite">{{ index(project) + 1 }}/{{ shots(project).length }} · {{ current(project).caption }}</p>

        <div v-if="ytId(project)" :class="videoBox">
          <iframe class="block size-full" v-if="playing[project.no]" :src="'https://www.youtube-nocookie.com/embed/' + ytId(project) + '?autoplay=1&rel=0'" :title="t().projects.video + ': ' + title(project)" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
          <button v-else type="button" class="group grid size-full cursor-pointer place-items-center bg-transparent bg-cover bg-center text-ink" :style="{ backgroundImage: project.poster ? 'url(' + project.poster + ')' : 'none' }" @click="playing[project.no] = true">
            <span class="border border-ink bg-wall px-[1.4rem] py-[.8rem] text-[.85rem] transition-colors duration-250 group-hover:bg-accent group-hover:text-accent-ink">▶ {{ t().projects.play }}</span>
          </button>
        </div>
        <video v-else-if="isFile(project)" :class="videoBox" controls preload="none" :poster="project.poster" :src="project.video" :aria-label="title(project)"></video>
      </div>

      <div class="grid min-w-0 gap-[.9rem] border-t border-ink pt-[1.1rem]" :class="{ 'max-w-160': !hasMedia(project) }">
        <h3 class="text-[clamp(1.7rem,2.8vw,2.3rem)] font-bold">{{ title(project) }}</h3>
        <p class="text-mute">{{ project.desc[state.lang] }}</p>
        <p v-if="project.stack.length" class="text-[.9rem] font-medium">{{ project.stack.join(' · ') }}</p>
        <ul v-if="project.highlights?.[state.lang]?.length" class="grid gap-[.3rem] pl-[1.1rem] text-mute marker:text-accent">
          <li v-for="h in project.highlights[state.lang]" :key="h">{{ h }}</li>
        </ul>
        <div v-if="hasLinks(project)" class="flex flex-wrap gap-3 pt-[.3rem]">
          <a v-if="project.live" class="btn text-[.95rem] normal-case tracking-normal" :href="project.live" target="_blank" rel="noopener">{{ t().projects.live }} ↗ <span class="sr-only">({{ t().projects.open }})</span></a>
          <a v-if="project.repo" class="btn text-[.95rem] normal-case tracking-normal" :href="project.repo" target="_blank" rel="noopener">{{ t().projects.repo }} ↗ <span class="sr-only">({{ t().projects.open }})</span></a>
          <a v-if="project.video && !ytId(project) && !isFile(project)" class="btn text-[.95rem] normal-case tracking-normal" :href="project.video" target="_blank" rel="noopener">{{ t().projects.video }} ↗ <span class="sr-only">({{ t().projects.open }})</span></a>
          <span v-if="project.privateRepo" class="self-center text-[.85rem] text-mute">{{ t().projects.onRequest }}</span>
        </div>
      </div>
    </article>
  </section>
</template>
