<script setup lang="ts">
import { t } from '../i18n'
import { socials } from '../data'

const year = new Date().getFullYear()
const links = socials.filter((s) => s.url)
</script>

<template>
  <footer class="foot">
    <p>© {{ year }} Majoros Péter</p>
    <ul v-if="links.length" class="social" :aria-label="t().footer.social">
      <li v-for="s in links" :key="s.label">
        <a :href="s.url" target="_blank" rel="noopener">{{ s.label }} ↗ <span class="sr">({{ t().projects.open }})</span></a>
      </li>
    </ul>
    <a href="#top">{{ t().footer.back }} ↑</a>
  </footer>
</template>

<style scoped>
.foot { max-width: 90rem; margin: clamp(4.5rem, 10vw, 8rem) auto 0; padding: 1.5rem clamp(1.25rem, 4vw, 3rem) 2.5rem; border-top: 1px solid var(--rule); display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem 2.5rem; justify-content: space-between; font-size: .875rem; color: var(--mute); }
.foot a { position: relative; }
/* invisible hit area: the visible link stays small, the target reaches 44px */
.foot a::before { content: ''; position: absolute; inset: -.65rem -.5rem; }
.social { list-style: none; margin: 0; padding: 0; display: flex; gap: 1.75rem; }
.social a { color: var(--ink); border-bottom: 1px solid var(--rule); padding-bottom: .15rem; transition: color .2s, border-color .2s; }
.foot a:hover { color: var(--accent); }
.social a:hover { border-color: var(--accent); }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
