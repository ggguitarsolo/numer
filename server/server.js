const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Bisection = require('./models/product')
const FalsePosition = require('./models/product')
const Onepoint = require('./models/onepoint')
const Secant = require('./models/secant')

app.use(express.json())

app.listen(9000, () => {
  console.log('Application is running on port 9000')
})

mongoose.connect('mongodb+srv://Guitar:Guitarsolo2541@cluster0-8nbii.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
app.get('/bisection', async (req, res) => {
  const bisection = await Bisection.findOne({ "index": 1 })
  res.json(bisection)
})

app.get('/false', async (req, res) => {
  const bisection = await Bisection.findOne({ "index": 1 })
  res.json(bisection)
})

app.get('/onepoint', async (req, res) => {
  const onepoint = await Onepoint.findOne({ "index": 1 })
  res.json(onepoint)
})

app.get('/newton', async (req, res) => {
  const onepoint = await Onepoint.findOne({ "index": 1 })
  res.json(onepoint)
})
app.get('/secant', async (req, res) => {
  const secant = await Secant.findOne({ "index": 1 })
  res.json(secant)
})

app.post('/bisection', async (req, res) => {
  const payload = req.body
  const product = new Bisection(payload)
  await product.save()
  res.status(201).end()
})

/*const Cat = mongoose.model('Cat', { name: String })

// สร้าง instance จาก model
const kitty = new Cat({ name: 'JavaScript' })

// save ลง database (return เป็น Promise)
kitty.save().then(() => console.log('meow'))*/