var express = require('express');
var router = express.Router();
var intercambioApi = require('./intercambio.api');

router.post('/add', function(req, res) {
  intercambioApi.add(req,res);
})

router.post('/listar', function(req, res) {
  intercambioApi.listar(req,res);
})

module.exports = router;