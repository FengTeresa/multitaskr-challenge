export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Challenge',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/_leadsIn.scss', '~/assets/scss/_defaultNavbar.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // Simple usage
    '@nuxtjs/moment',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/router',
  ],
  moment: {
    timezone: true,
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    [
      'bootstrap-vue/nuxt',
      {
        icons: true,
      },
    ],
    [
      'nuxt-i18n',
      {
        locales: ['en', 'es'],
        defaultLocale: 'es',
        vueI18n: {
          fallbackLocale: 'en',
          silentTranslationWarn: true,
          messages: {
            en: {
              welcome: 'Welcome!',
              dashboard: 'Dashboard',
              leadsIn: 'Leads In',
              newDeal: 'New deal',
              searchDealId: 'Search Deal ID',
              today: 'Today',
              yesterday: 'Yesterday',
              everythingElse: 'Everything else',
              taken: 'Taken',
              dealId: 'Deal ID',
              all: 'All',
              edit: 'Edit',
              remove: 'Remove',
              name: 'Name',
              email: 'Email',
              phone: 'Phone',
              verticals: 'Verticals',
              updated: 'Updated',
            },
            es: {
              welcome: '¡Bienvenido!',
            },
          },
        },
      },
    ],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
