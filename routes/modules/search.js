const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantInfo')

router.get('/', (req, res) => {
  let keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router