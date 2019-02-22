const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27016/recruit'

mongoose.connect(DB_URL, { useNewUrlParser: true })

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + DB_URL)
})

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err)
})

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

const models = {
  user: {
    username: { type: String, require: true },
    password: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    title: { type: String },
    company: { type: String },
    money: { type: String }
  },
  chat: {}
}

Object.keys(models).forEach(k => {
  mongoose.model(k, new mongoose.Schema(models[k]))
})

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}
