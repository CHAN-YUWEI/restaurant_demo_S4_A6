const Restaurant = require('../restaurantInfo')
const seedRestaurants = require('./restaurantSeed')
const db = require('../../config/mongoose')

db.once('open', () => {
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
