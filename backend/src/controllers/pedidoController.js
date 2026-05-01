const Pedido = require('../models/Pedido')
const Produto = require('../models/Produto')
const Cupom = require('../models/Cupom')
const User = require('../models/User')
const { asyncHandler } = require('../middleware/errorHandler')

// Criar pedido
exports.criar = asyncHandler(async (req, res) => {
  const { itens, pagamento, enderecoEntrega, cupom: codigoCupom, filial, observacoes } = req.body

  // Validar e montar itens com preços do banco
  let subtotal = 0
  const itensPedido = []

  for (const item of itens) {
    const produto = await Produto.findById(item.produtoId)
    if (!produto || !produto.ativo) {
      return res.status(400).json({ sucesso: false, erro: `Produto ${item.produtoId} não encontrado.` })
    }
    if (produto.estoque < item.quantidade) {
      return res.status(400).json({ sucesso: false, erro: `Estoque insuficiente para ${produto.nome}.` })
    }
    itensPedido.push({ produto: produto._id, nome: produto.nome, preco: produto.preco, quantidade: item.quantidade, emoji: produto.emoji })
    subtotal += produto.preco * item.quantidade
  }

  // Aplicar cupom
  let desconto = 0
  let frete = subtotal >= 89 ? 0 : 9.90

  if (codigoCupom) {
    const cupom = await Cupom.findOne({ codigo: codigoCupom.toUpperCase() })
    if (!cupom || !cupom.valido) {
      return res.status(400).json({ sucesso: false, erro: 'Cupom inválido ou expirado.' })
    }
    if (subtotal < cupom.pedidoMinimo) {
      return res.status(400).json({ sucesso: false, erro: `Pedido mínimo para este cupom: R$ ${cupom.pedidoMinimo.toFixed(2)}` })
    }
    if (cupom.tipo === 'percentual') desconto = subtotal * (cupom.valor / 100)
    else if (cupom.tipo === 'fixo') desconto = cupom.valor
    else if (cupom.tipo === 'frete_gratis') frete = 0
    await Cupom.findByIdAndUpdate(cupom._id, { $inc: { usoAtual: 1 } })
  }

  const total = Math.max(subtotal + frete - desconto, 0)

  // Criar pedido
  const pedido = await Pedido.create({
    usuario: req.usuario._id,
    itens: itensPedido,
    subtotal, frete, desconto, total,
    cupom: codigoCupom,
    filial, enderecoEntrega, observacoes,
    pagamento: { metodo: pagamento.metodo },
    historicoStatus: [{ status: 'aguardando_pagamento' }],
  })

  // Baixar estoque
  for (const item of itens) {
    await Produto.findByIdAndUpdate(item.produtoId, { $inc: { estoque: -item.quantidade } })
  }

  // Adicionar pontos de fidelidade (1 ponto a cada R$10)
  const pontos = Math.floor(total / 10)
  if (pontos > 0) {
    await User.findByIdAndUpdate(req.usuario._id, { $inc: { pontosFidelidade: pontos } })
  }

  // TODO: integrar Mercado Pago se pagamento.metodo === 'pix' ou 'cartao_credito'

  res.status(201).json({ sucesso: true, pedido })
})

// Listar pedidos do usuário
exports.meusPedidos = asyncHandler(async (req, res) => {
  const { pagina = 1, limite = 10 } = req.query
  const total = await Pedido.countDocuments({ usuario: req.usuario._id })
  const pedidos = await Pedido.find({ usuario: req.usuario._id })
    .sort({ createdAt: -1 })
    .skip((pagina - 1) * limite)
    .limit(Number(limite))
    .populate('itens.produto', 'nome emoji')

  res.json({ sucesso: true, total, paginas: Math.ceil(total / limite), pedidos })
})

// Detalhes de um pedido
exports.buscarUm = asyncHandler(async (req, res) => {
  const pedido = await Pedido.findOne({ _id: req.params.id, usuario: req.usuario._id })
    .populate('itens.produto', 'nome imagens emoji')
  if (!pedido) return res.status(404).json({ sucesso: false, erro: 'Pedido não encontrado.' })
  res.json({ sucesso: true, pedido })
})

// ── ADMIN ──

// Todos os pedidos (admin)
exports.listarAdmin = asyncHandler(async (req, res) => {
  const { status, pagina = 1, limite = 20 } = req.query
  const filtro = status ? { status } : {}
  const total = await Pedido.countDocuments(filtro)
  const pedidos = await Pedido.find(filtro)
    .sort({ createdAt: -1 })
    .skip((pagina - 1) * limite)
    .limit(Number(limite))
    .populate('usuario', 'nome email telefone')
  res.json({ sucesso: true, total, paginas: Math.ceil(total / limite), pedidos })
})

// Atualizar status (admin)
exports.atualizarStatus = asyncHandler(async (req, res) => {
  const { status, obs } = req.body
  const pedido = await Pedido.findByIdAndUpdate(
    req.params.id,
    { status, $push: { historicoStatus: { status, obs } } },
    { new: true }
  )
  if (!pedido) return res.status(404).json({ sucesso: false, erro: 'Pedido não encontrado.' })
  res.json({ sucesso: true, pedido })
})

// Cancelar pedido
exports.cancelar = asyncHandler(async (req, res) => {
  const pedido = await Pedido.findOne({ _id: req.params.id, usuario: req.usuario._id })
  if (!pedido) return res.status(404).json({ sucesso: false, erro: 'Pedido não encontrado.' })
  if (!['aguardando_pagamento', 'confirmado'].includes(pedido.status)) {
    return res.status(400).json({ sucesso: false, erro: 'Pedido não pode ser cancelado neste status.' })
  }
  // Devolver estoque
  for (const item of pedido.itens) {
    await Produto.findByIdAndUpdate(item.produto, { $inc: { estoque: item.quantidade } })
  }
  pedido.status = 'cancelado'
  pedido.historicoStatus.push({ status: 'cancelado', obs: req.body.motivo })
  await pedido.save()
  res.json({ sucesso: true, mensagem: 'Pedido cancelado.', pedido })
})
