var express = require('express');
var router = express.Router();
var adminGlobalApi = require('./adminGlobal.api');

router.post('/registrar', function(req, res) {
    adminGlobalApi.registrarUsuario(req,res);
});

router.post('/enviarContrasena', function (req, res){
    adminGlobalApi.enviarContrasena(req,res);
})

router.post('/buscar', function(req, res) {
    adminGlobalApi.buscarAdminGlobal(req,res);
})
  

module.exports = router;