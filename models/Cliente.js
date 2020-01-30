const mongoose = require('mongoose');

const Cliente = new mongoose.Schema({
    nombre: { type: String },
    apellido: { type: String },
    DNI: { type: Number },
    direccion: { type: String }
});

module.exports = Cliente;
