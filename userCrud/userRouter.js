const userRouter = require('express').Router();

const User = require('../models/User')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//en '/users'
userRouter.post("/", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const newUser = new User({
            username: req.body.username,
            password: hash
        });
        newUser.save().then((response) => {
            console.log("Usuario creado")
            res.status(201).json({
                message: "Usuario creado",
                result: response
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    }).catch((error) => {
        res.status(500).json({
            error: error
        });
    });
});


// Sign-in
userRouter.post("/login", (req, res, next) => {
    let getUser;
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Error en la authentication"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Error en la authentication"
            });
        }
        let jwtToken = jwt.sign({
            username: getUser.username,
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        console.log("Usuario logeado")
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser.username
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Error en la authentication"
        });
    });
});

module.exports = userRouter;