const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/filialController')
const { proteger, restringir } = require('../middleware/auth')

router.get ('/',          ctrl.listar)
router.get ('/:numero',   ctrl.buscarUma)
router.post('/',          proteger, restringir('admin'), ctrl.criar)
router.patch('/:id',      proteger, restringir('admin'), ctrl.atualizar)

module.exports = router
