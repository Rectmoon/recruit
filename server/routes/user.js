const express = require('express')
const router = express.Router()

router.get('/login', function(req, res) {
  res.send('login')
})

router.get('/register', function(req, res) {
  res.send('register')
})

router.get('/list', function(req, res) {
  res.send('list')
})

module.exports = router
