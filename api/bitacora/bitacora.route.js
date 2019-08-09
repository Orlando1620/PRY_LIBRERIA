var express = require('express');
var router = express.Router();
var bitacoraApi = require('./bitacora.api');

/**
 * Extrae todos los autores de la base de datos
 */
router.get('/listar', function(req, res) {
    bitacoraApi.listarBitacora(req,res);
})

/**
 * Registra un nuevo autor en la base de datos
 */
router.post('/add', function(req, res) {
    bitacoraApi.registrarBitacora(req,res);
})


module.exports = router;