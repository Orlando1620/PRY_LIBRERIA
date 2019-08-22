var express = require('express');
var router = express.Router();
var categoriaApi = require('./categoria.api');

router.get('/listar', function (req, res) {
  categoriaApi.listarCategorias(req, res);
})

router.post('/add', function (req, res) {
  categoriaApi.registrarCategoria(req, res);
});

router.post('/validar', function (req, res) {
  categoriaApi.validarCategoria(req, res);
});

router.post('/filtrar', function (req, res) {
  categoriaApi.filtrarCategoria(req, res);

});
router.post('/del', function (req, res) {
  categoriaApi.eliminarCategoria(req, res);
});
router.post('/mod', function (req, res) {
  categoriaApi.modificarCategoria(req, res);
});
module.exports = router;