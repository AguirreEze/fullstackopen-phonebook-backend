const express = require('express')
const cors = require('cors')

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/persons', (req, res) => {
  res.json(phonebook).end()
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const person = phonebook.find((person) => person.id === id)
  if (person) res.json(person).end()
  else next()
})

app.post('/api/persons', (req, res) => {
  const data = req.body
  if (data.name === '') res.json({ error: 'Name missing' }).end()
  if (data.number === '') res.json({ error: 'Number missing' }).end()
  if (phonebook.find(person => person.name === data.name)) res.json({ error: 'Name must be unique' }).end()
  const newPerson = {
    id: Math.max(...phonebook.map(pers => pers.id)) + 1,
    name: data.name,
    number: data.number
  }
  phonebook = [...phonebook, newPerson]
  res.json(newPerson).end()
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const person = phonebook.find((person) => person.id === id)
  if (person) {
    phonebook = phonebook.filter((person) => person.id !== id)
    res.json(person).end()
  } else next()
})

app.get('/info', (req, res) => {
  const ammount = phonebook.length
  const date = new Date()
  const data = `<p>Phonebook has info for ${ammount} people</p> <p>${date}</p>`
  res.send(data).end()
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
