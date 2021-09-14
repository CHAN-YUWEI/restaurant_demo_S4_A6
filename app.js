
const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultlayouts: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  let restaurant = restaurants.results.find( (restaurant) =>  { return restaurant.id.toString() === req.params.restaurant_id} )
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim().toLowerCase()
  let searchResults = restaurants.results.filter(restaurant => restaurant.name.trim().toLowerCase().includes(keyword) || restaurant.category.trim().toLowerCase().includes(keyword))
  res.render('index', {restaurants: searchResults})  
})

app.listen(port, () => {
  console.log(`This app run at http://localhost:${port}`)
})