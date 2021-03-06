require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cursosRouter = require('./cursosCRUD/cursosRouter');
const userRouter = require('./userCrud/userRouter')

const app = express();
const port = process.env.PORT || 8000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/cursos', cursosRouter);

app.use('/users',userRouter)

app.use('/', (req, res, next) => { res.status(200).json({code: 0, message: "Estás en la página de inicio :D"}) });

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/cursos";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        app.listen(port, () => { console.log(`Corriendo en port ${port}`) })
    })
    .catch(err => {
        console.log(err);
    });
