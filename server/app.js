const express = require('express')
const app = express()
const compression = require('compression')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('./helpers/cors')
const logging = require('./helpers/logging')
const { catchErrors } = require('./helpers/errors')
const multer  = require('multer')
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: '10MB',
    files: 10
  }
})

const apiController = require('./controllers/apiController')

if (process.env.ENV === 'DEV') { 
  app.use(cors) 
}

app.use(logging)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(compression())
app.use(express.static('build', { maxage: '7d' }))

app.get('/api/gallery', 
  catchErrors(apiController.getGallery))

app.post('/api/gallery', 
  catchErrors(apiController.postGallery))

app.post('/api/gallery/edit', 
  catchErrors(apiController.editGalleryImage))

app.post('/api/gallery/add', 
  upload.single('photo'), 
  catchErrors(apiController.addGalleryImage))
  
app.get('/:page', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'))
})

module.exports = app