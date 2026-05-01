// ── routes/auth.js ──
const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/authController')
const { proteger } = require('../middleware/auth')

router.post('/registrar',        ctrl.registrar)
router.post('/login',            ctrl.login)
router.post('/refresh',          ctrl.refreshToken)
router.post('/logout',           proteger, ctrl.logout)
router.get ('/me',               proteger, ctrl.meuPerfil)
router.patch('/me',              proteger, ctrl.atualizarPerfil)
router.patch('/me/senha',        proteger, ctrl.trocarSenha)

module.exports = router
