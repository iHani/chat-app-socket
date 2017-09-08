const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const public_path = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static('public'))

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.on('disconnect', () => {
    console.log('Disconnected user');
  })

  // registering custom event listener 'Client Emit'
  socket.on('Client Emit', (e) => {
    console.log('Emit from client', e);
  })

  // Emmiting an event 'Server Emit'
  socket.emit('Server Emit', { 'someKey': 'someValue', 'emit_sender': 'server', 'time': new Date() })

})

server.listen(port, function () {
  console.log(`Chat app listening on port ${port}!`)
})
