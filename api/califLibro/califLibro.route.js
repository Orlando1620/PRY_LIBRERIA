var express = require('express');
var router = express.Router();
var califApi = require('./califLibro.api');

router.post('/add', function(req, res) {
  califApi.add(req,res);
})

router.post('/listar', function(req, res) {
  califApi.listar(req,res);
})


router.get('/listarTodo', function(req, res) {
  califApi.listarTodo(req,res);
})

router.post('/listarById', function(req, res) {
  califApi.listarById(req,res);
})


module.exports = router;