<script setup lang="ts">
import { t } from './i18n'
import SiteHeader from './components/SiteHeader.vue'
import Hero from './components/Hero.vue'
import Technologies from './components/Technologies.vue'
import Projects from './components/Projects.vue'
import ContactForm from './components/ContactForm.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a href="#main" class="absolute -top-16 left-4 z-50 bg-accent px-4 py-[.6rem] text-accent-ink focus:top-4">{{ t().skip }}</a>
  <SiteHeader />
  <main id="main">
    <Hero />
    <Projects />
    <Technologies />
    <ContactForm />
  </main>
  <SiteFooter />
</template>
