const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex) //uses home controller to get index page and render index.js from views
router.get('/darkmodeindex', homeController.getDarkmodeIndex)
module.exports = router