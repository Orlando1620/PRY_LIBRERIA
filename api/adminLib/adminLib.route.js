'use strict';

let express = require('express');
let router = express.Router();
let adminLibApi = require('./adminLib.api');

router.route('/registrar_Admin_Lib').post(function(req , res){ 
    adminLibApi.registrar_Admin(req , res); 
});

router.post('/enviarContrasena', function (req, res){
    adminLibApi.enviarContrasena(req,res);
})

router.post('/perfil', function(req, res) {
    adminLibApi.perfil(req,res);
})

module.exports = router;