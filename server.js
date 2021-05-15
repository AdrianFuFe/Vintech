require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const port = process.env.PORT;
const app = express();

//REQUERIMIENTO DE CONTROLLERS

//CONTROLERS FOR USERS
const {createUser} = require("./controllers/users/createUser");
const {activateUser} = require("./controllers/users/activateUser");
const {getUser} = require("./controllers/users/getUser");
const {logUser} = require("./controllers/users/logUser");

//CONTROLADORES DE PRODUCTO
const { newProduct } = require("./controllers/products/newProduct");

//REQUERIMIENTO DE MIDDLEWARES FUNCIONALIDADES
const { validAuth } = require("./middlewares/validAuth");

//APLICACIÓN DE MIDDLEWARES GENERALES
app.use(morgan("dev"));
app.use(bodyParser.json());


//ENDPOINTS
//USUARIO
//crear usuario
app.post("/user", createUser);
//activar usuario
app.put("/activation/:activationCode", activateUser);
//login user
app.get("/login", logUser);
//get user info
app.get("/user/:id", validAuth, getUser);
//show user info (other)
//show user info (own)
//recover pass
//edit user
//delete user

//CREAR PRODUCTO
app.post("/product", validAuth, newProduct);



//MIDDLEWARE DE GESTIÓN DE ERRORES
app.use((error, req, res, next) => {
  if (error) {
    res.status(error.httpStatus || 500).send({ error: error.message });
  }
});

//INICIO DE PUERTO
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
