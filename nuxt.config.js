
module.exports = {
  target: 'server',
  
  

  head: {
   
    title: 'PelisFlix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  
    link: [
      { rel: 'icon', href: '/favicon.png' }, 
      { rel: 'stylesheet', href: '/css/swiper.css' },
      { rel: 'stylesheet', href: '/css/main.css' },
      { rel: 'stylesheet', href: '/css/yds.min.css' },
      { rel: 'stylesheet', href: '/css/yds-theme.min.css' },
      { rel: 'stylesheet', href: '/css/icon.min.css' },
    ]
  },


  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      
    }
  }, 
  modules: [
    '@nuxtjs/axios', 
    'vue-sweetalert2/nuxt',
    'vue-scrollto/nuxt',
    '@pi0/nuxt-cache'
  ], 

  plugins: [
    { src: '~/plugins/VuSkeletonLoading.js', mode: 'client' }, // only on client side
    { src: '~/plugins/Vunotification.js', mode: 'client' }, // only on client side
    { src: '~/plugins/emojivue.js',  mode: 'client' }, // only on client 
    { src: '~/plugins/dropdownvue.js', mode: 'client'  }, // only on client 
    { src: '~/plugins/vue-range-component.js', mode: 'client'  }, // only on client 
    { src: '~/plugins/vueeditor.js', mode: 'client'  }, // only on client 
    { src: '~/plugins/mixins.js' }, // only on client 
  ]

  
}

