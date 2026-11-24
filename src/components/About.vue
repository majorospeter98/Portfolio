<script setup>
import { t } from '../i18n'
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-h">
    <div class="grid">
      <h2 id="about-h">{{ t().about.title }}</h2>
      <div class="body">
        <p class="lead">{{ t().about.p1 }}</p>
        <p class="mute">{{ t().about.p2 }}</p>
        <dl class="langs mono">
          <dt>{{ t().about.langs }}</dt>
          <dd><span>{{ t().about.hu }}</span><span>{{ t().about.huLevel }}</span></dd>
          <dd><span>{{ t().about.en }}</span><span>{{ t().about.enLevel }}</span></dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(2rem, 5vw, 5rem); border-top: 1px solid var(--rule); padding-top: 2rem; }
.lead { font-size: clamp(1.3rem, 2.2vw, 1.75rem); line-height: 1.35; letter-spacing: -.01em; }
.mute { color: var(--mute); margin-top: 1.25rem; }
.langs { margin: 2.5rem 0 0; font-size: .85rem; }
.langs dt { color: var(--mute); padding-bottom: .6rem; }
.langs dd { margin: 0; display: grid; grid-template-columns: 8rem 1fr; padding: .7rem 0; border-top: 1px solid var(--rule); }
.langs dd span:last-child { color: var(--mute); }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
</style>
