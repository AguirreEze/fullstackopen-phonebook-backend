const Person = require('../models/Person')

const getAllData = async (req, res) => {
  const persons = await Person.find({})
  return res.json(persons).end()
}

const getPersonById = async (req, res) => {
  const { id } = req.params
  try {
    const person = await Person.findById(id)
    return res.json(person).end()
  } catch {
    return res.json({ error: 'person not found' }).status(400)
  }
}

const addNewPerson = (req, res, next) => {
  const { name, phone } = req.body

  const newPerson = new Person({
    name,
    phone
  })
  newPerson.save()
    .then(savedNote => res.status(201).json(savedNote.toJSON()))
    .catch(err => next(err))
}

const deletePerson = (req, res, next) => {
  const { id } = req.params

  Person.findByIdAndDelete(id)
    .then(deletedPerson => {
      console.log(deletedPerson)
      if (deletedPerson === null) return res.json({ error: 'person not found' }).status(400).end()
      return res.status(200).send(deletedPerson).end()
    })
    .catch(err => next(err))
}

const getInfo = async (req, res) => {
  const list = await Person.find({})
  const ammount = list.length
  const date = new Date()
  const data = `<p>Phonebook has info for ${ammount} people</p> <p>${date}</p>`
  return res.send(data).end()
}

module.exports = { getAllData, getPersonById, addNewPerson, deletePerson, getInfo }
