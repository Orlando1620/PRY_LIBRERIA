var express = require('express');
var router = express.Router();
var impuestoApi = require('./impuesto.api');

router.get('/listar', function(req, res) {
    impuestoApi.listarImpuesto(req,res);
})

module.exports = router;