var socket = io()

socket.on('connect', () => {

  appendli(`${socket.id} LOGGED IN.`)
  socket.emit('NewUserLoggedIn', socket.id)

  socket.on('NewUserLoggedInNotification', (socketid) => {
    appendli(`${socketid} LOGGED IN.`)
  })

  socket.on('NewMsg', (msg) => {
    appendli(`${msg.from}: ${msg.text}`)
  })

  socket.on('disconnect', () => {
    //
  })

}) // socket.on 'connect'

jQuery('#msg-form').on('submit', function (e) {
  e.preventDefault()

  var clientMsg = {
    from: socket.id,
    text: jQuery('[name=msg]').val(),
    createdAt: new Date().getTime()
  }

  socket.emit('NewMsg', clientMsg, (ack) => {
    // console.log('Server Ack my message.', ack);
    appendli(`${ack.from}: ${ack.text}`)
    jQuery('[name=msg]').val('')
  })
})

function appendli(msg) {
  let li = jQuery('<li></li>')
  li.text(msg)
  jQuery('#messages').append(li)
}
