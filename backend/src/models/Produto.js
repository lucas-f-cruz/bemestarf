const mongoose = require('mongoose')
const slugify = require('slugify')

const produtoSchema = new mongoose.Schema({
  nome:        { type: String, required: true, trim: true },
  slug:        { type: String, unique: true },
  descricao:   { type: String },
  preco:       { type: Number, required: true, min: 0 },
  precoOriginal: { type: Number },
  desconto:    { type: Number, default: 0, min: 0, max: 100 },  // %
  estoque:     { type: Number, default: 0, min: 0 },
  sku:         { type: String, trim: true },
  ean:         { type: String, trim: true },       // código de barras
  imagens:     [{ type: String }],
  emoji:       { type: String, default: '💊' },    // fallback visual
  categoria:   { type: String, required: true, enum: [
    'medicamentos', 'saude', 'beleza', 'higiene',
    'infantil', 'dermocosmeticos', 'mercearia', 'outros'
  ]},
  subcategoria:{ type: String },
  fabricante:  { type: String },
  principioAtivo: { type: String },
  necessitaReceita: { type: Boolean, default: false },
  controlado:  { type: Boolean, default: false },
  ativo:       { type: Boolean, default: true },
  destaque:    { type: Boolean, default: false },
  tags:        [{ type: String }],
  avaliacaoMedia: { type: Number, default: 0, min: 0, max: 5 },
  totalAvaliacoes:{ type: Number, default: 0 },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
})

// Auto-gerar slug
produtoSchema.pre('save', function (next) {
  if (this.isModified('nome')) {
    this.slug = slugify(this.nome, { lower: true, strict: true })
  }
  // Calcular preço com desconto
  if (this.precoOriginal && this.desconto > 0) {
    this.preco = parseFloat((this.precoOriginal * (1 - this.desconto / 100)).toFixed(2))
  }
  next()
})

// Virtual: em estoque
produtoSchema.virtual('emEstoque').get(function () {
  return this.estoque > 0
})

// Index para busca
produtoSchema.index({ nome: 'text', descricao: 'text', tags: 'text' })
produtoSchema.index({ categoria: 1, ativo: 1 })
produtoSchema.index({ destaque: 1 })

module.exports = mongoose.model('Produto', produtoSchema)
