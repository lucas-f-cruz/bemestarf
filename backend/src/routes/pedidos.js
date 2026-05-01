// ── routes/pedidos.js ──
const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/pedidoController')
const { proteger, restringir } = require('../middleware/auth')

router.use(proteger)

router.post('/',                 ctrl.criar)
router.get ('/meus',             ctrl.meusPedidos)
router.get ('/meus/:id',         ctrl.buscarUm)
router.patch('/meus/:id/cancelar', ctrl.cancelar)

// Admin
router.get ('/',                 restringir('admin'), ctrl.listarAdmin)
router.patch('/:id/status',      restringir('admin'), ctrl.atualizarStatus)

module.exports = router
