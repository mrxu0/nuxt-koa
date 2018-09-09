import mongoose from 'mongoose'
import Service from '../../libs/controller/Service'

const User = mongoose.model('Users')

export default class AdminService extends Service {
    constructor () {
        super(User)
    }

    async getEmail (email) {
        try {
            return await User.findOne({ email: email }).exec()
        } catch (err) {
            throw new Error (err)
        }
    }

    async login (email, password) {
        try {
            const user = await this.getEmail(email)
            if (!user) return null
            const match = await user.comparePassword(password, user.password)
            if (match) return user
            else return null
        } catch (err) {
            throw new Error (err)
        }
    }
}
 