<script setup lang="ts">
import { state, t } from '../i18n'
const links = ['projects', 'tech', 'contact'] as const
const toggleLang = () => (state.lang = state.lang === 'hu' ? 'en' : 'hu')
const toggleTheme = () => (state.theme = state.theme === 'dark' ? 'light' : 'dark')

// 44px hit areas wherever a finger may be the pointer
const chip = 'cursor-pointer border border-rule bg-transparent px-3 py-[.4rem] text-[.875rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent pointer-coarse:min-h-11 pointer-coarse:px-4 narrow:min-h-11 narrow:px-4'
</script>

<template>
  <header class="sticky top-0 z-20 flex h-17 items-center gap-6 border-b border-rule bg-wall px-[clamp(1.25rem,4vw,3rem)] narrow:h-auto narrow:flex-wrap narrow:gap-x-3 narrow:gap-y-2 narrow:py-[.6rem]">
    <nav aria-label="Main" class="ml-auto flex gap-8 text-[.95rem] text-mute narrow:order-3 narrow:w-full narrow:gap-6 narrow:pb-[.2rem] narrow:text-[.9rem]">
      <a v-for="l in links" :key="l" :href="'#' + l" class="border-b border-transparent py-[.4rem] transition-colors hover:border-accent hover:text-ink narrow:py-[.65rem]">{{ t().nav[l] }}</a>
    </nav>
    <div class="flex gap-2">
      <button :class="chip" type="button" :aria-label="t().toggleLangLabel" @click="toggleLang">{{ t().toggleLang }}</button>
      <button :class="chip" type="button" :aria-label="t().toggleThemeLabel[state.theme]" @click="toggleTheme">{{ t().toggleTheme[state.theme] }}</button>
    </div>
  </header>
</template>
