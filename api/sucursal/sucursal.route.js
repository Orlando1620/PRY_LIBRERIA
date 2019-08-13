var express = require('express');
var router = express.Router();
var sucursalApi = require('./sucursal.api');

router.post('/visualizar', function (req, res) {
    sucursalApi.perfilSucursal(req, res);
})

router.post('/listarSucursalInv', function (req, res) {
    sucursalApi.listarSucursalInv(req, res);
})

router.post('/add', function (req, res) {
    sucursalApi.registrarSucursal(req, res);
})

router.post('/eliminar', function (req, res) {
    sucursalApi.eliminarSucursal(req, res);
})

router.post('/listar', function (req, res) {
    sucursalApi.listarSucursal(req, res);
})

router.get('/listarTodo', function (req, res) {
    sucursalApi.listarSucursalTodo(req, res);
})

router.post('/obtener_Sucursal', function(req, res) {
    sucursalApi.obtener_Sucursal(req,res);
})

router.post('/filtrar', function (req, res) {
    sucursalApi.filtrarSucursal(req, res);
})

router.put('/modificar', function (req, res) {
    sucursalApi.modificarSucursal(req, res);
})
module.exports = router;