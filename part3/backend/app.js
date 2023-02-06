const config = require('../utils/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const { requestLogger,unknownEndpoint,errorHandler } = require('./utils/middleware')


mongoose.set('strictQuery', false)


logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes',notesRouter)


app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app