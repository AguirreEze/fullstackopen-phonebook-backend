require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/Person')

const phonebook = [
  // {
  //   id: 1,
  //   name: 'Arto Hellas',
  //   number: '040-123456'
  // },
  // {
  //   id: 2,
  //   name: 'Ada Lovelace',
  //   number: '39-44-5323523'
  // },
  // {
  //   id: 3,
  //   name: 'Dan Abramov',
  //   number: '12-43-234345'
  // },
  // {
  //   id: 4,
  //   name: 'Mary Poppendieck',
  //   number: '39-23-6423122'
  // }
]

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

app.post('/api/persons', async (req, res) => {
  const { name, phone } = req.body

  if (name === '') return res.json({ error: 'Name missing' }).end()
  if (phone === '') return res.json({ error: 'Phone missing' }).end()

  // const isOnList = await Person.findOne({ name: `${name}` })

  // if (isOnList) return res.json({ error: 'Name must be unique' }).end()

  const newPerson = new Person({
    name,
    phone
  })
  await newPerson.save()
  res.status(201).json(newPerson)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
