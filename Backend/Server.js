const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()


const routes = require('./routes/ToDoRoute')

require('dotenv').config
app.use(express.json())
app.use(cors())
app.use(routes)

mongoose.connect('mongodb+srv://todos:todos123@cluster0.owqxbfe.mongodb.net/todoStore?retryWrites=true&w=majority').then(()=>console.log('Connected to MongoDB..')).then(()=>{
    app.listen(7000)
}).catch((err)=>console.log(err))


