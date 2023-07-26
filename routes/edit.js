const express = require('express')
const router = express.Router()
const editController = require('../controllers/edit')

router.get('/', editController.getIndex) //uses home controller to get index page and render index.js from views

router.post('/createHabit', editController.createHabit)
// router.post('/createMakeHabit', editController.createMakeHabit)
// router.post('/createBreakHabit', editController.createBreakHabit)

router.put('/editHabit', editController.editHabit)

router.put('/completeHabit', editController.completeHabit)

router.put('/uncompleteHabits', editController.uncompleteHabits)

router.delete('/deleteHabit', editController.deleteHabit)

module.exports = router