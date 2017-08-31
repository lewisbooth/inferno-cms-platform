const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Gallery = mongoose.model('Gallery')

const app = express()

//CORS middleware
var cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

if (process.env.ENV === 'DEV') { app.use(cors) }

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(compression())
app.use(express.static('build', { maxage: '7d' }))

app.get('/api/gallery', async (req, res) => {
  const gallery = await Gallery.find({}).sort({_id:-1}).limit(1)
  res.json(gallery[0])
})

app.post('/api/gallery', async (req, res) => {
  const newImages = await (new Gallery({images: req.body})).save()
  res.json(newImages)
})

app.get('/:page', function (req, res) {
  res.sendFile(__dirname + '/build/index.html')
})

module.exports = app