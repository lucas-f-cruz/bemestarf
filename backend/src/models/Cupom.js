const mongoose = require('mongoose')

const cupomSchema = new mongoose.Schema({
  codigo:       { type: String, required: true, unique: true, uppercase: true, trim: true },
  tipo:         { type: String, enum: ['percentual', 'fixo', 'frete_gratis'], required: true },
  valor:        { type: Number, required: true },   // % ou R$
  pedidoMinimo: { type: Number, default: 0 },
  usoMaximo:    { type: Number, default: null },     // null = ilimitado
  usoAtual:     { type: Number, default: 0 },
  validade:     { type: Date },
  ativo:        { type: Boolean, default: true },
  categorias:   [{ type: String }],                 // restrição por categoria
}, {
  timestamps: true,
})

cupomSchema.virtual('valido').get(function () {
  if (!this.ativo) return false
  if (this.validade && this.validade < new Date()) return false
  if (this.usoMaximo !== null && this.usoAtual >= this.usoMaximo) return false
  return true
})

module.exports = mongoose.model('Cupom', cupomSchema)
