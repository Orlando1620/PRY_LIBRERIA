var express = require('express');
var router = express.Router();
var clubesApi = require('./clubes.api');

router.post('/addFisico', function(req, res) {
    clubesApi.addFisico(req,res);
})

router.post('/addVirtual', function(req, res) {
    clubesApi.addVirtual(req,res);
})

router.get('/listar', function (req, res){
    clubesApi.listarClubes(req,res);
})

router.post('/listarClubesById', function (req, res){
    clubesApi.listarClubesById(req,res);
})

router.post('/filtrarNombre', function (req, res){
    clubesApi.filtrarLibrosNombre(req,res);
})

router.post('/filtrarGenTipo', function (req, res){
    clubesApi.filtrarGenTipo(req,res);
})

router.post('/filtrarTipo', function (req, res){
	clubesApi.filtrarTipo(req,res);	
})


module.exports = router;