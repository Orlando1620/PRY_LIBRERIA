// JavaScript Document

var express = require('express');
var router = express.Router();
var pagoApi = require('./pago.api');

router.post('/add', function(req, res) {
  pagoApi.add(req,res);
})

router.post('/checkMetPago', function(req, res) {
  pagoApi.checkMetPago(req,res);
})

router.post('/modificar', function(req, res) {
  pagoApi.modPago(req,res);
})

module.exports = router;
