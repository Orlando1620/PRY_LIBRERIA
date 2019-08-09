var express = require('express');
var router = express.Router();

var sexoApi = require('./sexo.api');

router.get('/listar', function(req, res) {
    sexoApi.listarSexo(req,res);
  
 

});

module.exports = router;