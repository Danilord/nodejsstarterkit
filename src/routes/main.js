const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movie')

router.get('/byId', MovieController.byId)
router.get('/search', MovieController.search)

module.exports = router;