var express = require('express');
var router = express.Router();
var usuarioApi = require('./usuarioCliente.api');

router.post('/registrar', function (req, res) {
    usuarioApi.registrarUsuario(req, res);
});

/**
 * Upload de multer
 */
router.post('/localUploadImg', function (req, res) {
    usuarioApi.localUploadImg(req, res);
})

router.post('/enviarContrasena', function (req, res) {
    usuarioApi.enviarContrasena(req, res);
})

router.post('/perfil', function (req, res) {
    usuarioApi.perfil(req, res);
})

router.post('/compra', function (req, res) {
    usuarioApi.compra(req, res);
})

router.post('/califLibro', function (req, res) {
    usuarioApi.califLibro(req, res);
})

router.post('/modFavorito', function (req, res) {
    usuarioApi.modFavorito(req, res);
})

router.post('/actualizarCantidad', function (req, res){
    usuarioApi.actualizarCantidad(req,res);
})

router.post('/modificarUsuarioCliente', function (req, res) {
    usuarioApi.modificarUsuarioCliente(req, res);
});

router.post('/modLibroIntercambio', function (req, res) {
    usuarioApi.modLibroIntercambio(req, res);
});
module.exports = router;