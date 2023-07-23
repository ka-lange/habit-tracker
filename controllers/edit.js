const Habit = require('../models/Habit')

module.exports = {
    getIndex: async (req,res)=>{
        // res.render('index.ejs') //renders ejs file and reponds with it
        try{
            const habitItems = await Habit.find() //uses variable Todo model to grab todo instances from database, mongoose automatically turns to array
            // const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('edit.ejs', {habits: habitItems})
        }catch(err){
            console.log(err)
        }
    },
    createHabit: async (req, res)=>{
        try{
            await Habit.create({habit: req.body.habitItem, completed: false}) //habit needs to be the user input somehow
            console.log('habit has been added!')
            res.redirect('/edit')
        }catch(err){
            console.log(err)
        }
    },
    deleteHabit: async (req,res)=>{
        //console.log(req.body.habitIdFromJSFile)
        try{
            await Habit.findOneAndDelete({_id:req.body.habitIdFromJSFile})
            console.log(`Deleted Habit`)
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}

