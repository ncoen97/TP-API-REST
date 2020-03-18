const cursosRouter = require('express').Router();

const auth = require('../auth/auth')

const { getCursos, getCurso, postCurso, deleteCurso } = require('./cursosController')
const { getAlumnos, getAlumnoDestacado } = require('../clientesCRUD/clientesController')

//cursosRouter.use(auth)

cursosRouter.get('/', getCursos)
cursosRouter.post('/', postCurso);

cursosRouter.delete('/:id',deleteCurso)
cursosRouter.get('/:id', getCurso);

cursosRouter.get('/:id/alumnos', getAlumnos)
cursosRouter.get('/:id/alumnoDestacado', getAlumnoDestacado)

module.exports = cursosRouter;
