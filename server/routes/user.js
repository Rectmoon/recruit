const express = require('express')
const utility = require('utility')
const router = express.Router()
const model = require('../model')

const _filter = { password: 0, __v: 0 }

const User = model.getModel('user')
const Chat = model.getModel('chat')

const ChatModel = new Chat({
  username: 'lisi'
})

function getMd5Password(p) {
  const salt = 'yinglzx!@#IUHJh~~'
  return utility.md5(utility.md5(p + salt))
}

router.get('/info', (req, res) => {
  const { userid } = req.cookies
  if (!userid) return res.json({ code: 1 })
  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错了' })
    res.json({ code: 0, data: doc })
  })
})

router.post('/register', (req, res) => {
  const { username, password, type } = req.body
  User.findOne({ username }, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错了' })
    if (doc) return res.json({ code: 1, msg: '用户名重复' })
    const userModel = new User({
      username,
      password: getMd5Password(password),
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

router.post('/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username, password: getMd5Password(password) }, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错了' })
    if (!doc) return res.json({ code: 1, msg: '用户名或者密码错误' })
    res.cookie('userid', doc._id)
    res.json({ code: 0, data: doc })
  })
})

router.post('/update', (req, res) => {
  const { userid } = req.cookies
  const body = req.body
  if (!userid) return res.json({ code: 1 })
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错了' })
    const { username, type } = doc
    const d = Object.assign({ username, type }, body)
    res.json({ code: 0, data: d })
  })
})

router.get('/list', (req, res) => {
  const { type } = req.query
  User.find({ type }, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错了' })
    res.json({ code: 0, data: doc })
  })
})

module.exports = router
