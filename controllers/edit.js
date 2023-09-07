const Habit = require('../models/Habit')

module.exports = {
    getIndex: async (req,res)=>{
        // res.render('index.ejs') //renders ejs file and reponds with it
        try{
            const habitItems = await Habit.find().populate('owner') //uses variable Todo model to grab todo instances from database, mongoose automatically turns to array
            // const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('edit.ejs', {habits: habitItems, user: req.user })
        }catch(err){
            console.log(err)
        }
    },
    createHabit: async (req, res)=>{
        try{
            await Habit.create({
                habit: req.body.habitItem, 
                type: req.body.type,
                habitColor: req.body.habitColor,
                currentStreak: 0,
                completed: false,
                owner: req.user._id,
            }) //habit needs to be the user input somehow
            console.log('habit has been added!')
            res.redirect('/home')
        }catch(err){
            console.log(err)
        }
    },
    deleteHabit: async (req,res)=>{
        //console.log(req.body.habitIdFromJSFile)
        try{
            await Habit.findOneAndDelete({_id:req.body.habitIdFromJSFile})
            // let habit = await Habit.findById(req.params.id);
            // if(habit.owner.equals(req.user._id)){
            //     await Habit.findByIdAndRemove(req.params.id);
            //   }
            console.log(`Deleted Habit`)
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    completeHabit: async (req, res)=>{
        try{
            await Habit.findOneAndUpdate({_id:req.body.habitIdFromJSFile},{
                $inc: { currentStreak: 1 }, //increases count of current streak by 1
                 completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    uncompleteHabits: async (req, res)=>{
        try{
            await Habit.updateMany(
                {Habit},{
                completed: false
            })
            console.log('Marked Uncomplete')
            res.json('Marked Uncomplete')
        }catch(err){
            console.log(err)
        }
    },
    refreshStreak: async (req, res)=>{
        try{
            await Habit.findOneAndUpdate({_id:req.body.habitIdFromJSFile},{
                currentStreak: 0,
                completed: false
            })
            console.log('Marked Uncomplete')
            res.json('Marked Uncomplete')
        }catch(err){
            console.log(err)
        }
    },
    
    editHabit: async (req, res)=>{
        try{
            await Habit.findOneAndUpdate({_id:req.body.habitIdFromJSFile},{
                 //increases count of current streak by 1
                 habit: req.body.newHabitNameFromJSFile,
                 habitColor: req.body.newHabitColorFromJSFile,
                //  currentStreak: 0,
                 completed: false
            })
            console.log('Habit Name changed!')
            res.json('Habit Changed')
        }catch(err){
            console.log(err)
        }
        // try{
        //     await Habit.create({
        //         habit: req.body.newHabitName, 
        //         habitColor: req.body.newHabitColor,
        //         currentStreak: 0,
        //         // frequencyDaily: req.body.frequencyDaily, 
        //         // frequencyUnits: req.body.frequencyUnits, 
        //         // timesCompletedToday: 0,
        //         completed: false}) //habit needs to be the user input somehow
        //     console.log('habit has been added!')
        //     res.redirect('/')
        // }catch(err){
        //     console.log(err)
        // }
    },
}
