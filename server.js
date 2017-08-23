const express = require('express')
const compression = require('compression')
const app = express()

app.use(compression())
app.use(express.static('build', { maxage: '7d' }))

app.get('/:page', function (req, res) {
  res.sendFile(__dirname + '/build/index.html')
})

app.listen(1337, function () {
  console.log('Backend listening on port 1337!')
})