var express = require('express');
var router = express.Router();
var sucursalApi = require('./promocion.api');


router.post('/add', function(req, res) {
  sucursalApi.registrarPromocion(req,res);
})

module.exports = router;
