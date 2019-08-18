var express = require('express');
var router = express.Router();
var inventarioApi = require('./inventario.api');

/**
 * Extrae todos los inventarios de la base de datos, relacionados con la sucursal indicada
 */
router.post('/listar', function(req, res) {
    inventarioApi.listarInventario(req,res);
})

/**
 * Registra un nuevo inventario en la base de datos
 */
router.post('/add', function(req, res) {
    inventarioApi.registrarInventario(req,res);
})

router.post('/del', function(req, res) {
    inventarioApi.eliminarInventario(req,res);
})

router.post('/mod', function(req, res) {
    inventarioApi.modificarInventario(req,res);
})

router.post('/restar', function(req, res) {
    inventarioApi.restarInventario(req,res);
})

router.post('/eliminarTodo', function(req, res) {
    inventarioApi.eliminarInventarioTodo(req,res);
})

router.post('/listarPerfilLibro', function(req, res) {
    inventarioApi.listarPerfilLibro(req,res);
})

module.exports = router;