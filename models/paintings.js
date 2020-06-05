const mongoose = require('mongoose')

const paintingSchema = new mongoose.Schema(
  {
  title: { type: String },
  author: { type: String },
  year: { type: Number},
  imageURL: { type: String },
  body: { type: String}
  }

)

const Painting = mongoose.model('Painting', paintingSchema)

const Statues = mongoose.model("Statues", paintingSchema)



module.exports = {
  Painting,
  Statues
}
