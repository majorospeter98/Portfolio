<script setup lang="ts">
import { t } from '../i18n'
import { socials } from '../data'

const year = new Date().getFullYear()
const links = socials.filter((s) => s.url)
// invisible hit area: the visible link stays small, the target reaches 44px
const hit = 'relative hover:text-accent before:absolute before:-inset-x-2 before:-inset-y-[.65rem]'
</script>

<template>
  <footer class="mx-auto mt-[clamp(4.5rem,10vw,8rem)] flex max-w-360 flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-rule px-[clamp(1.25rem,4vw,3rem)] pt-6 pb-10 text-[.875rem] text-mute">
    <p>© {{ year }} Majoros Péter</p>
    <ul v-if="links.length" class="flex gap-7" :aria-label="t().footer.social">
      <li v-for="s in links" :key="s.label">
        <a :href="s.url" target="_blank" rel="noopener" :class="hit" class="border-b border-rule pb-[.15rem] text-ink transition-colors hover:border-accent">{{ s.label }} ↗ <span class="sr-only">({{ t().projects.open }})</span></a>
      </li>
    </ul>
    <a href="#top" :class="hit">{{ t().footer.back }} ↑</a>
  </footer>
</template>
