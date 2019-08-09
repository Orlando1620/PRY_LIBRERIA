var express = require('express');
var router = express.Router();
var usuarioApi = require('./usuario.api');

router.route('/iniciar_sesion').post(function(req , res){
    usuarioApi.iniciar_sesion(req , res);
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



module.exports = router;