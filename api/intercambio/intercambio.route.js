var express = require('express');
var router = express.Router();
var intercambioApi = require('./intercambio.api');

router.post('/add', function(req, res) {
  intercambioApi.add(req,res);
})

router.post('/responder', function(req, res) {
  intercambioApi.responder(req,res);
})

router.post('/entregar', function(req, res) {
  intercambioApi.entregar(req,res);
})

router.post('/devolver', function(req, res) {
  intercambioApi.devolver(req,res);
})

router.post('/listar', function(req, res) {
  intercambioApi.listar(req,res);
})

router.post('/recibidos', function(req, res) {
  intercambioApi.recibidos(req,res);
})

router.post('/enviados', function(req, res) {
  intercambioApi.enviados(req,res);
})

module.exports = router;