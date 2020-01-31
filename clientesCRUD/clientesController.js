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
					message: curso.alumno
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
	Curso.aggregate([
		{ 
			$unwind:'$alumno' 
		},
		{
			$sort: { 'alumno.nota': -1 }
		},
		{
			$limit: 1
		},		{
			$project:
			{
				alumno: 1,
				_id: 0
			}
		}
		])
	.then(alumno=>{
			if(!alumno){
				res.status(404).json({
					code: 12,
					message: "Recurso no encontrado"
				});

			} else {
				res.status(200).json({
					code: 0,
					message: alumno[0]
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
}

module.exports = { getAlumnos, getAlumnoDestacado };