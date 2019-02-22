const express = require('express')
const router = express.Router()
const model = require('../model')

const _filter = { password: 0, __v: 0 }

const User = model.getModel('user')
const Chat = model.getModel('chat')

const ChatModel = new Chat({
  username: 'lisi'
})

router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})

router.get('/info', (req, res) => {
  const { userid } = req.cookies
  if (!userid) return res.json({ code: 1 })
  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错了' })
    doc && res.json({ code: 0, data: doc })
  })
})

router.get('/login', function(req, res) {
  res.send('login')
})

router.post('/register', (req, res) => {
  const { username, password, type } = req.body
  User.findOne({ username }, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错了' })
    if (doc) return res.json({ code: 1, msg: '用户名重复' })
    const userModel = new User({
      username,
      password,
      type
    })
    userModel.save((e, d) => {
      if (e) return res.json({ code: 1, msg: '后端出错了' })
      const { username, type, _id } = d
      res.cookie('userid', _id)
      return res.json({ code: 0, data: { username, type, _id } })
    })
  })
})

router.get('/list', function(req, res) {
  res.send('list')
})

module.exports = router
