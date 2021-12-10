const unknownEndpoint = (req, res) => {
  return res.status(404).json({
    error: 'Not found'
  })
}

const errorHandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') return response.status(400).send({ error: 'data used is Malformed' }).end()
  if (error.name === 'ValidationError') return response.status(400).send({ error: error.message }).end()
  return response.status(500).end()
}

module.exports = { unknownEndpoint, errorHandler }
