<script setup>
import { state, t } from '../i18n'
const links = ['projects', 'tech', 'contact']
const toggleLang = () => (state.lang = state.lang === 'hu' ? 'en' : 'hu')
const toggleTheme = () => (state.theme = state.theme === 'dark' ? 'light' : 'dark')
</script>

<template>
  <header class="head">
    <a href="#top" class="brand">Majoros Péter</a>
    <nav aria-label="Main" class="nav">
      <a v-for="l in links" :key="l" :href="'#' + l">{{ t().nav[l] }}</a>
    </nav>
    <div class="tools">
      <button class="chip mono" type="button" :aria-label="t().toggleLangLabel" @click="toggleLang">{{ t().toggleLang }}</button>
      <button class="chip mono" type="button" @click="toggleTheme">{{ t().toggleTheme[state.theme] }}</button>
    </div>
  </header>
</template>

<style scoped>
.head { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 1.5rem; height: 4.25rem; padding: 0 clamp(1.25rem, 4vw, 3rem); background: var(--wall); border-bottom: 1px solid var(--rule); }
.brand { font-weight: 700; letter-spacing: -.01em; margin-right: auto; }
.nav { display: flex; gap: 2rem; font-size: .95rem; color: var(--mute); }
.nav a { padding: .4rem 0; border-bottom: 1px solid transparent; transition: color .2s, border-color .2s; }
.nav a:hover { color: var(--ink); border-color: var(--accent); }
.tools { display: flex; gap: .5rem; }
.chip { border: 1px solid var(--rule); color: var(--ink); padding: .4rem .75rem; font-size: .75rem; background: transparent; cursor: pointer; transition: border-color .2s, color .2s; }
.chip:hover { border-color: var(--accent); color: var(--accent); }
@media (max-width: 860px) { .nav { display: none; } .head { gap: .75rem; } }
</style>
