var express = require('express');
var router = express.Router();

var rolesApi = require('./roles.api');

router.get('/listar', function (req, res) {
    rolesApi.listarRoles(req, res);

});



module.exports = router;