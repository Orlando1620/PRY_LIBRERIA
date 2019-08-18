var express = require('express');
var router = express.Router();
var promocionApi = require('./promocion.api');


router.post('/add', function(req, res) {
  promocionApi.registrarPromocion(req,res);
})

router.post('/localUploadImg', function (req, res){
  promocionApi.localUploadImg(req,res);
})

router.get('/listar', function(req, res){
  promocionApi.listarPromo(req, res);
})

router.post('/listarBySuc', function(req, res){
  promocionApi.listarBySuc(req, res);
})
router.get('/listarTodo', function (req, res){
  promocionApi.listarTodo(req,res);
})

module.exports = router;
