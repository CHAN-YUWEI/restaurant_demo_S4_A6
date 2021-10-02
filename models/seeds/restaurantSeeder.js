const mongoose = require('mongoose')
const Restaurant = require('../restaurantInfo')
const seedRestaurants = require('./restaurantSeed')

mongoose.connect('mongodb://localhost/restaurant-Info')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  seedRestaurants.map(item => {
    let seed = new Restaurant(item)
    seed.save(function(err){
      if(err){
        console.log(err)
        return
      }
    })
  })
  console.log('done')
})
