
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurantInfo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Restaurant.find()
   .lean()
   .then( restaurants => res.render('index', { restaurants }))
   .catch( error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const restaurant = new Restaurant ({ name,name_en,category,image,location,phone,google_map,rating,description }) 
  return restaurant.save()
   .then(() => res.redirect('/'))
   .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  let id = req.params.restaurant_id
  Restaurant.findById(id)
   .lean()
   .then(restaurant => res.render('show', { restaurant }))
   .catch(error => console.error(error))
})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  let id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

app.put('/restaurants/:restaurant_id', (req, res) => {
  let id = req.params.restaurant_id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById(id)
   .then( restaurant => {
     restaurant.name = name
     restaurant.name_en = name_en
     restaurant.category = category
     restaurant.image = image
     restaurant.location = location
     restaurant.phone = phone
     restaurant.google_map = google_map
     restaurant.rating = rating
     restaurant.description = description
     return restaurant.save()
   })
   .then(() => res.redirect('/'))
   .catch(error => console.log(error))
})

app.delete('/restaurants/:restaurant_id', (req, res) => {
  let id = req.params.restaurant_id
  return Restaurant.findById(id)
   .then(restaurant => restaurant.remove())
   .then(() => res.redirect('/'))
   .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({ $or: [
    { name: { $regex: keyword, $options: 'i' }},
    { category: { $regex: keyword, $options: 'i' }},
  ]})
  .lean()
  .then( restaurants => res.render('index', { restaurants }))
  .catch( error => console.error(error))
})

app.listen(port, () => {
  console.log(`This app run at http://localhost:${port}`)
})