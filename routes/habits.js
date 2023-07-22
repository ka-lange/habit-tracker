const express = require('express')
const router = express.Router()
const habitsController = require('../controllers/habits')

router.get('/', habitsController.getIndex) //get req on root route will ask controller to render todo page

// router.get('/', habitsController.getHabits)

router.post('/createHabit', habitsController.createHabit)

module.exports = router