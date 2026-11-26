<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="top" class="relative mx-auto grid max-w-360 grid-cols-[minmax(0,7fr)_minmax(0,4fr)] items-end gap-[clamp(2rem,5vw,5rem)] px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(3rem,8vw,7rem)] narrow:grid-cols-1 narrow:items-start" aria-labelledby="name">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-120 bg-[linear-gradient(180deg,rgba(var(--spot),calc(var(--spot-a)*.55)),transparent_75%)]" aria-hidden="true"></div>

    <div class="relative flex flex-col items-start">
      <h1 id="name" class="mb-8 animate-hang text-[clamp(3.4rem,10vw,6rem)] font-extrabold leading-[.95] tracking-[-.035em] motion-reduce:animate-none">
        <span class="block">{{ t().hero.name[0] }}</span>
        <span class="block">{{ t().hero.name[1] }}</span>
      </h1>
      <p class="animate-hang text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.45] text-ink [animation-delay:110ms] motion-reduce:animate-none">{{ t().about.p1 }}</p>
      <div class="mt-8 flex animate-hang flex-wrap gap-3 [animation-delay:220ms] motion-reduce:animate-none">
        <a class="btn btn-primary min-h-11" href="#contact">{{ t().hero.cta }}</a>
        <a class="btn min-h-11" href="#projects">{{ t().hero.projects }}</a>
      </div>
      <p class="mt-6 animate-hang text-[.875rem] text-mute [animation-delay:330ms] motion-reduce:animate-none">{{ t().about.hu }}: {{ t().about.huLevel }} · {{ t().about.en }}: {{ t().about.enLevel }}</p>
    </div>

    <!-- the portrait hangs in a mat; greyscale until hovered so it sits in the palette -->
    <div class="group relative w-[min(100%,20rem)] animate-hang justify-self-end border border-rule bg-panel p-[.9rem] [animation-delay:220ms] motion-reduce:animate-none narrow:w-[min(100%,15rem)] narrow:justify-self-start">
      <img
        src="/projects/profile.webp"
        :alt="t().hero.photoAlt"
        width="460"
        height="460"
        fetchpriority="high"
        decoding="async"
        class="block aspect-square h-auto w-full object-cover object-[50%_30%] [filter:grayscale(1)_contrast(1.06)_brightness(.94)] transition-[filter] duration-500 ease-out-expo group-hover:[filter:none] motion-reduce:transition-none"
      />
    </div>
  </section>
</template>
