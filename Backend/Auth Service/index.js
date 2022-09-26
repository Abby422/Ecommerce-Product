const express = require('express')
require('dotenv').config();
const cors = require('cors')

const { router }=require('./routes/userRoutes')


const app = express();
app.use(cors());

app.use(express.json())
app.use('/', router)
const port = process.env.PORT || 5006;

app.listen(port, ()=> console.log(`Server is running on port:${port}`))