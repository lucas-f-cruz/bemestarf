const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`)
  } catch (err) {
    console.error(`❌ Erro MongoDB: ${err.message}`)
    process.exit(1)
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB desconectado')
})

module.exports = connectDB
