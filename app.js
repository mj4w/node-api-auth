const express = require('express')
const morgan = require('morgan') 
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')

const AuthRoute = require('./Routes/Auth')
const app = express()

app.get('/',async(req,res,next) => {
    res.send('Welcome! Auth API')
})

// Developer server
app.use(morgan('dev'))

// Auth Route
app.use('/auth',AuthRoute)

app.use(async(req,res,next) => {
    next(createError.NotFound()) // using http-errors
    // next function trigger and pass to other functions
})

app.use((error,req,res,next) => {
    res.status(error.status || 500)
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
