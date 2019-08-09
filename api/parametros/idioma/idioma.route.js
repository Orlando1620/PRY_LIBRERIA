var express = require('express');
var router = express.Router();
var idiomaApi = require('./idioma.api');

router.get('/listar', function(req, res) {
  idiomaApi.listarIdiomas(req,res);
})

module.exports = router;