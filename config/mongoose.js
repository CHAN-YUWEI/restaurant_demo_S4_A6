const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant-Info')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongoose connect!')
})

module.exports = db