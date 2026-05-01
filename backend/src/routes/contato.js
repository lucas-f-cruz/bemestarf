const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/contatoController')
const { proteger, restringir } = require('../middleware/auth')

router.post('/',           ctrl.enviar)
router.get ('/',           proteger, restringir('admin'), ctrl.listar)
router.patch('/:id',       proteger, restringir('admin'), ctrl.responder)

module.exports = router
