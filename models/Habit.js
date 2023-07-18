const mongoose = require('mongoose') 

const HabitSchema = new mongoose.Schema({ 
  habit: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  }
})

module.exports = mongoose.model('Habit', HabitSchema)
