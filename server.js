require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const port = process.env.PORT;
const app = express();

//REQUERIMIENTO DE CONTROLLERS

//CONTROLERS FOR USERS
const { createUser } = require("./controllers/users/createUser");
const { activateUser } = require("./controllers/users/activateUser");
const { getUser } = require("./controllers/users/getUser");
const { logUser } = require("./controllers/users/logUser");
const { editUser } = require("./controllers/users/editUser");
const { deleteUser } = require("./controllers/users/deleteUser");
const { recoverPwd } = require("./controllers/users/recoverPwd");
const { resetPwd } = require("./controllers/users/resetPwd");
const { changePwd } = require("./controllers/users/changePwd");

//CONTROLADORES DE PRODUCTO
const { newProduct } = require("./controllers/products/newProduct");
const { getProduct } = require("./controllers/products/getProduct");
const { listProducts } = require("./controllers/products/listProducts");
const { editProduct } = require("./controllers/products/editProduct");
const { deleteProduct } = require("./controllers/products/deleteProduct");
const { addImgProduct } = require("./controllers/products/addImgProduct");
const { deleteImgProduct } = require("./controllers/products/deleteImgProduct");

//CONTROLADORES DE MENSAJE
const { sendMessage } = require("./controllers/messages/sendMessage");
const {
  listConversations,
} = require("./controllers/messages/listConversations");
const { listMessages } = require("./controllers/messages/listMessages");

//REQUERIMIENTO DE MIDDLEWARES FUNCIONALIDADES
const { validAuth } = require("./middlewares/validAuth");
const { isSameUser } = require("./middlewares/isSameUser");
const { canEdit } = require("./middlewares/canEdit");

//APLICACIÓN DE MIDDLEWARES GENERALES
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload());

//APLICACIÓN DE CONTROLADORES PARA ENDPOINTS

//USUARIO
//CREAR USUARIO
app.post("/user", createUser);
//ACTIVAR USUARIO
app.get("/activation/:activationCode", activateUser);
//LOGIN USUARIO
app.get("/login", logUser);
//OBTENER INFORMACIÓN DE USUARIO
app.get("/user/:id", validAuth, getUser);
//EDITAR USUARIO
app.put("/user/:id", validAuth, isSameUser, editUser);
//BORRAR USUARIO
app.delete("/user/:id", validAuth, isSameUser, deleteUser);
//RECOVER PASSWORD
app.put("/recoverPwd", recoverPwd);
//RESET PASSWORD
app.put("/reset/:code", resetPwd);
//EDITAR PASSWORD
app.put("/user/changePwd/:id", validAuth, isSameUser, changePwd);

//CONTROLADORES DE PRODUCTO
//CREAR PRODUCTO
app.post("/product", validAuth, newProduct);
//OBTENER PRODUCTO
app.get("/product/:id", getProduct);
//BUSCAR PRODUCTOS
app.get("/product", listProducts);
//EDITAR PRODUCTO
app.put("/product/:id", validAuth, canEdit, editProduct);
//BORRAR PRODUCTO
app.delete("/product/:id", validAuth, canEdit, deleteProduct);
//AÑADIR FOTO DE PRODUCTO
app.post("/product/:id/images", validAuth, canEdit, addImgProduct);
//BORRAR FOTO DE PRODUCTO
app.delete("/product/:id/images/:imgId", validAuth, canEdit, deleteImgProduct);

//CONTROLADORES DE MENSAJES
//ENVIAR MENSAJE
app.post("/product/:id/messages", validAuth, sendMessage);
//LISTAR CONVERSACIONES
app.get("/user/:id/messages", validAuth, isSameUser, listConversations);
//LISTAR MENSAJES
app.get("/product/:id/messages", validAuth, listMessages);

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
