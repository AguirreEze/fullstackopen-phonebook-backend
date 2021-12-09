const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Name requires at least 3 Characters']
  },
  phone: {
    type: String,
    required: true,
    minlength: [8, 'Phone requires at least 8 digits']
  }
})

personSchema
  .plugin(uniqueValidator)
  .set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = model('Person', personSchema)

module.exports = Person
