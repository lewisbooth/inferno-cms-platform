const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const path = require('path')
const slugify  = require('./helpers/slugify')
const multer  = require('multer')
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: '10MB',
    files: 10
  }
})
const sharp = require('sharp')
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

app.post('/api/gallery/edit', async (req, res) => {
  console.log('POST to /api/gallery/edit')
  const newImage = {
    description: req.body.description,
    tags: req.body.tags
  }
  let gallery = await Gallery.find({}).sort({_id:-1}).limit(1)
  gallery[0].images[req.body.index].description = newImage.description
  gallery[0].images[req.body.index].tags = newImage.tags
  console.log(gallery[0].images[req.body.index])
  const newImages = await Gallery.findOneAndUpdate({}, {images: gallery[0].images}, {new: true})
  res.json(newImages)
})

app.post('/api/gallery/add', upload.single('photo'), async (req, res) => {
  console.log('POST to /api/gallery/add', req)  
  const photo = req.file
  const description = req.body.description
  const descriptionSlug = slugify(description)
  const tags = req.body.tags.split(",")
  const timestamp = new Date().getTime()
  const slug = `orange-tree-${descriptionSlug}-${timestamp}`

  const newImage = {
    description,
    slug,
    tags
  }

  sharp(photo.buffer)
    // Resize to 1000px on longest side
    .resize(1000, 1000)
    .max()
    .toFormat('jpg')
    .toFile(`public/images/gallery/full-size/${slug}.jpg`)
    .then(() => {      
      // Create 300x300px cropped thumbnail
      sharp(photo.buffer)
        .resize(300, 300)
        .max()
        .crop()
        .toFormat('jpg')
        .toFile(`public/images/gallery/thumbs/${slug}.jpg`)
        .then(async () => {     
          // Log event     
          const completed = new Date().getTime()
          console.log(`Image ${descriptionSlug} processed in ${completed - timestamp}ms`)
          // Save to database
          const oldImages = await Gallery.find({}).sort({_id:-1}).limit(1)
          const newImages = [newImage, ...oldImages[0].images]
          const update = await Gallery.findOneAndUpdate({}, {images: newImages}, {new: true})
          // Return new image array to client
          res.json(update)
        }).catch(err => {
          console.error(err)
          res.status(500)
          res.send()
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500)
      res.send()
    })
})

app.get('/:page', function (req, res) {
  console.log('GET /' + req.params.page)
  res.sendFile(path.join(__dirname, '..', '/build/index.html'))
})

module.exports = app