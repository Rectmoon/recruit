const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
const userRouter = require('./routes/user')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})
