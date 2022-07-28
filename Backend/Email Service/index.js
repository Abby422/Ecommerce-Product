const express = require('express')
const app = express()
const mailRoute = require('./routes/mailRoutes')
require('dotenv').config()

const port = process.env.PORT || 4001

app.use('/email', mailRoute)

app.listen(port, ()=>{
    console.log(`The server is running on port: ${port}`)
})