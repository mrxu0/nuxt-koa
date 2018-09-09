import Route from 'koa-router'
import { resolve } from 'path'
import glob from 'glob'
import _ from 'lodash'
import R from 'ramda'

export let routersMap = new Map()
// 设置独一无二的前缀, 避免重复controller的问题
export const symbolPrefix = Symbol('prefix') 
// 判断是否是数组，是数组直接返回，不是数组变成数组返回
export const isArray = v => _.isArray(v) ? v : [v]
// 对路径进行补全，如果是以'/'开头的，直接返回，不是则拼上'/'返回
export const normalizePath = path => path.startsWith('/') ? path : `/${path}`

// https://github.com/pleerock/routing-controllers

let reqID = 0

export default class Router {
    constructor(app, apiPath) {
        this.app = app
        this.apiPath = apiPath
        this.router = new Route()
    }

    init() {
        glob.sync(resolve(this.apiPath, './*/*Controller.js')).forEach(require)

        for (let [key, value] of routersMap) {
            const controllers = isArray(value)
            let prefixPath = key.target[symbolPrefix]
            if (prefixPath) prefixPath = normalizePath(prefixPath)
            const routerPath = prefixPath + key.path
            this.router[key.method](routerPath, ...controllers)
        }
        
        this.app.use(this.router.routes()) 
        this.app.use(this.router.allowedMethods())
    }
}

// 将所有的路由方法放到map里面
export const router = conf => (target, key, desc) => {
    conf.path = normalizePath(conf.path)
    routersMap.set({
        target: target,
        ...conf
    }, target[key]) // target[key]为什么是一个数组？
}

export const controller = path => target => target.prototype[symbolPrefix] = path

export const get = path => router({
    method: 'get',
    path: path
})

export const post = path => router({
    method: 'post',
    path: path
})

const decorate = (args, middleware) => {
    let [ target, key, descriptor ] = args

    target[key] = isArray(target[key])
    target[key].unshift(middleware) // 往数组开头添加多个函数

    return descriptor
}

export const convert = middleware => (...args) => decorate(args, middleware)

// 打印方法执行的时间
export const log = convert(async (ctx, next) => {
    // console.log('ctx', ctx)
    let currentReqID = reqID++ 
    console.time(`${currentReqID} ${ctx.method} ${ctx.url}`)
    await next()
    console.timeEnd(`${currentReqID} ${ctx.method} ${ctx.url}`)
})
// 判断字段是否必填
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