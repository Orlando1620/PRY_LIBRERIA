var express = require('express');
var router = express.Router();
var clubesApi = require('./clubes.api');

router.post('/addFisico', function (req, res) {
    clubesApi.addFisico(req, res);
})

router.post('/addVirtual', function (req, res) {
    clubesApi.addVirtual(req, res);
})

router.get('/listar', function (req, res) {
    clubesApi.listarClubes(req, res);
})

router.post('/listarClubesById', function (req, res) {
    clubesApi.listarClubesById(req, res);
})

router.post('/filtrarNombre', function (req, res) {
    clubesApi.filtrarLibrosNombre(req, res);
})

router.post('/filtrarGenTipo', function (req, res) {
    clubesApi.filtrarGenTipo(req, res);
})

router.post('/filtrarTipo', function (req, res) {
    clubesApi.filtrarTipo(req, res);
})
router.post('/validarGenClubes', function (req, res) {
    clubesApi.validarGeneroClubes(req, res);
});
router.post('/eliminarClub', function (req, res) {
    clubesApi.eliminarClub(req, res);
});
router.post('/modificarClub', function (req, res) {
    clubesApi.modificarClub(req, res);
});

router.post('/obtenerClubesLectura', function (req, res){
    clubesApi.obtenerClub(req, res);
})

router.post('/obtenerLibroClubesLectura', function (req, res){
    clubesApi.obtenerLibroClub(req, res);
})

router.post('/obtenerSucursalClubesLectura', function (req, res){
    clubesApi.obtenerSucursalClub(req, res);
})

router.post('/registrarUsuarioClub', function (req, res){
    clubesApi.unirseAlClub(req, res);
})

router.post('/deleteUsuario', function (req, res){
    clubesApi.deleteUsuario(req, res);
})

router.post('/verificarUsuario', function (req, res){
    clubesApi.verificarUsuario(req, res);
})

module.exports = router;