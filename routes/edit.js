const express = require('express')
const router = express.Router()
const editController = require('../controllers/edit')
//ensure Auth checks if user is logged in
//make a get request to get to the page
router.get('/', editController.getIndex) //uses home controller to get index page and render index.js from views

router.post('/createHabit', editController.createHabit)
// router.post('/createMakeHabit', editController.createMakeHabit)
// router.post('/createBreakHabit', editController.createBreakHabit)

router.put('/editHabit', editController.editHabit)

router.put('/completeHabit', editController.completeHabit)

router.put('/uncompleteHabits', editController.uncompleteHabits)
router.put('/refreshStreak', editController.refreshStreak)

router.delete('/deleteHabit', editController.deleteHabit)

module.exports = router