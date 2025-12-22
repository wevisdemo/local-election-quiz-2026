const SUBPATH = 'fitcheckquiz'
const path = require('path')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '@wevisdemo/ui/styles/index.css'],
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  app: {
    baseURL: `/${SUBPATH}/`,
    head: {
      script: [
        {
          defer: true,
          'data-domain': 'wevis.info/fitcheckquiz',
          src: 'https://analytics.punchup.world/js/script.js',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/${SUBPATH}/favicon.ico`,
        },
      ],
    },
  },

  nitro: {
    output: {
      publicDir: path.join(__dirname, `.output/${SUBPATH}`),
    },
    hooks: {
      'prerender:routes'(routes) {
        for (let i = 0; i <= 10; i++) {
          const scoreId = i.toString().padStart(2, '0')
          routes.add(`/score_${scoreId}`)
        }
      },
    },
  },
})
