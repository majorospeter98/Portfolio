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
 *   images : strings or { src, alt{hu,en}, caption{hu,en} } in /public/projects (first one is the exhibit)
 *   highlights : { hu: [], en: [] } optional list of confirmed backend facts
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
    repo: 'https://github.com/majorospeter98/E-commerce', live: '', video: '', privateRepo: false,
    images: [
      { src: '/projects/E-commerce/1.png', alt: { hu: 'A Football Webshop termékoldala mezekkel', en: 'Football Webshop product list with jerseys' }, caption: { hu: 'Termékek listája, szűrés csapat és márka szerint', en: 'Product list, filter by team and brand' } },
      { src: '/projects/E-commerce/2.png', alt: { hu: 'Real Madrid mez termékoldala', en: 'Real Madrid jersey product page' }, caption: { hu: 'Termékoldal méretválasztással és kosárba tétellel', en: 'Product page with size selection and add to cart' } },
      { src: '/projects/E-commerce/4.png', alt: { hu: 'A kosár két tétellel', en: 'Cart with two items' }, caption: { hu: 'Kosár mennyiségkezeléssel és rendelésösszesítővel', en: 'Cart with quantity controls and order summary' } },
      { src: '/projects/E-commerce/5.png', alt: { hu: 'Rendeléseim oldal', en: 'My orders page' }, caption: { hu: 'Leadott rendelések listája', en: 'List of placed orders' } },
      { src: '/projects/E-commerce/6.png', alt: { hu: 'Fiók áttekintő oldal', en: 'Account overview page' }, caption: { hu: 'Fiókoldal rendelésekkel és kedvencekkel', en: 'Account page with orders and favourites' } },
      { src: '/projects/E-commerce/3.png', alt: { hu: 'Bejelentkezési oldal', en: 'Login page' }, caption: { hu: 'Bejelentkezés és regisztráció', en: 'Login and registration' } },
    ],
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
