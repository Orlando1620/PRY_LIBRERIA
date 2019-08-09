var express = require('express');
var router = express.Router();
var autorApi = require('./autor.api');


/**
 * Upload de multer
 */
router.post('/localUploadImg', function (req, res){
  autorApi.localUploadImg(req,res);
})

/**
 * Registra un nuevo autor en la base de datos
 */
router.post('/registrar', function(req, res) {
  autorApi.registrarAutor(req,res);
})

router.post('/modificar', function(req, res) {
  autorApi.modificarAutor(req,res);
})

/**
 * Extrae todos los autores de la base de datos
 */
router.get('/listar', function(req, res) {
  autorApi.listarAutores(req,res);
})

router.post('/autorById', function(req, res) {
  autorApi.autorById(req,res);
})

/**
 * Extrae los autores, que coincidan con la busqueda, de la base de datos
 */
router.post('/filtrar', function(req, res) {
  autorApi.filtrarAutores(req,res);
})

router.post('/obtenerAutor', function (req, res) {
  autorApi.obtenerAutor(req, res);
})


module.exports = router;