<script setup>
import { t, EMAIL } from '../i18n'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <p class="mono">© {{ year }} Majoros Péter</p>
    <a class="mono" :href="'mailto:' + EMAIL">{{ EMAIL }}</a>
    <a class="mono" href="#top">{{ t().footer.back }} ↑</a>
  </footer>
</template>

<style scoped>
.foot { max-width: 90rem; margin: clamp(4.5rem, 10vw, 8rem) auto 0; padding: 1.5rem clamp(1.25rem, 4vw, 3rem) 2.5rem; border-top: 1px solid var(--rule); display: flex; flex-wrap: wrap; gap: 1rem 2.5rem; justify-content: space-between; font-size: .8rem; color: var(--mute); }
.foot a:hover { color: var(--accent); }
</style>
