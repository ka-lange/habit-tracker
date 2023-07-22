const Habit = require('../models/Habit')

module.exports = {
    getIndex: async (req,res)=>{
        // res.render('index.ejs') //renders ejs file and reponds with it
        try{
            const habitItems = await Habit.find() //uses variable Todo model to grab todo instances from database, mongoose automatically turns to array
            // const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('index.ejs', {habits: habitItems})
        }catch(err){
            console.log(err)
        }
    }
}

