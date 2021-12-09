const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

console.log(connectionString)

mongoose.connect(connectionString)
  .then(console.log(connectionString))
  .catch(console.log)
