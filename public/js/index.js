var socket = io()

socket.on('connect', () => {
  console.log('Connected to the server')

  // Emmiting an event 'Client Emit'
  socket.emit('Client Emit', { 'emit_sender': 'client', 'time': new Date() })

})

socket.on('disconnect', () => {
  console.log('Disonnected from the server')
})

// registering custom event listener 'Server Emit'
socket.on('Server Emit', (e) => {
  console.log('Emit from the server', e);
})
