const mongoose = require('mongoose')
const { Schema } = mongoose

const AritcleSchema = new Schema({
    title: String,
    desc: String,
    content: String,
    read: {
        type: Number,
        default: 0
    },
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

AritcleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})
mongoose.model('Article', AritcleSchema)