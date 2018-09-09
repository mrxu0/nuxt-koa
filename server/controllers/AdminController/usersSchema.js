const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const UserSchema = new Schema({
    role: {
        type: String,
        default: 'user'
    },
    name: String,
    age: Number,
    email: String,
    gender: String,
    password: String,
    hashed_password: String,
    loginAttemps: {
        type: Number,
        required: true,
        default: 0
    },
    lockUtil: Number,
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

UserSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now())
})

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})

UserSchema.pre('save', function(next) {
    var user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error)
        user.password = hash
        next()
      })
    })
  })

  UserSchema.methods = {
    comparePassword: function(_password, password) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(_password, password, function(err, isMatch) {
          if (!err) resolve(isMatch)
          else reject(err)
        })
      })
    },
  
    /* incLoginAttempts: function (user) {
      var that = this
  
      return new Promise((resolve, reject) => {
        if (that.lockUntil && that.lockUntil < Date.now()) {
          that.update({
            $set: {
              loginAttempts: 1
            },
            $unset: {
              lockUntil: 1
            }
          }, function(err) {
            if (!err) resolve(true)
            else reject(err)
          })
        }
        var updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }
  
        that.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      })
    } */
  }
mongoose.model('Users', UserSchema)