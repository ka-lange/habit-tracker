const Habit = require('../models/Habit')


module.exports = {
    getIndex: async (req,res)=>{
        // res.render('index.ejs') //renders ejs file and reponds with it
        try{
            const Habits = await Habit.find()//uses variable Todo model to grab todo instances from database, mongoose automatically turns to array
            // const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('index.ejs', {habits: Habits})
        }catch(err){
            console.log(err)
        }
    },
    getDarkmodeIndex: async (req,res)=>{
        // res.render('index.ejs') //renders ejs file and reponds with it
        try{
            const Habits = await Habit.find()//uses variable Todo model to grab todo instances from database, mongoose automatically turns to array
            // const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('darkmodeindex.ejs', {habits: Habits})
        }catch(err){
            console.log(err)
        }
    }
}

