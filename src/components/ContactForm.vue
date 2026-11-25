<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import { t, EMAIL } from '../i18n'

// Web3Forms (web3forms.com). The access key is public by design: it only lets this site
// send messages to the inbox it was created for.
const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = '7e32befb-ca9d-4004-814d-90c0efa811d6'
const LIMITS = { name: 100, email: 120, message: 2000 }

type FieldName = keyof typeof LIMITS
type ErrorKey = '' | 'errName' | 'errEmail' | 'errMsg'
type Status = 'idle' | 'sending' | 'ok' | 'slow' | 'fail'

const f = reactive({ name: '', email: '', message: '', _gotcha: '' })
// store error *keys*, so the text follows the language toggle
const errors = reactive<Record<FieldName, ErrorKey>>({ name: '', email: '', message: '' })
const status = ref<Status>('idle')
const form = ref<HTMLFormElement | null>(null)

const rules: Record<FieldName, (v: string) => ErrorKey> = {
  name: (v) => (v.trim() ? '' : 'errName'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'errEmail'),
  message: (v) => (v.trim().length >= 10 ? '' : 'errMsg'),
}
const check = (k: FieldName) => (errors[k] = rules[k](f[k]))
const msg = (k: FieldName) => {
  const key = errors[k]
  return key ? t().contact[key] : ''
}

async function submit() {
  const bad = (Object.keys(rules) as FieldName[]).filter((k) => check(k))
  if (bad.length) {
    await nextTick()
    form.value?.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus()
    return
  }
  if (f._gotcha || status.value === 'sending') return
  status.value = 'sending'
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 20000)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: 'Üzenet a portfólióról – ' + f.name.trim(),
        from_name: 'Portfólió',
        name: f.name.trim(),
        email: f.email.trim(),
        message: f.message.trim(),
      }),
      signal: ctrl.signal,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.success) {
      console.error('Web3Forms:', res.status, data)
      throw new Error('send failed')
    }
    status.value = 'ok'
    f.name = f.email = f.message = ''
  } catch (e) {
    // a timeout does not prove the message was lost, so do not claim a failure
    status.value = e instanceof Error && e.name === 'AbortError' ? 'slow' : 'fail'
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
        <a class="mail" :href="'mailto:' + EMAIL">{{ EMAIL }}</a>
      </div>

      <form ref="form" novalidate @submit.prevent="submit">
        <p class="req">{{ t().contact.required }}</p>
        <div class="field">
          <label for="c-name">{{ t().contact.name }}</label>
          <input id="c-name" v-model="f.name" name="name" type="text" autocomplete="name" aria-required="true" :maxlength="LIMITS.name" :aria-invalid="!!errors.name" aria-describedby="e-name" @blur="check('name')" @input="errors.name && check('name')" />
          <p id="e-name" class="err" role="alert">{{ msg('name') }}</p>
        </div>
        <div class="field">
          <label for="c-email">{{ t().contact.email }}</label>
          <input id="c-email" v-model="f.email" name="email" type="email" autocomplete="email" aria-required="true" :maxlength="LIMITS.email" :aria-invalid="!!errors.email" aria-describedby="e-email" @blur="check('email')" @input="errors.email && check('email')" />
          <p id="e-email" class="err" role="alert">{{ msg('email') }}</p>
        </div>
        <div class="field">
          <label for="c-msg">{{ t().contact.message }}</label>
          <textarea id="c-msg" v-model="f.message" name="message" rows="5" aria-required="true" :maxlength="LIMITS.message" :aria-invalid="!!errors.message" aria-describedby="e-msg" @blur="check('message')" @input="errors.message && check('message')"></textarea>
          <p id="e-msg" class="err" role="alert">{{ msg('message') }}</p>
        </div>
        <input v-model="f._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true" />

        <button class="btn primary" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? t().contact.sending : t().contact.send }}
        </button>

        <p v-if="status === 'ok'" class="note" role="status">{{ t().contact.ok }}</p>
        <p v-if="status === 'slow'" class="note" role="status">{{ t().contact.slow }} <a :href="'mailto:' + EMAIL">{{ EMAIL }}</a></p>
        <p v-if="status === 'fail'" class="note" role="alert">{{ t().contact.fail }} <a :href="'mailto:' + EMAIL">{{ EMAIL }}</a></p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(2rem, 5vw, 5rem); border-top: 1px solid var(--rule); padding-top: 2rem; }
.intro { color: var(--mute); margin: 1rem 0 2rem; }
.mail { display: block; width: fit-content; margin-top: 1.5rem; font-size: .95rem; border-bottom: 1px solid var(--accent); padding-bottom: .15rem; overflow-wrap: anywhere; position: relative; }
.mail::before { content: ''; position: absolute; inset: -.6rem -.4rem; }
.mail:hover { color: var(--accent); }
form { display: grid; gap: 1.1rem; }
.field { display: grid; gap: .4rem; }
label { font-size: .85rem; color: var(--mute); }
input:not(.hp), textarea { width: 100%; background: var(--panel); color: var(--ink); border: 1px solid var(--rule); padding: .85rem 1rem; font: inherit; font-size: 1rem; border-radius: 0; transition: border-color .2s; resize: vertical; }
input:not(.hp):hover, textarea:hover { border-color: var(--mute); }
input:not(.hp):focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 28%, transparent); }
input[aria-invalid="true"], textarea[aria-invalid="true"] { border-color: var(--accent); }
.req { font-size: .85rem; color: var(--mute); }
.err { min-height: 1.2em; font-size: .85rem; color: var(--accent); }
.hp { position: absolute; left: -9999px; }
form .btn { justify-self: start; }
.note { font-size: .95rem; padding-top: .5rem; }
.note a { color: var(--accent); text-decoration: underline; text-underline-offset: .2em; }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
</style>
