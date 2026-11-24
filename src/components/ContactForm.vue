<script setup>
import { reactive, ref } from 'vue'
import { t, EMAIL } from '../i18n'

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID
const f = reactive({ name: '', email: '', message: '', _gotcha: '' })
const errors = reactive({ name: '', email: '', message: '' })
const status = ref('idle') // idle | sending | ok | fail | noid

function validate() {
  errors.name = f.name.trim() ? '' : t().contact.errName
  errors.email = /^\S+@\S+\.\S+$/.test(f.email) ? '' : t().contact.errEmail
  errors.message = f.message.trim().length >= 5 ? '' : t().contact.errMsg
  return !errors.name && !errors.email && !errors.message
}

async function submit() {
  if (!validate()) return
  if (f._gotcha) return
  if (!FORM_ID) { status.value = 'noid'; return }
  status.value = 'sending'
  try {
    const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: f.name, email: f.email, message: f.message }),
    })
    if (!res.ok) throw new Error('bad status')
    status.value = 'ok'
    f.name = f.email = f.message = ''
  } catch {
    status.value = 'fail'
  }
}
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-h">
    <div class="grid">
      <div>
        <h2 id="contact-h">{{ t().contact.title }}</h2>
        <p class="intro">{{ t().contact.intro }}</p>
        <a class="mail mono" :href="'mailto:' + EMAIL">{{ EMAIL }}</a>
      </div>

      <form novalidate @submit.prevent="submit">
        <div class="field">
          <label for="c-name">{{ t().contact.name }}</label>
          <input id="c-name" v-model="f.name" type="text" autocomplete="name" :aria-invalid="!!errors.name" aria-describedby="e-name" />
          <p id="e-name" class="err" role="alert">{{ errors.name }}</p>
        </div>
        <div class="field">
          <label for="c-email">{{ t().contact.email }}</label>
          <input id="c-email" v-model="f.email" type="email" autocomplete="email" :aria-invalid="!!errors.email" aria-describedby="e-email" />
          <p id="e-email" class="err" role="alert">{{ errors.email }}</p>
        </div>
        <div class="field">
          <label for="c-msg">{{ t().contact.message }}</label>
          <textarea id="c-msg" v-model="f.message" rows="5" :aria-invalid="!!errors.message" aria-describedby="e-msg"></textarea>
          <p id="e-msg" class="err" role="alert">{{ errors.message }}</p>
        </div>
        <input v-model="f._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true" />

        <button class="btn" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? t().contact.sending : t().contact.send }}
        </button>

        <p v-if="status === 'ok'" class="note ok" role="status">{{ t().contact.ok }}</p>
        <p v-if="status === 'fail'" class="note bad" role="alert">{{ t().contact.fail }} <a :href="'mailto:' + EMAIL">{{ EMAIL }}</a></p>
        <p v-if="status === 'noid'" class="note bad" role="alert">{{ t().contact.noId }} <a :href="'mailto:' + EMAIL">{{ EMAIL }}</a></p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(2rem, 5vw, 5rem); border-top: 1px solid var(--rule); padding-top: 2rem; }
.intro { color: var(--mute); margin: 1rem 0 2rem; }
.mail { display: inline-block; font-size: .95rem; border-bottom: 1px solid var(--accent); padding-bottom: .15rem; word-break: break-all; }
.mail:hover { color: var(--accent); }
form { display: grid; gap: 1.1rem; }
.field { display: grid; gap: .4rem; }
label { font-size: .85rem; color: var(--mute); }
input:not(.hp), textarea { width: 100%; background: var(--panel); color: var(--ink); border: 1px solid var(--rule); padding: .85rem 1rem; font: inherit; border-radius: 0; transition: border-color .2s; resize: vertical; }
input:not(.hp):hover, textarea:hover { border-color: var(--mute); }
input:not(.hp):focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 28%, transparent); }
input[aria-invalid="true"], textarea[aria-invalid="true"] { border-color: var(--accent); }
.err { min-height: 1.2em; font-size: .8rem; color: var(--accent); }
.hp { position: absolute; left: -9999px; }
form .btn { justify-self: start; }
.note { font-size: .95rem; padding-top: .5rem; }
.ok { color: var(--ink); }
.bad a { color: var(--accent); text-decoration: underline; text-underline-offset: .2em; }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
</style>
