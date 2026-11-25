import { reactive, watchEffect } from 'vue'
import type { Lang } from './data'

type Theme = 'dark' | 'light'

// only a known value is accepted, so a stale or edited entry cannot break the page
const saved = <T extends string>(k: string, allowed: readonly T[], d: T): T => {
  try {
    const v = localStorage.getItem(k)
    return allowed.find((a) => a === v) ?? d
  } catch { return d }
}

export const state = reactive({
  lang: saved<Lang>('lang', ['hu', 'en'], 'hu'),
  theme: saved<Theme>('theme', ['dark', 'light'], 'dark'),
})

const hu = {
  title: 'Majoros Péter – Portfólió',
  nav: { tech: 'Stack', projects: 'Projektek', contact: 'Kapcsolat' },
  toggleLang: 'English',
  toggleLangLabel: 'Váltás angol nyelvre',
  toggleTheme: { dark: 'Világos téma', light: 'Sötét téma' },
  toggleThemeLabel: { dark: 'Váltás világos témára', light: 'Váltás sötét témára' },
  skip: 'Ugrás a tartalomra',
  hero: {
    name: ['Majoros', 'Péter'],
    photoAlt: 'Majoros Péter portréfotója',
    cta: 'Üzenet küldése',
    projects: 'Projektek',
  },
  about: {
    p1: 'Frontend-heavy full-stack fejlesztő vagyok.',
    hu: 'Magyar', huLevel: 'anyanyelv',
    en: 'Angol', enLevel: 'középfok (B2)',
  },
  tech: {
    title: 'Stack',
    groups: { frontend: 'Frontend', backend: 'Backend', tools: 'Eszközök' },
  },
  projects: {
    title: 'Projektek',
    live: 'Élő demó', repo: 'Forráskód', video: 'Videó megtekintése', play: 'Bemutató lejátszása', onRequest: 'Forráskód kérésre', open: 'megnyitás új lapon',
  },
  contact: {
    title: 'Üzenet',
    intro: 'Írj egy rövid üzenetet, vagy küldj e-mailt közvetlenül.',
    required: 'Minden mező kötelező. Az üzenet legalább 10 karakter legyen.',
    name: 'Neved', email: 'E-mail-címed', message: 'Üzeneted',
    send: 'Üzenet küldése', sending: 'Küldés…',
    ok: 'Köszönöm, megkaptam az üzeneted. Hamarosan válaszolok.',
    errName: 'Add meg a neved.',
    errEmail: 'Adj meg érvényes e-mail-címet.',
    errMsg: 'Írj legalább 10 karaktert.',
    slow: 'A küldés a szokottnál tovább tart. Az üzenet valószínűleg megérkezik, ezért ne küldd el újra. Ha sürgős, írj erre a címre:',
    fail: 'Az üzenet nem ment el. Próbáld újra, vagy írj közvetlenül erre a címre:',
  },
  footer: { back: 'Vissza a tetejére', social: 'Közösségi profilok' },
}

const en: typeof hu = {
  title: 'Péter Majoros – Portfolio',
  nav: { tech: 'Stack', projects: 'Projects', contact: 'Contact' },
  toggleLang: 'Magyar',
  toggleLangLabel: 'Switch to Hungarian',
  toggleTheme: { dark: 'Light theme', light: 'Dark theme' },
  toggleThemeLabel: { dark: 'Switch to light theme', light: 'Switch to dark theme' },
  skip: 'Skip to content',
  hero: {
    name: ['Péter', 'Majoros'],
    photoAlt: 'Portrait photo of Péter Majoros',
    cta: 'Send a message',
    projects: 'Projects',
  },
  about: {
    p1: 'I am a frontend-heavy full-stack developer.',
    hu: 'Hungarian', huLevel: 'native',
    en: 'English', enLevel: 'intermediate (B2)',
  },
  tech: {
    title: 'Stack',
    groups: { frontend: 'Frontend', backend: 'Backend', tools: 'Tools' },
  },
  projects: {
    title: 'Projects',
    live: 'Live demo', repo: 'Source code', video: 'Watch video', play: 'Play walkthrough', onRequest: 'Code on request', open: 'opens in a new tab',
  },
  contact: {
    title: 'Message',
    intro: 'Write a short message, or email me directly.',
    required: 'All fields are required. The message needs at least 10 characters.',
    name: 'Your name', email: 'Your email', message: 'Your message',
    send: 'Send a message', sending: 'Sending…',
    ok: 'Thank you, I received your message. I will reply soon.',
    errName: 'Enter your name.',
    errEmail: 'Enter a valid email address.',
    errMsg: 'Write at least 10 characters.',
    slow: 'Sending is taking longer than usual. Your message will probably still arrive, so please do not send it again. If it is urgent, write to:',
    fail: 'The message did not go through. Try again, or write directly to:',
  },
  footer: { back: 'Back to top', social: 'Social profiles' },
}

const dict: Record<Lang, typeof hu> = { hu, en }

export const t = () => dict[state.lang]
export const EMAIL = 'majoros.peter988@gmail.com'

watchEffect(() => {
  document.documentElement.lang = state.lang
  document.documentElement.dataset.theme = state.theme
  document.title = dict[state.lang].title
  try {
    localStorage.setItem('lang', state.lang)
    localStorage.setItem('theme', state.theme)
  } catch {}
})
