const express = require('express')
const path = require('path')
const sharp = require('sharp')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('./helpers/cors')

const mongoose = require('mongoose')
const Gallery = mongoose.model('Gallery')

const app = express()

if (process.env.ENV === 'DEV') { app.use(cors) }

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(compression())
app.use(express.static('build', { maxage: '7d' }))

app.get('/api/gallery', async (req, res) => {
  console.log('GET /api/gallery')
  const gallery = await Gallery.find({}).sort({_id:-1}).limit(1)
  res.json(gallery[0])
})

app.post('/api/gallery', async (req, res) => {
  console.log('POST to /api/gallery')
  const newImages = await Gallery.findOneAndUpdate({}, {images: req.body}, {new: true})
  res.json(newImages)
})

app.post('/api/gallery/add', async (req, res) => {
  console.log('POST to /api/gallery/add')
  res.status(200)
})

app.get('/:page', function (req, res) {
  console.log('GET /' + req.params.page)
  res.sendFile(path.join(__dirname, '..', '/build/index.html'))
})

module.exports = app