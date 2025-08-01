const { config } = require('dotenv')
config()
const express = require('express')
const bodyParser = require('body-parser')
const connectMongodb = require('./init/mongodb')
const morgan = require('morgan')
const { authRoute, categoryRoute, fileRoute, postRoute } = require('./routes')
const { errorHandler, notFoundError } = require('./middlewares');
const cors = require('cors')
const path = require('path')

//init app
const app = express()
connectMongodb()

//third party middleware
app.use(express.json({ limit: "500mb" }))
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }))
app.use(morgan('dev'))

//cors
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:5173", "http://127.0.0.1:4173", "https://react-blog-app-mr.vercel.app"] }))

//static file
app.use("/image", express.static(path.join(__dirname, "uploads")))
//routes section
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/file', fileRoute)
app.use('/api/v1/post', postRoute)

app.get('/', (req, res) => {
    res.send("hello")
})


//not found route
app.use(notFoundError);

//error handler
app.use(errorHandler)

module.exports = app