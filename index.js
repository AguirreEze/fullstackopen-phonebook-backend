require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { getAllData, getPersonById, addNewPerson, deletePerson, getInfo } = require('./controlers/controlers')
const { unknownEndpoint, errorHandler } = require('./utils/middlewares')

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.get('/api/persons', getAllData)
app.post('/api/persons', addNewPerson)
app.get('/api/persons/:id', getPersonById)
app.delete('/api/persons/:id', deletePerson)
app.get('/info', getInfo)

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
