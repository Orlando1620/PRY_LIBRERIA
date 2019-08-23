'use strict';

let mongoose = require('mongoose');

let registroSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido1: { type: String, required: true },
    apellido2: { type: String, required: true },
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    changePassword: Boolean,
    estado: {type: Number, default: 0},
    eliminado: {type: Boolean, default: false},
    bloqueado: { type: Boolean, required: true },
    tipo: { type: String, required: true },
    fechaNaci: { type: String, required: true },
    tipoIdentificacion: { type: String, required: true },
    identificacion: { type: String, required: true },
    tipoSexo: { type: String, required: true }
});


module.exports = mongoose.model('AdminLib', registroSchema, 'Usuarios');