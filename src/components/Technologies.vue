<script setup>
import { t } from '../i18n'
import { tech } from '../data'
</script>

<template>
  <section id="tech" class="section" aria-labelledby="tech-h">
    <div class="grid">
      <div>
        <h2 id="tech-h">{{ t().tech.title }}</h2>
        <p class="intro">{{ t().tech.intro }}</p>
      </div>
      <table class="cat mono">
        <thead>
          <tr><th scope="col">{{ t().tech.cols.no }}</th><th scope="col">{{ t().tech.cols.name }}</th><th scope="col">{{ t().tech.cols.area }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="(x, i) in tech" :key="x.name">
            <td>{{ String(i + 1).padStart(3, '0') }}</td>
            <th scope="row" class="nm">{{ x.name }}</th>
            <td>{{ t().tech.area[x.area] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(2rem, 5vw, 5rem); border-top: 1px solid var(--rule); padding-top: 2rem; }
.intro { color: var(--mute); margin-top: 1rem; }
.cat { width: 100%; border-collapse: collapse; font-size: .85rem; }
.cat th, .cat td { text-align: left; padding: .8rem 0; border-bottom: 1px solid var(--rule); font-weight: 400; }
.cat thead th { color: var(--mute); font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; }
.cat td:first-child, .cat thead th:first-child { width: 4.5rem; color: var(--mute); }
.cat td:last-child, .cat thead th:last-child { color: var(--mute); width: 10rem; }
.nm { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; letter-spacing: -.02em; color: var(--ink); transition: color .2s; }
.cat tbody tr:hover .nm { color: var(--accent); }
.cat tbody tr:hover td:first-child { color: var(--accent); }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
</style>
