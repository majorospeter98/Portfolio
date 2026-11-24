// Real stack only: what Péter stated (Laravel, Inertia) plus the tools this site and project use.
export const tech = [
  { name: 'Laravel', area: 'backend' },
  { name: 'PHP', area: 'language' },
  { name: 'Inertia.js', area: 'frontend' },
  { name: 'Vue 3', area: 'frontend' },
  { name: 'Tailwind CSS', area: 'frontend' },
  { name: 'JavaScript', area: 'language' },
  { name: 'shadcn-vue', area: 'frontend' },
  { name: 'Vite', area: 'tooling' },
]

/*
 * Project schema. Fill a slot by setting `title` (and the rest); anything left out is hidden.
 *   title / desc : { hu, en }
 *   video : YouTube URL (plays inline on click, no load before) or .mp4/.webm path; poster : optional image path
 *   repo, live : URL strings (optional). Only existing links render. Add more projects by appending entries.
 *   privateRepo : true -> shows "code on request" instead of a repo link
 *   images : ['/projects/<file>.webp'] in /public/projects (optional; first one is the exhibit)
 * A slot with no title renders as "In preparation".
 */
export const projects = [
  {
    no: '001', kind: 'fullstack', year: '—', stack: ['Laravel', 'Inertia', 'Vue', 'Tailwind'],
    title: { hu: 'Football Webshop', en: 'Football Webshop' },
    desc: {
      hu: 'Full-stack e-commerce alkalmazás Laravel, Vue.js, Inertia.js és Tailwind CSS alapokon: kosár, hitelesítés, jogosultságkezelés és rendeléskezelés.',
      en: 'A full-stack e-commerce application built with Laravel, Vue.js, Inertia.js and Tailwind CSS: shopping cart, authentication, authorization and order management.',
    },
    repo: 'https://github.com/majorospeter98/E-commerce', live: '', video: '', privateRepo: false, images: [],
  },
  {
    no: '002', kind: 'frontend', year: '—', stack: [],
    title: { hu: 'Autóbérlő rendszer', en: 'Car Rental System' },
    desc: {
      hu: 'Foglalási alkalmazás dátum alapú bérléssel, űrlapokkal és admin felülettel a járművek és foglalások kezeléséhez.',
      en: 'A booking application with date-based rental, forms, and an admin panel for managing vehicles and bookings.',
    },
    repo: '', live: 'https://majorospeter98.github.io/carrental/', images: [],
  },
  {
    no: '003', kind: 'frontend', year: '—', stack: ['Vue', 'Tailwind', 'shadcn-vue'],
    title: { hu: 'Bevásárlólista', en: 'Shopping List' },
    desc: {
      hu: 'Vue.js alkalmazás Tailwind CSS-sel és shadcn-vue-val: tételkezelés és vásárlási státusz követése.',
      en: 'A Vue.js application built with Tailwind CSS and shadcn-vue: item management and purchase-status tracking.',
    },
    repo: '', live: 'https://cartvuewithshadcn.netlify.app/', images: [],
  },
]
