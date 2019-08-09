var express = require('express');
var router = express.Router();

var identificacionApi = require('./identificacion.api');

router.get('/listar', function(req, res) {
  identificacionApi.listarIdentificacion(req,res);
});

module.exports = router;