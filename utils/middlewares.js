const unknownEndpoint = (req, res) => {
  return res.status(404).json({
    error: 'Not found'
  })
}

const errorHandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') response.status(400).send({ error: 'data used is Malformed' })
  else if (error.name === 'ValidationError') response.status(400).send({ error: error.message })
  else response.status(500).end()
}

module.exports = { unknownEndpoint, errorHandler }
