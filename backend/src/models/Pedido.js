const mongoose = require('mongoose')

const itemPedidoSchema = new mongoose.Schema({
  produto:    { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  nome:       { type: String, required: true },    // snapshot do nome na hora
  preco:      { type: Number, required: true },    // snapshot do preço
  quantidade: { type: Number, required: true, min: 1 },
  emoji:      { type: String },
}, { _id: false })

const enderecoEntregaSchema = new mongoose.Schema({
  cep:        String, rua: String, numero: String,
  complemento:String, bairro: String, cidade: String, estado: String,
}, { _id: false })

const pedidoSchema = new mongoose.Schema({
  numero:     { type: String, unique: true },   // ex: BEF-2025-00001
  usuario:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itens:      [itemPedidoSchema],

  subtotal:   { type: Number, required: true },
  frete:      { type: Number, default: 0 },
  desconto:   { type: Number, default: 0 },
  total:      { type: Number, required: true },

  cupom:      { type: String },
  filial:     { type: String },               // filial de retirada (opcional)

  enderecoEntrega: enderecoEntregaSchema,

  pagamento: {
    metodo:   { type: String, enum: ['pix', 'cartao_credito', 'cartao_debito', 'dinheiro'], required: true },
    status:   { type: String, enum: ['pendente', 'aprovado', 'recusado', 'estornado'], default: 'pendente' },
    mpPaymentId:   String,    // ID Mercado Pago
    mpStatus:      String,
    pixQrCode:     String,
    pixQrCodeBase64: String,
    pixExpira:     Date,
    pagoEm:        Date,
  },

  status: {
    type: String,
    enum: ['aguardando_pagamento', 'confirmado', 'em_separacao', 'saiu_para_entrega', 'entregue', 'cancelado'],
    default: 'aguardando_pagamento',
  },

  observacoes: String,
  notaFiscal:  String,
  rastreio:    String,

  historicoStatus: [{
    status:    String,
    data:      { type: Date, default: Date.now },
    obs:       String,
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
})

// Auto-gerar número do pedido
pedidoSchema.pre('save', async function (next) {
  if (!this.numero) {
    const count = await mongoose.model('Pedido').countDocuments()
    const ano = new Date().getFullYear()
    this.numero = `BEF-${ano}-${String(count + 1).padStart(5, '0')}`
  }
  next()
})

pedidoSchema.index({ usuario: 1, createdAt: -1 })
pedidoSchema.index({ numero: 1 })
pedidoSchema.index({ status: 1 })

module.exports = mongoose.model('Pedido', pedidoSchema)
