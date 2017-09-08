const path = require('path')
const express = require('express')

const public_path = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()

app.use(express.static('public'))

app.get('/', function (req, res) {
console.log('rllllllll');
  res.send('Hello World!')
  res.end()
})

app.listen(port, function () {
  console.log(`Chat app listening on port ${port}!`)

})
