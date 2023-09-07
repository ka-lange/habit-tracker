const Habit = require('../models/Habit')


module.exports = {
    getIndex: async (req,res)=>{
        // res.render('index.ejs') //renders ejs file and reponds with it
        try{
            // const Habits = await Habit.find()//uses variable Todo model to grab todo instances from database, mongoose automatically turns to array
            // const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('index.ejs')
        }catch(err){
            console.log(err)
        }
    },
    getHome: async (req,res)=>{
        // res.render('index.ejs') //renders ejs file and reponds with it
        try{
            const Habits = await Habit.find().populate('owner')//uses variable Todo model to grab todo instances from database, mongoose automatically turns to array
            // const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('userPage.ejs', { habits: Habits, user: req.user })
        }catch(err){
            console.log(err)
        }
    },
    
    
}

