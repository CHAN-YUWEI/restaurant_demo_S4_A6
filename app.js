
const express = require('express')
const exphbs = require('express-handlebars')
// const restaurants = require('./restaurant.json')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurantInfo')

mongoose.connect('mongodb://localhost/restaurant-Info')

const app = express()
const port = 3000

const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongoose connect!')
})

app.engine('handlebars', exphbs({ defaultlayouts: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
   .lean()
   .then( restaurants => res.render('index', { restaurants }))
   .catch( error => console.error(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  let id = req.params.restaurant_id
  Restaurant.findById(id)
   .lean()
   .then(restaurant => res.render('show', { restaurant }))
   .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({ $or: [
    {name: keyword},
    {category: keyword},
  ]})
  .lean()
  .then( restaurants => res.render('index', { restaurants }))
  .catch( error => console.error(error))
})

app.listen(port, () => {
  console.log(`This app run at http://localhost:${port}`)
})