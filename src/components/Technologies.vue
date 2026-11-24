<script setup>
import { t } from '../i18n'
import { tech } from '../data'

// Brand marks from Simple Icons (CC0), recoloured with currentColor to follow the theme.
const raw = import.meta.glob('../assets/tech/*.svg', { query: '?raw', import: 'default', eager: true })
const icon = (name) => {
  const s = raw[`../assets/tech/${name}.svg`] || ''
  return s
    .replace(/<title>.*?<\/title>/, '')
    .replace(/fill="#[0-9A-Fa-f]+"/, 'fill="currentColor"')
    .replace('<svg ', '<svg aria-hidden="true" focusable="false" ')
}
</script>

<template>
  <section id="tech" class="section" aria-labelledby="tech-h">
    <div class="head">
      <h2 id="tech-h">{{ t().tech.title }}</h2>
    </div>
    <ul class="pills">
      <li v-for="x in tech" :key="x.name" class="pill">
        <span v-if="x.icon" class="ic" v-html="icon(x.icon)"></span>
        <span class="nm">{{ x.name }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.head { border-top: 1px solid var(--rule); padding-top: 2rem; }
.pills { list-style: none; margin: 2rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: .75rem; }
.pill { display: inline-flex; align-items: center; gap: .8rem; border: 1px solid var(--rule); background: var(--panel); border-radius: 999px; padding: .7rem 1.4rem .7rem 1.1rem; transition: border-color .25s, transform .25s cubic-bezier(.16, 1, .3, 1); }
.pill:hover { border-color: var(--accent); transform: translateY(-2px); }
.ic { display: block; width: 1.5rem; height: 1.5rem; color: var(--ink); transition: color .25s; }
.ic :deep(svg) { display: block; width: 100%; height: 100%; }
.pill:hover .ic { color: var(--accent); }
.nm { font-size: clamp(1.05rem, 1.6vw, 1.35rem); font-weight: 600; letter-spacing: -.02em; line-height: 1; }
@media (prefers-reduced-motion: reduce) { .pill:hover { transform: none; } }
</style>
