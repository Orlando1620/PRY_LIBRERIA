var express = require('express');
var router = express.Router();
var libroApi = require('./libro.api');

/**
 * post para registrar un libro
 */
router.post('/registrarDigital', function(req, res) {
  libroApi.registrarLibroDigital(req,res);
})

router.post('/registrarImpreso', function(req, res) {
    libroApi.registrarLibroImpreso(req,res);
  })

router.post('/modificarDigital', function(req, res) {
  libroApi.modificarLibroDigital(req,res);
})

router.post('/modificarImpreso', function(req, res) {
  libroApi.modificarLibroImpreso(req,res);
})

/**
 * Revisa si existe un libro con el mismo ISBN
 */
router.post('/validarISBN', function(req, res) {
    libroApi.validarISBN(req,res);
})

/**
 * Upload de multer
 */
router.post('/localUpload', function (req, res){
    libroApi.localUpload(req,res);
})

/**
 * Extrae la lista completa de libros registrados en la aplicacion
 */
router.get('/listar', function (req, res){
  libroApi.listarLibros(req,res);
})

/**
* Extrae la lista de libros que cumpla con el criterio de busqueda
*/
router.post('/filtrarNombre', function (req, res){
  libroApi.filtrarLibrosNombre(req,res);
})

/**
* Extrae la lista de libros que cumpla con el criterio de busqueda
*/
router.post('/filtrarGenCat', function (req, res){
  libroApi.filtrarLibrosGenCat(req,res);
})

router.post('/perfil', function (req, res){
  libroApi.perfilLibro(req,res);
})

router.post('/verificarAsociacionLibro', function(req, res){
  libroApi.verificarAsociacionLibro(req,res);
})

router.post('/deleteLibro', function(req, res){
  libroApi.deleteLibro(req, res);
})
module.exports = router;