// Handler de erros global
const errorHandler = (err, req, res, next) => {
  let status  = err.statusCode || 500
  let message = err.message    || 'Erro interno do servidor'

  // Mongoose — ID inválido
  if (err.name === 'CastError') {
    status = 400; message = 'ID inválido'
  }

  // Mongoose — campo único duplicado
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue)[0]
    status = 400; message = `${campo} já está em uso.`
  }

  // Mongoose — validação
  if (err.name === 'ValidationError') {
    status = 400
    message = Object.values(err.errors).map(e => e.message).join('. ')
  }

  // JWT inválido
  if (err.name === 'JsonWebTokenError') {
    status = 401; message = 'Token inválido'
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('❌', err)
  }

  res.status(status).json({
    sucesso: false,
    erro: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

// Wrapper assíncrono — elimina try/catch nos controllers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = { errorHandler, asyncHandler }
