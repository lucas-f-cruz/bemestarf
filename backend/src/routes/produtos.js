const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/produtoController')
const { proteger, restringir } = require('../middleware/auth')

// Públicas
router.get ('/',                 ctrl.listar)
router.get ('/destaques',        ctrl.destaques)
router.get ('/categoria/:categoria', ctrl.porCategoria)
router.get ('/:id',              ctrl.buscarUm)

// Admin
router.post('/',                 proteger, restringir('admin'), ctrl.criar)
router.patch('/:id',             proteger, restringir('admin'), ctrl.atualizar)
router.delete('/:id',            proteger, restringir('admin'), ctrl.deletar)

module.exports = router
