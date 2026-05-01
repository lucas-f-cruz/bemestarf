const mongoose = require('mongoose')

const filialSchema = new mongoose.Schema({
  numero:     { type: Number, required: true, unique: true },
  nome:       { type: String, required: true },
  bairro:     { type: String, required: true },
  cidade:     { type: String, default: 'Natal' },
  estado:     { type: String, default: 'RN' },
  endereco:   { type: String },
  cep:        { type: String },
  whatsapp:   { type: String, required: true },
  whatsappLink:{ type: String },
  instagram:  { type: String },
  instagramLink:{ type: String },
  horario: {
    semana:   { type: String, default: '7h às 22h' },
    sabado:   { type: String, default: '7h às 22h' },
    domingo:  { type: String, default: '8h às 20h' },
  },
  coordenadas: {
    lat: Number,
    lng: Number,
  },
  ativa:      { type: Boolean, default: true },
  aberta:     { type: Boolean, default: true },  // atualizado em tempo real
}, {
  timestamps: true,
})

module.exports = mongoose.model('Filial', filialSchema)
