const Filial = require('../models/Filial')
const { asyncHandler } = require('../middleware/errorHandler')

exports.listar = asyncHandler(async (req, res) => {
  const filiais = await Filial.find({ ativa: true }).sort({ numero: 1 })
  res.json({ sucesso: true, filiais })
})

exports.buscarUma = asyncHandler(async (req, res) => {
  const filial = await Filial.findOne({ numero: req.params.numero, ativa: true })
  if (!filial) return res.status(404).json({ sucesso: false, erro: 'Filial não encontrada.' })
  res.json({ sucesso: true, filial })
})

exports.criar = asyncHandler(async (req, res) => {
  const filial = await Filial.create(req.body)
  res.status(201).json({ sucesso: true, filial })
})

exports.atualizar = asyncHandler(async (req, res) => {
  const filial = await Filial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!filial) return res.status(404).json({ sucesso: false, erro: 'Filial não encontrada.' })
  res.json({ sucesso: true, filial })
})
