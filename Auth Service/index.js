const express = require('express')
require('dotenv').config();

const { router }=require('./routes/userRoutes')


const app = express();

app.use(express.json())
app.use('/', router)
const port = process.env.PORT || 3001;

app.listen(port, ()=> console.log(`Server is running on port:${port}`))