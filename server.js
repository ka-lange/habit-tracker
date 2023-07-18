const express = require('express')
const app = express()
const connectDB = require('./config/database')

require('dotenv').config({path: './config/.env'})

connectDB()  //initialize connecting the server to the database via config/database file

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})  