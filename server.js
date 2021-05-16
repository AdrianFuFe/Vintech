require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const port = process.env.PORT;
const app = express();

//REQUERIMIENTO DE CONTROLLERS

//CONTROLERS FOR USERS
const {createUser} = require("./controllers/users/createUser");
const {activateUser} = require("./controllers/users/activateUser");
const {getUser} = require("./controllers/users/getUser");
const {logUser} = require("./controllers/users/logUser");
const {editUser} = require("./controllers/users/editUser");
const {deleteUser} = require("./controllers/users/deleteUser");
const {recPwd} = require("./controllers/users/recPwd");
const {resetPwd} = require("./controllers/users/resetPwd");

//CONTROLADORES DE PRODUCTO
const { newProduct } = require("./controllers/products/newProduct");

//REQUERIMIENTO DE MIDDLEWARES FUNCIONALIDADES
const { validAuth } = require("./middlewares/validAuth");
const { isSameUser } = require("./middlewares/isSameUser");

//APLICACIÓN DE MIDDLEWARES GENERALES
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload());


//ENDPOINTS
//USUARIO
//crear usuario
app.post("/user", createUser);
//activar usuario
app.put("/activation/:activationCode", activateUser);
//login user
app.get("/login", logUser);
//get user info
app.get("/user/:id", isSameUser, getUser);
//show user info (other)
//show user info (own)
//editar user
app.put("/user/:id",isSameUser, editUser);
//borrar-desactivar user
app.delete("/user/:id",isSameUser, deleteUser);
//recover pwd
app.put("/recoverPwd",recPwd);
//reset pwd
app.put("/reset/:code",resetPwd);

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
