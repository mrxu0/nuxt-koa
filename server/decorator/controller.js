import Route from 'koa-router'
import { resolve } from 'path'
import glob from 'glob'
import _ from 'lodash'
import R from 'ramda'

export let routersMap = new Map()
export const symbolPrefix = Symbol('prefix')

export const isArray = v => _.isArray(v) ? v : [v]
export const normalizePath = path => path.startsWith('/') ? path : `/${path}`


// https://github.com/pleerock/routing-controllers

let reqID = 0
const decorate = (args, middleware) => {
  let [ target, key, descriptor ] = args

  target[key] = isArray(target[key])
  target[key].unshift(middleware)

  return descriptor
}

export default class Router {
    constructor(app, apiPath) {
        this.app = app
        this.apiPath = apiPath
        this.router = new Route()
    }

    init() {
        glob.sync(resolve(this.apiPath, './*/*Controller.js')).forEach( file => {
            require(file)
        })

        for (let [conf, controller] of routersMap) {
            const controllers = isArray(controller)
            let prefixPath = conf.target[symbolPrefix]

            if (prefixPath) prefixPath = normalizePath(prefixPath)

            const routerPath = prefixPath + conf.path
            this.router[conf.method](routerPath, ...controllers)
        }
        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
    }
}

// router里面的二级箭头函数的值是哪里来的？
export const router = conf => (target, key, desc) => {
    conf.path = normalizePath(conf.path)
    routersMap.set({
        target: target,
        ...conf
    }, target[key])
}

export const convert = middleware => (...args) => decorate(args, middleware)

export const controller = path => target => target.prototype[symbolPrefix] = path

export const get = path => router({
    method: 'get',
    path: path
})

export const post = path => router({
    method: 'post',
    path: path
})

export const log = convert(async (ctx, next) => {
    let currentReqID = reqID++
    console.time(`${currentReqID} ${ctx.method} ${ctx.url}`)
    await next()
    console.timeEnd(`${currentReqID} ${ctx.method} ${ctx.url}`)
})

export const required = rules => convert(async (ctx, next) => {
    let errors = []
    const passRules = R.forEachObjIndexed(
        (value, key) => {
            errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
        }
    )
    passRules(rules)

    if (errors.length) {
        console.error(`${errors.join(',')} is required`)
        return ctx.body = {
            success: false, 
            data: {},
            msg:  `${errors.join(',')} is required`
        }
        // ctx.throw(412, `${errors.join(',')} is required`)
    } 
    await next()
})