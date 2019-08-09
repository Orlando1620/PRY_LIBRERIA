var express = require('express');
var router = express.Router();
var usuarioApi = require('./usuarioCliente.api');

router.post('/registrar', function(req, res) {
    usuarioApi.registrarUsuario(req,res);
});

/**
 * Upload de multer
 */
router.post('/localUploadImg', function (req, res){
    usuarioApi.localUploadImg(req,res);
})

router.post('/enviarContrasena', function (req, res){
    usuarioApi.enviarContrasena(req,res);
})

router.post('/perfil', function (req, res){
    usuarioApi.perfil(req,res);
})
  

module.exports = router;