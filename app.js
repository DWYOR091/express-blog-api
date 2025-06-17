const { config } = require('dotenv')
config()
const express = require('express')
const bodyParser = require('body-parser')
const connectMongodb = require('./init/mongodb')
const morgan = require('morgan')
const { authRoute } = require('./routes')
const { errorHandler, notFoundError } = require('./middlewares');


//init app
const app = express()
connectMongodb()

//third party middleware
app.use(express.json({ limit: "500mb" }))
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }))
app.use(morgan('dev'))

//routes section
app.use('/api/v1/auth', authRoute)

//not found route
app.use(notFoundError);

//error handler
app.use(errorHandler)

module.exports = app