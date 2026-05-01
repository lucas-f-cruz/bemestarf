const Produto = require('../models/Produto')
const { asyncHandler } = require('../middleware/errorHandler')

// Listar produtos com filtros, paginação e busca
exports.listar = asyncHandler(async (req, res) => {
  const {
    busca, categoria, subcategoria, destaque,
    minPreco, maxPreco, emEstoque,
    pagina = 1, limite = 20,
    ordenar = 'nome',
  } = req.query

  const filtro = { ativo: true }

  if (busca)       filtro.$text = { $search: busca }
  if (categoria)   filtro.categoria = categoria
  if (subcategoria)filtro.subcategoria = subcategoria
  if (destaque)    filtro.destaque = destaque === 'true'
  if (emEstoque)   filtro.estoque = { $gt: 0 }
  if (minPreco || maxPreco) {
    filtro.preco = {}
    if (minPreco) filtro.preco.$gte = Number(minPreco)
    if (maxPreco) filtro.preco.$lte = Number(maxPreco)
  }

  const total = await Produto.countDocuments(filtro)
  const produtos = await Produto.find(filtro)
    .sort(ordenar)
    .skip((pagina - 1) * Number(limite))
    .limit(Number(limite))

  res.json({
    sucesso: true,
    total,
    pagina: Number(pagina),
    paginas: Math.ceil(total / limite),
    produtos,
  })
})

// Buscar por ID ou slug
exports.buscarUm = asyncHandler(async (req, res) => {
  const { id } = req.params
  const produto = await Produto.findOne({
    $or: [{ _id: id.match(/^[a-f\d]{24}$/i) ? id : null }, { slug: id }],
    ativo: true,
  })
  if (!produto) return res.status(404).json({ sucesso: false, erro: 'Produto não encontrado.' })
  res.json({ sucesso: true, produto })
})

// Criar produto (admin)
exports.criar = asyncHandler(async (req, res) => {
  const produto = await Produto.create(req.body)
  res.status(201).json({ sucesso: true, produto })
})

// Atualizar produto (admin)
exports.atualizar = asyncHandler(async (req, res) => {
  const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!produto) return res.status(404).json({ sucesso: false, erro: 'Produto não encontrado.' })
  res.json({ sucesso: true, produto })
})

// Deletar (soft delete)
exports.deletar = asyncHandler(async (req, res) => {
  await Produto.findByIdAndUpdate(req.params.id, { ativo: false })
  res.json({ sucesso: true, mensagem: 'Produto removido.' })
})

// Produtos em destaque
exports.destaques = asyncHandler(async (req, res) => {
  const produtos = await Produto.find({ ativo: true, destaque: true }).limit(10)
  res.json({ sucesso: true, produtos })
})

// Produtos por categoria
exports.porCategoria = asyncHandler(async (req, res) => {
  const { categoria } = req.params
  const produtos = await Produto.find({ ativo: true, categoria }).limit(20)
  res.json({ sucesso: true, categoria, produtos })
})
