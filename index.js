const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const userRoute = require('./routes/User')
const docRoute = require('./routes/Doc')

dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_DB,()=>{
    console.log("connect to DB");
})

app.use(bodyParser.json({limit:"50mb"}))
app.use(cors())
app.use(morgan("common"))

app.use("/v1/user",userRoute)
app.use("/v1/doc",docRoute)



app.listen(3005,()=>{
    console.log("server is running port 3005");
})



