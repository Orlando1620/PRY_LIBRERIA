var express = require('express');
var path = require('path');
var app = express();
var multer = require('multer');
var nodemailer = require('nodemailer');

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://leerPlusUser:Fgo96t34RUHxmCaH@cluster0-qswzu.mongodb.net/LeePlusDB?retryWrites=true&w=majority',{useNewUrlParser: true});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'imgproyecto1', 
  api_key: '821889526661252', 
  api_secret: 't3pggGZsvRaomrQD0v2bpq4ZTVg',
  upload_preset: 'proyecto1'
});

//Permite el uso de JSON como parámetros del POST
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarioCliente', require('./api/usuarioCliente/usuarioCliente.route'));
app.use('/adminLib', require('./api/adminLib/adminLib.route'));
app.use('/adminGlobal', require('./api/adminGlobal/adminGlobal.route'));
app.use('/usuario', require('./api/usuario/usuario.route'));
app.use('/roles', require('./api/roles/roles.route'));
app.use('/autor', require('./api/autor/autor.route'));
app.use('/libro', require('./api/libro/libro.route'));
app.use('/sucursal', require('./api/sucursal/sucursal.route'));
app.use('/libreria', require('./api/libreria/libreria.route'));
app.use('/clubes', require('./api/clubes/clubes.routes'));
app.use('/categoria', require('./api/parametros/categoria/categoria.route'));
app.use('/genero', require('./api/parametros/genero/genero.route'));
app.use('/idioma', require('./api/parametros/idioma/idioma.route'));
app.use('/identificacion', require('./api/parametros/identificacion/identificacion.route'));
app.use('/sexo', require('./api/parametros/sexo/sexo.route'));
app.use('/bitacora', require('./api/bitacora/bitacora.route'));
app.use('/inventario', require('./api/inventario/inventario.route'));
app.use('/pago', require('./api/pago/pago.route'));

app.listen(8080, function() {
  console.log('Servidor corriendo en puerto 8080...')
});