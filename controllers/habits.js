const Habit = require('../models/Habit')

module.exports = {
    //finds all documents in db, counts them and passes these values to ejs file
    getIndex: (req,res)=>{
        res.render('habits.ejs') //renders ejs file and reponds with it
    },
    createHabit: async (req, res)=>{
        try{
            await Habit.create({habit: req.body.habitItem, completed: false})
            console.log('habit has been added!')
            res.redirect('/habits')
        }catch(err){
            console.log(err)
        }
    }
}    