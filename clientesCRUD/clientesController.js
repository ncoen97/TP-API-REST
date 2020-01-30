const Curso = require('../models/Curso');

const getAlumnos = (req, res, next) =>{
	const id = req.params.id;

	Curso.findById(id)
		.then(curso=>{
			if(!curso){
				res.status(404).json({
					code: 12,
					message: "Recurso no encontrado"
				});

			} else {
				res.status(200).json({
					code: 0,
					message: curso.alumnos
				});
			}
		})
		.catch(err => {
            console.log(err);
            res.status(500).json({
               code: 20,
               message: "Ocurrió un error con un módulo interno"
            });
        });

};

const getAlumnoDestacado = (req, res, next)=>{
	const id = req.params.id;
}

module.exports = { getAlumnos, getAlumnoDestacado };