var express = require('express');
var router = express.Router();
var ventaApi = require('./venta.api');

router.post('/listar', function(req, res) {
    ventaApi.listar(req,res);
})

router.get('/listarTodo', function(req, res) {
    ventaApi.listarTodo(req,res);
})

router.post('/add', function(req, res) {
    ventaApi.registrar(req,res);
})

module.exports = router;