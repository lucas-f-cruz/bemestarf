const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const enderecoSchema = new mongoose.Schema({
  label:      { type: String, default: 'Casa' },
  cep:        { type: String },
  rua:        { type: String },
  numero:     { type: String },
  complemento:{ type: String },
  bairro:     { type: String },
  cidade:     { type: String },
  estado:     { type: String },
  principal:  { type: Boolean, default: false },
}, { _id: true })

const userSchema = new mongoose.Schema({
  nome:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  senha:      { type: String, required: true, minlength: 6, select: false },
  telefone:   { type: String, trim: true },
  cpf:        { type: String, trim: true },
  dataNasc:   { type: Date },
  role:       { type: String, enum: ['cliente', 'admin', 'farmaceutico'], default: 'cliente' },
  ativo:      { type: Boolean, default: true },
  enderecos:  [enderecoSchema],
  pontosFidelidade: { type: Number, default: 0 },
  refreshToken: { type: String, select: false },
  resetSenhaToken:    { type: String, select: false },
  resetSenhaExpira:   { type: Date, select: false },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
})

// Hash senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next()
  this.senha = await bcrypt.hash(this.senha, 12)
  next()
})

// Comparar senha
userSchema.methods.verificarSenha = async function (senhaInformada) {
  return bcrypt.compare(senhaInformada, this.senha)
}

// Virtual: nome abreviado
userSchema.virtual('primeiroNome').get(function () {
  return this.nome.split(' ')[0]
})

module.exports = mongoose.model('User', userSchema)
