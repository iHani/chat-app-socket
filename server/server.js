const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMEssage } = require('./utils/message')
const public_path = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static('public'))

io.on('connection', (socket) => {

  socket.on('NewUserLoggedIn', (socketid) => {
    socket.broadcast.emit('NewUserLoggedInNotification', socketid)
  })

  // registering custom event listener 'Client Emit'
  socket.on('NewMsg', (msg, ack) => {

    let obj = {
      from: msg.from,
      text: msg.text,
      createdAt: msg.createdAt,
      recievedAt: new Date().getTime(),
    }

    // global emitting
    socket.broadcast.emit('NewMsg', obj)

    ack(obj)

  }) // socket.on 'NewMsg'

  socket.on('disconnect', (socketid) => {
    //
  })

}) // io.on 'connection'

server.listen(port, function () {
  console.log(`Chat app listening on port ${port}!`)
})
