require('dotenv').config()
const express   = require('express')
const cors      = require('cors')
const helmet    = require('helmet')
const morgan    = require('morgan')
const rateLimit = require('express-rate-limit')

const connectDB      = require('./config/database')
const { errorHandler } = require('./middleware/errorHandler')

// Rotas
const authRoutes    = require('./routes/auth')
const produtosRoutes= require('./routes/produtos')
const pedidosRoutes = require('./routes/pedidos')
const filiaisRoutes = require('./routes/filiais')
const contatoRoutes = require('./routes/contato')

const app = express()

// ── Conectar banco ──
connectDB()

// ── Segurança ──
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// ── Rate limiting ──
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: 20,
  message: { sucesso: false, erro: 'Muitas tentativas. Tente em 15 minutos.' }
}))
app.use('/api', rateLimit({
  windowMs: 60 * 1000,  // 1 min
  max: 100,
}))

// ── Parsers ──
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Logging ──
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// ── Static uploads ──
app.use('/uploads', express.static('uploads'))

// ── Rotas ──
app.use('/api/auth',     authRoutes)
app.use('/api/produtos', produtosRoutes)
app.use('/api/pedidos',  pedidosRoutes)
app.use('/api/filiais',  filiaisRoutes)
app.use('/api/contato',  contatoRoutes)

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({
    sucesso: true,
    servico: 'Bem Estar Farma API',
    versao: '1.0.0',
    ambiente: process.env.NODE_ENV,
    data: new Date().toISOString(),
  })
})

// ── 404 ──
app.use((req, res) => {
  res.status(404).json({ sucesso: false, erro: `Rota ${req.originalUrl} não encontrada.` })
})

// ── Error handler global ──
app.use(errorHandler)

// ── Iniciar ──
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 Bem Estar Farma API rodando na porta ${PORT}`)
  console.log(`📋 Ambiente: ${process.env.NODE_ENV}`)
  console.log(`🌐 Health: http://localhost:${PORT}/api/health\n`)
})

module.exports = app
