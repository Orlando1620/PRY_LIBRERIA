var express = require('express');
var router = express.Router();
var libreriaApi = require('./libreria.api');
var sucursalesApi = require('../sucursal/sucursal.api');

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

router.post('/filtrarLibreria', function(req, res){
    libreriaApi.filtrarLibreria(req, res);
})

router.put('/modificar', function(req, res){
    libreriaApi.modificarLibreria(req, res); 
})

router.post('/eliminar', function(req, res){
    libreriaApi.eliminarLibreria(req, res); 
})

router.post('/obtener', function(req, res){
    sucursalesApi.listarSucursal(req, res);
})

router.post('/listarSolicitudes', function(req, res){
    libreriaApi.listarLibreriasSolicitudRegistro(req, res);
})

router.put('/actualizarSolicitud', function(req, res){
    libreriaApi.actualizarSolicitud(req, res);
})
module.exports = router;