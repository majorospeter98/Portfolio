<script setup>
import { reactive, ref, nextTick } from 'vue'
import { t, EMAIL } from '../i18n'

// FormSubmit (formsubmit.co): no account; the first message triggers a one-time activation email.
const ENDPOINT = 'https://formsubmit.co/ajax/' + EMAIL
const LIMITS = { name: 100, email: 120, message: 2000 }

const f = reactive({ name: '', email: '', message: '', _gotcha: '' })
// store error *keys*, so the text follows the language toggle
const errors = reactive({ name: '', email: '', message: '' })
const status = ref('idle') // idle | sending | ok | fail
const form = ref(null)

const rules = {
  name: (v) => (v.trim() ? '' : 'errName'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'errEmail'),
  message: (v) => (v.trim().length >= 10 ? '' : 'errMsg'),
}
const check = (k) => (errors[k] = rules[k](f[k]))
const msg = (k) => (errors[k] ? t().contact[errors[k]] : '')

async function submit() {
  const bad = Object.keys(rules).filter((k) => check(k))
  if (bad.length) {
    await nextTick()
    form.value?.querySelector(`[name="${bad[0]}"]`)?.focus()
    return
  }
  if (f._gotcha || status.value === 'sending') return
  status.value = 'sending'
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 12000)
  try {
    const body = new FormData()
    body.append('name', f.name.trim())
    body.append('email', f.email.trim())
    body.append('message', f.message.trim())
    body.append('_subject', 'Üzenet a portfólióról – ' + f.name.trim())
    body.append('_template', 'table')
    body.append('_captcha', 'false')
    const res = await fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body, signal: ctrl.signal })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.success === 'false' || data.success === false) {
      console.error('FormSubmit:', res.status, data)
      throw new Error('send failed')
    }
    status.value = 'ok'
    f.name = f.email = f.message = ''
  } catch {
    status.value = 'fail'
  } finally {
    clearTimeout(timer)
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

      <form ref="form" novalidate @submit.prevent="submit">
        <div class="field">
          <label for="c-name">{{ t().contact.name }}</label>
          <input id="c-name" v-model="f.name" name="name" type="text" autocomplete="name" :maxlength="LIMITS.name" :aria-invalid="!!errors.name" aria-describedby="e-name" @blur="check('name')" @input="errors.name && check('name')" />
          <p id="e-name" class="err" role="alert">{{ msg('name') }}</p>
        </div>
        <div class="field">
          <label for="c-email">{{ t().contact.email }}</label>
          <input id="c-email" v-model="f.email" name="email" type="email" autocomplete="email" :maxlength="LIMITS.email" :aria-invalid="!!errors.email" aria-describedby="e-email" @blur="check('email')" @input="errors.email && check('email')" />
          <p id="e-email" class="err" role="alert">{{ msg('email') }}</p>
        </div>
        <div class="field">
          <label for="c-msg">{{ t().contact.message }}</label>
          <textarea id="c-msg" v-model="f.message" name="message" rows="5" :maxlength="LIMITS.message" :aria-invalid="!!errors.message" aria-describedby="e-msg" @blur="check('message')" @input="errors.message && check('message')"></textarea>
          <p id="e-msg" class="err" role="alert">{{ msg('message') }}</p>
        </div>
        <input v-model="f._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true" />

        <button class="btn primary" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? t().contact.sending : t().contact.send }}
        </button>

        <p v-if="status === 'ok'" class="note ok" role="status">{{ t().contact.ok }}</p>
        <p v-if="status === 'fail'" class="note bad" role="alert">{{ t().contact.fail }} <a :href="'mailto:' + EMAIL">{{ EMAIL }}</a></p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(2rem, 5vw, 5rem); border-top: 1px solid var(--rule); padding-top: 2rem; }
.intro { color: var(--mute); margin: 1rem 0 2rem; }
.mail { display: block; width: fit-content; margin-top: 1.5rem; font-size: .95rem; border-bottom: 1px solid var(--accent); padding-bottom: .15rem; overflow-wrap: anywhere; }
.btn + .mail { margin-top: 1.25rem; }
.mail:hover { color: var(--accent); }
form { display: grid; gap: 1.1rem; }
.field { display: grid; gap: .4rem; }
label { font-size: .85rem; color: var(--mute); }
input:not(.hp), textarea { width: 100%; background: var(--panel); color: var(--ink); border: 1px solid var(--rule); padding: .85rem 1rem; font: inherit; font-size: 1rem; border-radius: 0; transition: border-color .2s; resize: vertical; }
input:not(.hp):hover, textarea:hover { border-color: var(--mute); }
input:not(.hp):focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 28%, transparent); }
input[aria-invalid="true"], textarea[aria-invalid="true"] { border-color: var(--accent); }
.err { min-height: 1.2em; font-size: .85rem; color: var(--accent); }
.hp { position: absolute; left: -9999px; }
form .btn { justify-self: start; }
.note { font-size: .95rem; padding-top: .5rem; }
.note a { color: var(--accent); text-decoration: underline; text-underline-offset: .2em; }
.bad a { color: var(--accent); text-decoration: underline; text-underline-offset: .2em; }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
</style>
