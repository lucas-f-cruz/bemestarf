import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
})

// Adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
import api from '@/services/api'

// Buscar filiais do banco (em vez do data/index.js)
const { data } = await api.get('/filiais')

// Login
const { data } = await api.post('/auth/login', { email, senha })
localStorage.setItem('token', data.token)

// Enviar contato
await api.post('/contato', { tipo, nome, email, mensagem })