var express = require('express');
var router = express.Router();
var compraApi = require('./compra.api');

router.post('/listar', function(req, res) {
    compraApi.listar(req,res);
})

router.post('/add', function(req, res) {
    compraApi.registrar(req,res);
})

module.exports = router;