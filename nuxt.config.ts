const BASE_URL = 'https://local-election-quiz-2026.pages.dev' // staging
// const BASE_URL = 'https://wevis.info/fitcheckquiz' // production

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
      baseUrl: BASE_URL,
    },
  },
  nitro: {
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
