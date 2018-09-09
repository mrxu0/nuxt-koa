export default class Service {
    constructor (schema) {
        this.schema = schema
    }
    async getId ({ _id}) {
        try {
            return await this.schema.find({_id: _id})
        } catch (err) {
            throw new Error('报错了：', err)
        }
    } 
    
    async list () {
        try {
            return await this.schema.find({})
        } catch (err) {
            throw new Error('报错了：', err)
        }
    }
    
    async del ({ _id }) {
        try {
            await this.schema.deleteOne({_id: _id})
        } catch (err) {
            throw new Error('报错了：', err)
        }
    }

     async aore (obj) {
        try {
            if (obj._id) {
                await this.schema.where({_id: obj._id}).update({
                    $set: obj
                }).exec()
            } else {
                await new this.schema(obj).save()
            }
        } catch (err) {
            throw new Error('报错了：', err)
        }
    }
}