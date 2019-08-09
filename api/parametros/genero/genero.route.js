var express = require('express');
var router = express.Router();
var generoApi = require('./genero.api');

router.get('/listar', function(req, res) {
  generoApi.listarGeneros(req,res);
})

router.post('/add', function(req , res){
  generoApi.registrarGenero(req,res);
});

router.post('/validar', function(req, res){
  generoApi.validarGenero(req, res);
});

router.post('/filtrar', function(req, res){
  generoApi.filtrarGenero(req, res);

});


module.exports = router;