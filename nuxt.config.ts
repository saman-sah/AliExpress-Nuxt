// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  router: {
    middleware: ['auth']
  },
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/css/main.sass'],
  modules: [
    'nuxt-icon',
    'nuxt-lodash',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  runtimeConfig: {
    public: {
      stripePK: process.env.STRIPE_PK_KEY
    }
  },
  app: {
    head: {
      script: [
        {
          src: 'https://js.stripe.com/v3/',
          defer: true
        }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
