import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import R from 'ramda'
import { resolve } from 'path'

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env === 'production')

const r = path => resolve(__dirname, path)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8088
const MIDDLEWARE = ['general', 'database', 'router']

class Server {
  constructor() {
    this.app = new Koa();
    this.useMiddlewares(this.app)(MIDDLEWARE);
  }
  useMiddlewares(app) {
    // map：数组的每个成员依次执行某个函数。
    // compose：将多个函数合并成一个函数，从右到左执行。
    return R.map(R.compose(
      R.map(i => i(app)), // 调用中间件的方法，并且将 app 作为参数传入
      require, // 将中间件引入
      i => `${r('./middlewares')}/${i}` // 获取到中间件目录
    ))
  }
  async start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    // Build in development
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    this.app.use(ctx => {
      ctx.status = 200
      ctx.respond = false // Mark request as handled for Koa
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash

      ctx.req.session = ctx.session
      nuxt.render(ctx.req, ctx.res)
    })

    this.app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
  }
}

const app = new Server()
app.start()
