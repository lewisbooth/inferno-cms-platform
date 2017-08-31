const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const gallerySchema = new Schema({
  images: Array,
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Gallery', gallerySchema)