const express = require('express')
const cors = require('cors')

const phonebook = [
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

app.get('/api/persons', (request, response) => {
  response.json(phonebook).end()
})

app.get('/info', (req, res) => {
  const ammount = phonebook.length
  const date = new Date()
  const data = `<p>Phonebook has info for ${ammount} people</p> <p>${date}</p>`
  res.send(data).end()
})

// app.use((request, response) => {
//   response.status(404).json({
//     error: 'Not found'
//   })
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
