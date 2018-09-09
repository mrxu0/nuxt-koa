import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import glob from 'glob'
import { resolve } from 'path'
import _ from 'lodash'

 glob.sync(resolve(__dirname, '../controllers/*/*Schema.js')).forEach(file => {
     require(file)
 })

export const database = app => {
    mongoose.set('debug', true)
    mongoose.set('useFind', false);
    mongoose.connect(config.db)

    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.db)
    })

    mongoose.connection.on('error', (err) => {
        console.error(err)
    })

    mongoose.connection.on('open', async () => {
        console.log('Connected to MongoDB', config.db)
        const User = mongoose.model('Users')
        let user = await User.findOne({ email: 'mrxu@qq.com' }).exec()
        if (!user) {
            user = new User({ 
                email: 'mrxu@qq.com', 
                password: 'admin', 
                role: 'admin' 
            })
            user.save()
        }
    })
}