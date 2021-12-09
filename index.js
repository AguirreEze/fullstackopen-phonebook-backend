require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/Person')

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({})
  return res.json(persons).end()
})

app.get('/api/persons/:id', async (req, res) => {
  const { id } = req.params
  try {
    const person = await Person.findById(id)
    return res.json(person).end()
  } catch {
    return res.json({ error: 'person not found' }).status(400)
  }
})

app.post('/api/persons', (req, res, next) => {
  const { name, phone } = req.body

  // if (name === '') return res.json({ error: 'Name missing' }).end()
  // if (phone === '') return res.json({ error: 'Phone missing' }).end()
  const newPerson = new Person({
    name,
    phone
  })
  newPerson.save()
    .then(savedNote => res.status(201).json(savedNote.toJSON()))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', async (req, res) => {
  const { id } = req.params
  try {
    const person = await Person.findByIdAndDelete(id)
    return res.status(204).json(person).end()
  } catch {
    return res.json({ error: 'person not found' }).status(400)
  }
})

app.get('/info', async (req, res) => {
  const list = await Person.find({})
  const ammount = list.length
  const date = new Date()
  const data = `<p>Phonebook has info for ${ammount} people</p> <p>${date}</p>`
  return res.send(data).end()
})

app.use((req, res) => {
  return res.status(404).json({
    error: 'Not found'
  })
})
app.use((error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') response.status(400).send({ error: 'data used is Malformed' })
  else if (error.name === 'ValidationError') response.status(400).send({ error: error.message })
  else response.status(500).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
