const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { gerarTokens } = require('../middleware/auth')
const { asyncHandler } = require('../middleware/errorHandler')

// Registrar
exports.registrar = asyncHandler(async (req, res) => {
  const { nome, email, senha, telefone } = req.body

  const existe = await User.findOne({ email })
  if (existe) return res.status(400).json({ sucesso: false, erro: 'E-mail já cadastrado.' })

  const usuario = await User.create({ nome, email, senha, telefone })
  const { access, refresh } = gerarTokens(usuario._id)

  await User.findByIdAndUpdate(usuario._id, { refreshToken: refresh })

  res.status(201).json({
    sucesso: true,
    token: access,
    refreshToken: refresh,
    usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email, role: usuario.role },
  })
})

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, senha } = req.body
  if (!email || !senha) return res.status(400).json({ sucesso: false, erro: 'Informe e-mail e senha.' })

  const usuario = await User.findOne({ email }).select('+senha')
  if (!usuario || !(await usuario.verificarSenha(senha))) {
    return res.status(401).json({ sucesso: false, erro: 'E-mail ou senha inválidos.' })
  }
  if (!usuario.ativo) return res.status(403).json({ sucesso: false, erro: 'Conta desativada.' })

  const { access, refresh } = gerarTokens(usuario._id)
  await User.findByIdAndUpdate(usuario._id, { refreshToken: refresh })

  res.json({
    sucesso: true,
    token: access,
    refreshToken: refresh,
    usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email, role: usuario.role, pontosFidelidade: usuario.pontosFidelidade },
  })
})

// Refresh token
exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) return res.status(401).json({ sucesso: false, erro: 'Refresh token não informado.' })

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  const usuario = await User.findById(decoded.id).select('+refreshToken')

  if (!usuario || usuario.refreshToken !== refreshToken) {
    return res.status(401).json({ sucesso: false, erro: 'Refresh token inválido.' })
  }

  const { access, refresh } = gerarTokens(usuario._id)
  await User.findByIdAndUpdate(usuario._id, { refreshToken: refresh })

  res.json({ sucesso: true, token: access, refreshToken: refresh })
})

// Perfil do usuário logado
exports.meuPerfil = asyncHandler(async (req, res) => {
  const usuario = await User.findById(req.usuario._id)
  res.json({ sucesso: true, usuario })
})

// Atualizar perfil
exports.atualizarPerfil = asyncHandler(async (req, res) => {
  const campos = ['nome', 'telefone', 'cpf', 'dataNasc', 'enderecos']
  const atualizacoes = {}
  campos.forEach(c => { if (req.body[c] !== undefined) atualizacoes[c] = req.body[c] })

  const usuario = await User.findByIdAndUpdate(req.usuario._id, atualizacoes, { new: true, runValidators: true })
  res.json({ sucesso: true, usuario })
})

// Trocar senha
exports.trocarSenha = asyncHandler(async (req, res) => {
  const { senhaAtual, novaSenha } = req.body
  const usuario = await User.findById(req.usuario._id).select('+senha')

  if (!(await usuario.verificarSenha(senhaAtual))) {
    return res.status(400).json({ sucesso: false, erro: 'Senha atual incorreta.' })
  }

  usuario.senha = novaSenha
  await usuario.save()
  res.json({ sucesso: true, mensagem: 'Senha alterada com sucesso.' })
})

// Logout
exports.logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.usuario._id, { refreshToken: null })
  res.json({ sucesso: true, mensagem: 'Logout realizado.' })
})
