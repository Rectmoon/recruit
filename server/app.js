const express = require('express')
const app = express()
const model = require('./model')
const Chat = model.getModel('chat')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
const userRouter = require('./routes/user')

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('user coming')
  socket.on('sendingmsg', data => {
    console.log(data)
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create(
      {
        chatid,
        from,
        to,
        content: msg
      },
      (err, d) => {
        console.log(d)
        io.emit('recivemsg', Object.assign({}, d._doc))
      }
    )
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

server.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})
