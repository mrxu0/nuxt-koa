module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'stylesheet', href: '/simplemde/simplemde.min.css' },
      { rel: 'stylesheet', href: '/css/github-markdown.css' },
      { rel: 'stylesheet', href: '/css/font-awesome.min.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/simplemde/simplemde.min.js' }
    ]
  },
  /* router: {
    middleware: 'auth'
  }, */
  plugins: [
    { src: '~plugins/ElementUI', ssr: true },
    { src: '~plugins/Filter', ssr: true }
  ],
  /*
  ** Global CSS
  */
  css: ['~static/css/main.css', 'element-ui/lib/theme-chalk/index.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['element-ui'],
    loaders: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]

    /*
     ** Run ESLINT on save
     */
    /* extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    } */
  }
}
