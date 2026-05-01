const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Proteger rota — exige token válido
exports.proteger = async (req, res, next) => {
  try {
    let token

    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ sucesso: false, erro: 'Não autorizado. Faça login.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const usuario = await User.findById(decoded.id).select('-senha')

    if (!usuario || !usuario.ativo) {
      return res.status(401).json({ sucesso: false, erro: 'Usuário não encontrado ou inativo.' })
    }

    req.usuario = usuario
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ sucesso: false, erro: 'Token expirado. Faça login novamente.' })
    }
    return res.status(401).json({ sucesso: false, erro: 'Token inválido.' })
  }
}

// Restringir por role
exports.restringir = (...roles) => (req, res, next) => {
  if (!roles.includes(req.usuario.role)) {
    return res.status(403).json({ sucesso: false, erro: 'Você não tem permissão para esta ação.' })
  }
  next()
}

// Gerar tokens
exports.gerarTokens = (id) => {
  const access = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
  const refresh = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN })
  return { access, refresh }
}
