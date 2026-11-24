import { reactive, watchEffect } from 'vue'

const saved = (k, d) => {
  try { return localStorage.getItem(k) || d } catch { return d }
}

export const state = reactive({ lang: saved('lang', 'hu'), theme: saved('theme', 'dark') })

export const dict = {
  hu: {
    title: 'Majoros Péter – Portfólió',
    nav: { about: 'Rólam', tech: 'Technológiák', projects: 'Projektek', contact: 'Kapcsolat' },
    toggleLang: 'English',
    toggleLangLabel: 'Váltás angol nyelvre',
    toggleTheme: { dark: 'Világos téma', light: 'Sötét téma' },
    skip: 'Ugrás a tartalomra',
    hero: {
      name: ['Majoros', 'Péter'],
      wall: 'Frontend-orientált full-stack fejlesztő. Laravel, Inertia, Vue.',
      cta: 'Üzenet küldése',
      onView: 'Kiállítva',
      prep: 'Előkészületben',
      catalogue: 'Katalógus',
    },
    about: {
      title: 'Rólam',
      p1: 'Frontend-orientált full-stack fejlesztő vagyok. Egy teljes értékű full-stack projektet építettem Laravel és Inertia alapokon, és a felhasználói felület az, ahol a legszívesebben dolgozom.',
      p2: 'Keresem a következő csapatot, ahol a felületi munkámat a szerveroldali tudásommal együtt tudom fejleszteni.',
      langs: 'Nyelvek',
      hu: 'Magyar', huLevel: 'anyanyelv',
      en: 'Angol', enLevel: 'középfok (B2)',
    },
    tech: {
      title: 'Technológiák',
      intro: 'Amivel dolgozom, terület szerint.',
      cols: { no: 'Sz.', name: 'Név', area: 'Terület' },
      area: { backend: 'Szerveroldal', frontend: 'Kliensoldal', tooling: 'Eszköz', language: 'Nyelv' },
    },
    projects: {
      title: 'Projektek',
      intro: 'Egyelőre egy teljes projekt. A többi hely üres, nem kitalált munkával töltöm ki.',
      cols: { no: 'Sz.', title: 'Cím', year: 'Év', stack: 'Stack' },
      p1: {
        title: 'Laravel + Inertia alkalmazás',
        desc: 'Full-stack webalkalmazás Laravel háttérrel és Inertia–Vue felülettel. A pontos cím, leírás és link hamarosan.',
        note: 'Helyőrző – a valós adatok jönnek',
      },
      empty: 'Előkészületben',
      link: 'Link hamarosan',
      live: 'Élő demó', repo: 'Forráskód', video: 'Videó megtekintése', play: 'Bemutató lejátszása', onRequest: 'Forráskód kérésre', open: 'megnyitás új lapon',
    },
    contact: {
      title: 'Üzenet',
      intro: 'Írj egy rövid üzenetet, vagy küldj e-mailt közvetlenül.',
      name: 'Neved', email: 'E-mail-címed', message: 'Üzeneted',
      send: 'Küldés', sending: 'Küldés…',
      ok: 'Köszönöm, megkaptam az üzeneted. Hamarosan válaszolok.',
      errName: 'Add meg a neved.',
      errEmail: 'Adj meg érvényes e-mail-címet.',
      errMsg: 'Írj legalább néhány szót.',
      fail: 'Az üzenet nem ment el. Próbáld újra, vagy írj közvetlenül erre a címre:',
      noId: 'Az űrlap még nincs bekötve. Írj közvetlenül erre a címre:',
    },
    footer: { back: 'Vissza a tetejére' },
  },
  en: {
    title: 'Péter Majoros – Portfolio',
    nav: { about: 'About', tech: 'Technologies', projects: 'Projects', contact: 'Contact' },
    toggleLang: 'Magyar',
    toggleLangLabel: 'Switch to Hungarian',
    toggleTheme: { dark: 'Light theme', light: 'Dark theme' },
    skip: 'Skip to content',
    hero: {
      name: ['Péter', 'Majoros'],
      wall: 'Frontend-leaning full-stack developer. Laravel, Inertia, Vue.',
      cta: 'Send a message',
      onView: 'On view',
      prep: 'In preparation',
      catalogue: 'Catalogue',
    },
    about: {
      title: 'About',
      p1: 'I am a frontend-leaning full-stack developer. I built a complete full-stack project on Laravel and Inertia, and the user interface is where I most like to work.',
      p2: 'I am looking for my next team, where I can grow my interface work together with my server-side knowledge.',
      langs: 'Languages',
      hu: 'Hungarian', huLevel: 'native',
      en: 'English', enLevel: 'intermediate (B2)',
    },
    tech: {
      title: 'Technologies',
      intro: 'What I work with, by area.',
      cols: { no: 'No.', name: 'Name', area: 'Area' },
      area: { backend: 'Server side', frontend: 'Client side', tooling: 'Tooling', language: 'Language' },
    },
    projects: {
      title: 'Projects',
      intro: 'One complete project for now. The other slots stay empty rather than filled with invented work.',
      cols: { no: 'No.', title: 'Title', year: 'Year', stack: 'Stack' },
      p1: {
        title: 'Laravel + Inertia application',
        desc: 'A full-stack web application with a Laravel back end and an Inertia–Vue interface. Exact title, description and link coming.',
        note: 'Placeholder – real details to follow',
      },
      empty: 'In preparation',
      link: 'Link coming soon',
      live: 'Live demo', repo: 'Source code', video: 'Watch video', play: 'Play walkthrough', onRequest: 'Code on request', open: 'opens in a new tab',
    },
    contact: {
      title: 'Message',
      intro: 'Write a short message, or email me directly.',
      name: 'Your name', email: 'Your email', message: 'Your message',
      send: 'Send', sending: 'Sending…',
      ok: 'Thank you, I received your message. I will reply soon.',
      errName: 'Enter your name.',
      errEmail: 'Enter a valid email address.',
      errMsg: 'Write at least a few words.',
      fail: 'The message did not go through. Try again, or write directly to:',
      noId: 'The form is not connected yet. Write directly to:',
    },
    footer: { back: 'Back to top' },
  },
}

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
