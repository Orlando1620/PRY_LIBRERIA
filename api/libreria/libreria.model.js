var mongoose = require('mongoose');

var registroSchema = new mongoose.Schema({
    nombreComercial: { type: String, required: true },
    admin_id: { type: String, required: true },
    nombreFantasia: { type: String, required: true },
    tipo : { type: String, required: true },
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true }
});


module.exports = mongoose.model('Libreria', registroSchema, 'Librerias');