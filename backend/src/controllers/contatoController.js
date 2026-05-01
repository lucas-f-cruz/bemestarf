const Contato = require('../models/Contato')
const { asyncHandler } = require('../middleware/errorHandler')

// Enviar mensagem de contato (público)
exports.enviar = asyncHandler(async (req, res) => {
  const { tipo, nome, email, whatsapp, filial, mensagem } = req.body

  const contato = await Contato.create({
    tipo, nome, email, whatsapp, filial, mensagem,
    ip: req.ip,
  })

  // TODO: enviar e-mail de notificação para o admin

  res.status(201).json({
    sucesso: true,
    mensagem: 'Mensagem enviada! Retornaremos em breve.',
    id: contato._id,
  })
})

// Listar mensagens (admin)
exports.listar = asyncHandler(async (req, res) => {
  const { respondido, tipo, pagina = 1, limite = 20 } = req.query
  const filtro = {}
  if (respondido !== undefined) filtro.respondido = respondido === 'true'
  if (tipo) filtro.tipo = tipo

  const total = await Contato.countDocuments(filtro)
  const contatos = await Contato.find(filtro)
    .sort({ createdAt: -1 })
    .skip((pagina - 1) * limite)
    .limit(Number(limite))

  res.json({ sucesso: true, total, paginas: Math.ceil(total / limite), contatos })
})

// Responder (admin)
exports.responder = asyncHandler(async (req, res) => {
  const contato = await Contato.findByIdAndUpdate(
    req.params.id,
    { resposta: req.body.resposta, respondido: true, respondidoEm: new Date() },
    { new: true }
  )
  if (!contato) return res.status(404).json({ sucesso: false, erro: 'Mensagem não encontrada.' })
  res.json({ sucesso: true, contato })
})
