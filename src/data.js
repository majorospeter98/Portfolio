// Social links. A link with an empty url is not shown.
export const socials = [
  { label: 'GitHub', url: 'https://github.com/majorospeter98' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/majoros-peter/' },
]

// Péter's own stack list, in his order. A missing icon renders the name only.
export const tech = [
  { name: 'Vue.js', icon: 'vuedotjs' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'Pinia', icon: 'pinia' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'Inertia.js', icon: 'inertia' },
  { name: 'Vuetify', icon: 'vuetify' },
  { name: 'Bootstrap', icon: 'bootstrap' },
  { name: 'shadcn-vue', icon: 'shadcnui' },
  { name: 'SQLite', icon: 'sqlite' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Figma', icon: 'figma' },
  { name: 'Claude Code', icon: 'claude' },

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
    no: '1', kind: 'fullstack', year: '—', stack: ['Laravel', 'Inertia', 'Vue.js', 'Tailwind'],
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
    no: '2', kind: 'frontend', year: '—', stack: [],
    title: { hu: 'Autóbérlő rendszer', en: 'Car Rental System' },
    desc: {
      hu: 'Foglalási alkalmazás dátum alapú bérléssel, űrlapokkal és admin felülettel a járművek és foglalások kezeléséhez.',
      en: 'A booking application with date-based rental, forms, and an admin panel for managing vehicles and bookings.',
    },
    repo: '', live: 'https://majorospeter98.github.io/carrental/', images: [],
  },
  {
    no: '3', kind: 'frontend', year: '—', stack: ['Vue.js', 'Tailwind', 'shadcn-vue'],
    title: { hu: 'Bevásárlólista', en: 'Shopping List' },
    desc: {
      hu: 'Vue.js alkalmazás Tailwind CSS-sel és shadcn-vue-val: tételkezelés és vásárlási státusz követése.',
      en: 'A Vue.js application built with Tailwind CSS and shadcn-vue: item management and purchase-status tracking.',
    },
    repo: '', live: 'https://cartvuewithshadcn.netlify.app/', images: [],
  },
]
