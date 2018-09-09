import Router from '../decorator/controller'
import { resolve } from 'path'

const r = path => resolve(__dirname, path)

export const router = app => {
    const apiPath = r('../controllers')
    const router = new Router(app, apiPath)
    router.init()
}