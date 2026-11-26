<script setup lang="ts">
import { t } from '../i18n'
import { tech } from '../data'

// Brand marks from Simple Icons (CC0), recoloured with currentColor to follow the theme.
const raw = import.meta.glob<string>('../assets/tech/*.svg', { query: '?raw', import: 'default', eager: true })
const icon = (name: string) => {
  const s = raw[`../assets/tech/${name}.svg`] || ''
  return s
    .replace(/<title>.*?<\/title>/, '')
    .replace(/fill="#[0-9A-Fa-f]+"/, 'fill="currentColor"')
    .replace('<svg ', '<svg aria-hidden="true" focusable="false" ')
}
</script>

<template>
  <section id="tech" class="section" aria-labelledby="tech-h">
    <div class="border-t border-rule pt-8">
      <h2 id="tech-h">{{ t().tech.title }}</h2>
    </div>
    <div v-for="g in tech" :key="g.group" class="mt-8">
      <h3 class="text-[.875rem] font-medium uppercase tracking-[.06em] text-mute">{{ t().tech.groups[g.group] }}</h3>
      <ul class="mt-[.9rem] flex flex-wrap gap-3">
        <li v-for="x in g.items" :key="x.name" class="group inline-flex items-center gap-[.8rem] border border-rule bg-panel py-[.7rem] pl-[1.1rem] pr-[1.4rem] transition-[border-color,translate] duration-250 ease-out-expo hover:-translate-y-0.5 hover:border-accent motion-reduce:hover:translate-y-0">
          <span v-if="x.icon" class="block size-6 text-ink transition-colors duration-250 group-hover:text-accent [&_svg]:block [&_svg]:size-full" v-html="icon(x.icon)"></span>
          <span class="text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold leading-none tracking-[-.02em]">{{ x.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
