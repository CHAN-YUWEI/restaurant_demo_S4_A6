const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantInfo')

router.get('/', (req, res) => {
    Restaurant.find()
      .lean()
      .sort({ _id: 'desc'})
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
})

module.exports = router