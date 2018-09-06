const mongoose = require('mongoose')

const { Schema } = mongoose

const MenuSchema = new Schema({
    name: String,
    url: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

MenuSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})

MenuSchema.statics = {
    async getList () {
        let that = this
        return await this.find({}).exec()
    }
}

mongoose.model('menu', MenuSchema)