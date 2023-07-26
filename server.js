const express = require('express')
const app = express()
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')

require('dotenv').config({path: './config/.env'})

connectDB()  //initialize connecting the server to the database via config/database file

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)
app.use('/edit', editRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})  