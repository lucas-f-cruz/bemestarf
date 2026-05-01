const mongoose = require('mongoose')

const contatoSchema = new mongoose.Schema({
  tipo:      { type: String, enum: ['duvida', 'feedback', 'reclamacao', 'sugestao', 'pedido', 'outro'], required: true },
  nome:      { type: String, required: true, trim: true },
  email:     { type: String, trim: true, lowercase: true },
  whatsapp:  { type: String, trim: true },
  filial:    { type: String },
  mensagem:  { type: String, required: true },
  respondido:{ type: Boolean, default: false },
  resposta:  { type: String },
  respondidoEm: { type: Date },
  ip:        { type: String },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Contato', contatoSchema)
