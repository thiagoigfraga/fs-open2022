const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const postsRouter = require('./controllers/posts')

const logger = require('./utils/logger')
const { unknownEndpoint, errorHandler, requestLogger } = require('./utils/middleware')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI).then(() => {
  logger.info('Connected to MongoDB')
}).catch(error => {
  logger.info('error connecting to MongoDB:', error.message)
})


app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(requestLogger)

app.use('/api/posts',postsRouter)


app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app