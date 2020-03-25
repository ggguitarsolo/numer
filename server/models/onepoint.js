const mongoose = require('mongoose')
const Schema = mongoose.Schema

const onepointSchema = new Schema({
  index: Number,
  X: String, 
  Function: String
})



const onepointModel = mongoose.model('onepoint',onepointSchema)

module.exports = onepointModel