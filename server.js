const express = require('express')
const app = express()
// const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')
const userRoutes = require('./routes/user');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // use the path to your User model

const mongoose = require('mongoose')
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DB_STRING);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
}


app.use(session({
    secret: 'make some habits', 
    resave: false,
    saveUninitialized: false,
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  
  // pass current user to all routes
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

require('dotenv').config({path: './config/.env'})

// connectDB()  //initialize connecting the server to the database via config/database file

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)
app.use('/', editRoutes)
app.use('/', userRoutes)
 

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("listening for requests");
    })
})