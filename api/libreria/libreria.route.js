var express = require('express');
var router = express.Router();
var libreriaApi = require('./libreria.api');

/**
 * Extrae todas las librerias de la base de datos
 */
router.get('/listar', function(req, res) {
    libreriaApi.listarLibrerias(req,res);
})

router.post('/libById', function(req, res) {
    libreriaApi.libById(req,res);
})

router.post('/buscar', function(req, res) {
    libreriaApi.buscarLibreria(req,res);
})

router.post('/obtener_libreria', function(req, res) {
    libreriaApi.obtener_libreria(req,res);
})

module.exports = router;