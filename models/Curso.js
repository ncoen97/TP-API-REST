const mongoose = require('mongoose');

const Cliente = require('./Cliente');

const Curso = new mongoose.Schema({
	anio_de_dictado: { type: Number },
	duracion: { type: Number },
	tema: { type: String },
	alumnos: { type: [Cliente]}
}, {collection: 'cursos'});

module.exports = mongoose.model('Curso', Curso);
