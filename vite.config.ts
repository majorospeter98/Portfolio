import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Social crawlers need absolute URLs. Set VITE_SITE_URL (e.g. https://your-domain.com) in .env or on
// the host, and the canonical link, og:url and the preview image are added to the built page.
function socialUrls(siteUrl) {
  return {
    name: 'social-urls',
    transformIndexHtml() {
      if (!siteUrl) {
        console.warn('[social-urls] VITE_SITE_URL is not set: the build has no og:image, og:url or canonical link.')
        return []
      }
      const base = siteUrl.replace(/\/$/, '')
      const image = `${base}/og.png`
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: `${base}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${base}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
      ]
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return { plugins: [vue(), tailwindcss(), socialUrls(env.VITE_SITE_URL)] }
})
