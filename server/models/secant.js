const mongoose = require('mongoose')
const Schema = mongoose.Schema

const secantSchema = new Schema({
  index: Number,
  XOLD: String, 
  XNEW: String,
  Function: String
})



const secantModel = mongoose.model('secant',secantSchema)

module.exports = secantModel