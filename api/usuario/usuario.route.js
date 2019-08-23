var express = require('express');
var router = express.Router();
var usuarioApi = require('./usuario.api');

router.route('/iniciar_sesion').post(function (req, res) {
    usuarioApi.iniciar_sesion(req, res);
});

router.post('/perfil', function (req, res) {
    usuarioApi.perfil(req, res);
});

router.get('/listar', function (req, res) {
    usuarioApi.listarUsuario(req, res);
});

router.post('/filtrar', function (req, res) {
    usuarioApi.filtrarUsuario(req, res);
});

router.post('/filtrarTipo', function (req, res) {
    usuarioApi.filtrarTipo(req, res);
});

router.post('/recuperarContrasena', function (req, res) {
    usuarioApi.recuperarContrasena(req, res);
});

router.post('/buscarUsuario', function (req, res) {
    usuarioApi.buscarUsuario(req, res);
});
router.post('/obtenerDatos', function (req, res){
    usuarioApi.obtenerDatos(req, res);
})

router.put('/guardarContra', function (req, res){
    usuarioApi.guardar(req, res);
})

router.post('/actualizarEstadoUsuario', function (req, res) {
    usuarioApi.actualizarEstadoUsuario(req, res);
});


router.post('/obtenerDatosAdmin', function(req, res){
    usuarioApi.obtenerDatosAdmin(req, res);
})

module.exports = router;