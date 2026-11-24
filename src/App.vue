<script setup>
import { t } from './i18n'
import SiteHeader from './components/SiteHeader.vue'
import Hero from './components/Hero.vue'
import Technologies from './components/Technologies.vue'
import Projects from './components/Projects.vue'
import ContactForm from './components/ContactForm.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a href="#main" class="skip">{{ t().skip }}</a>
  <SiteHeader />
  <main id="main">
    <Hero />
    <Projects />
    <Technologies />
    <ContactForm />
  </main>
  <SiteFooter />
</template>

<style>
.skip { position: absolute; left: 1rem; top: -4rem; background: var(--accent); color: var(--accent-ink); padding: .6rem 1rem; z-index: 50; }
.skip:focus { top: 1rem; }
</style>
