export type Lang = 'hu' | 'en'
export type Localized<T = string> = Record<Lang, T>

export interface Social {
  label: string
  url: string
}

export type TechGroup = 'frontend' | 'backend' | 'tools'

export interface TechItem {
  name: string
  icon?: string
}

export type ProjectImage = string | { src: string; alt?: Localized; caption?: Localized }

export interface Project {
  no: string
  stack: string[]
  title: Localized
  desc: Localized
  repo?: string
  live?: string
  video?: string
  poster?: string
  privateRepo?: boolean
  images?: ProjectImage[]
  highlights?: Localized<string[]>
}

// Social links. A link with an empty url is not shown.
export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/majorospeter98' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/majoros-peter/' },
]

// Péter's own stack list, grouped. A missing icon renders the name only.
export const tech: { group: TechGroup; items: TechItem[] }[] = [
  { group: 'frontend', items: [
    { name: 'Vue.js', icon: 'vuedotjs' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' },
    { name: 'Pinia', icon: 'pinia' },
    { name: 'Vuetify', icon: 'vuetify' },
    { name: 'Bootstrap', icon: 'bootstrap' },
    { name: 'shadcn-vue', icon: 'shadcnui' },
  ] },
  { group: 'backend', items: [
    { name: 'Laravel', icon: 'laravel' },
    { name: 'Inertia.js', icon: 'inertia' },
    { name: 'SQLite', icon: 'sqlite' },
  ] },
  { group: 'tools', items: [
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'Figma', icon: 'figma' },
    { name: 'Claude Code', icon: 'claude' },
  ] },
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
export const projects: Project[] = [
  {
    no: '1', stack: ['Vue.js', 'TypeScript', 'Laravel', 'Inertia.js', 'Tailwind CSS'],
    title: { hu: 'Football Webshop', en: 'Football Webshop' },
    desc: {
      hu: 'Full-stack e-commerce alkalmazás Laravel, Vue.js, Inertia.js és Tailwind CSS alapokon: kosár, hitelesítés, jogosultságkezelés és rendeléskezelés.',
      en: 'A full-stack e-commerce application built with Laravel, Vue.js, Inertia.js and Tailwind CSS: shopping cart, authentication, authorization and order management.',
    },
    repo: 'https://github.com/majorospeter98/E-commerce', live: 'https://e-commerce-2-1eru.onrender.com/',video: '', privateRepo: false,
    images: [
      { src: '/projects/E-commerce/1.webp', alt: { hu: 'A Football Webshop termékoldala mezekkel', en: 'Football Webshop product list with jerseys' }, caption: { hu: 'Termékek listája, szűrés csapat és márka szerint', en: 'Product list, filter by team and brand' } },
      { src: '/projects/E-commerce/2.webp', alt: { hu: 'Real Madrid mez termékoldala', en: 'Real Madrid jersey product page' }, caption: { hu: 'Termékoldal méretválasztással és kosárba tétellel', en: 'Product page with size selection and add to cart' } },
      { src: '/projects/E-commerce/4.webp', alt: { hu: 'A kosár két tétellel', en: 'Cart with two items' }, caption: { hu: 'Kosár mennyiségkezeléssel és rendelésösszesítővel', en: 'Cart with quantity controls and order summary' } },
      { src: '/projects/E-commerce/5.webp', alt: { hu: 'Rendeléseim oldal', en: 'My orders page' }, caption: { hu: 'Leadott rendelések listája', en: 'List of placed orders' } },
      { src: '/projects/E-commerce/6.webp', alt: { hu: 'Fiók áttekintő oldal', en: 'Account overview page' }, caption: { hu: 'Fiókoldal rendelésekkel és kedvencekkel', en: 'Account page with orders and favourites' } },
      { src: '/projects/E-commerce/3.webp', alt: { hu: 'Bejelentkezési oldal', en: 'Login page' }, caption: { hu: 'Bejelentkezés és regisztráció', en: 'Login and registration' } },
    ],
  },
  {
    no: '2', stack: ['Vue.js', 'TypeScript', 'Inertia.js', 'Laravel', 'Tailwind CSS'],
    title: { hu: 'Autóbérlő rendszer', en: 'Car Rental System' },
    desc: {
      hu: 'Foglalási alkalmazás dátum alapú bérléssel, űrlapokkal és admin felülettel a járművek és foglalások kezeléséhez.',
      en: 'A booking application with date-based rental, forms, and an admin panel for managing vehicles and bookings.',
    },
    repo: 'https://github.com/majorospeter98/carrental', live: 'https://carrental-1-n8b3.onrender.com/',
    images: [
      { src: '/projects/Rent/rent1.webp', alt: { hu: 'Autó kiválasztása bérlési időszakkal', en: 'Car selection with rental dates' }, caption: { hu: 'Szabad autók keresése dátum alapján, naptársávval', en: 'Finding available cars by date, with a calendar strip' } },
      { src: '/projects/Rent/rent2.webp', alt: { hu: 'Foglalási űrlap', en: 'Booking form' }, caption: { hu: 'Foglalási űrlap a végösszeggel', en: 'Booking form with the total price' } },
      { src: '/projects/Rent/rent3.webp', alt: { hu: 'Sikeres foglalás képernyő', en: 'Booking success screen' }, caption: { hu: 'Sikeres foglalás visszaigazolása', en: 'Booking confirmation' } },
      { src: '/projects/Rent/rent6.webp', alt: { hu: 'Admin foglaláslista', en: 'Admin booking list' }, caption: { hu: 'Admin: foglalások kezelése', en: 'Admin: managing bookings' } },
      { src: '/projects/Rent/rent5.webp', alt: { hu: 'Admin autólista', en: 'Admin car list' }, caption: { hu: 'Admin: autók és napi árak', en: 'Admin: cars and daily rates' } },
      { src: '/projects/Rent/rent7.webp', alt: { hu: 'Autó szerkesztése űrlap', en: 'Edit car form' }, caption: { hu: 'Admin: autó adatainak szerkesztése', en: 'Admin: editing a car' } },
      { src: '/projects/Rent/rent4.webp', alt: { hu: 'Admin bejelentkezési oldal', en: 'Admin login page' }, caption: { hu: 'Admin bejelentkezés demó adatokkal', en: 'Admin login with demo credentials' } },
    ],
  },
  {
    no: '4', stack: ['Vue.js', 'JavaScript', 'Pinia', 'Tailwind CSS', 'Figma'],
    title: { hu: 'Időnyilvántartó', en: 'Time Management' },
    desc: {
      hu: 'Figma terv alapján készült munkaidő-nyilvántartó alkalmazás bejelentkezéssel és regisztrációval: heti táblázat összesítéssel, új bejegyzés dátummal, óraszámmal és megjegyzéssel.',
      en: 'A time-tracking application built from a Figma design, with login and registration: a weekly table with totals, and new entries with a date, hours and a note.',
    },
    repo: 'https://github.com/majorospeter98/bluespot', live: 'https://bluespot.netlify.app/',
    images: [
      { src: '/projects/Time/time2.webp', alt: { hu: 'Heti időnyilvántartó táblázat', en: 'Weekly timesheet table' }, caption: { hu: 'Heti táblázat hétfőtől péntekig, összesítéssel', en: 'Weekly table, Monday to Friday, with a total' } },
      { src: '/projects/Time/time3.webp', alt: { hu: 'Új óra rögzítése felugró ablakban', en: 'Dialog for adding hours' }, caption: { hu: 'Új bejegyzés dátummal, óraszámmal és megjegyzéssel', en: 'New entry with date, hours and a note' } },
      { src: '/projects/Time/time1.webp', alt: { hu: 'Bejelentkezési oldal', en: 'Login page' }, caption: { hu: 'Bejelentkezés és regisztráció', en: 'Login and registration' } },
    ],
  },
  {
    no: '3', stack: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'Shadcn'],
    title: { hu: 'Bevásárlólista', en: 'Shopping List' },
    desc: {
      hu: 'Vue.js alkalmazás Tailwind CSS-sel és shadcn-vue-val: tételkezelés és vásárlási státusz követése.',
      en: 'A Vue.js application built with Tailwind CSS and shadcn-vue: item management and purchase-status tracking.',
    },
    repo: 'https://github.com/majorospeter98/OverCode', live: 'https://cartvuewithshadcn.netlify.app/',
    images: [
      { src: '/projects/Cart/cart1.webp', alt: { hu: 'Bevásárlólista megvásárolt tétellel', en: 'Shopping list with a purchased item' }, caption: { hu: 'Tételek listája, megvásárolt tétel áthúzva', en: 'Item list, purchased item struck through' } },
      { src: '/projects/Cart/cart2.webp', alt: { hu: 'Új termék hozzáadása felugró ablakban', en: 'Dialog for adding a product' }, caption: { hu: 'Új termék hozzáadása űrlap-ellenőrzéssel', en: 'Adding a product, with form validation' } },
    ],
  },
]
