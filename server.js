require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const port = process.env.PORT;
const app = express();

//REQUERIMIENTO DE CONTROLLERS
//CONTROLADORES DE PRODUCTO
const { newProduct } = require("./controllers/products/newProduct");
const { editProduct } = require("./controllers/products/editProduct");
const { deleteProduct} = require ('./controllers/products/deleteProduct')
const { addProductPhoto } = require("./controllers/products/addProductPhoto");

//REQUERIMIENTO DE MIDDLEWARES FUNCIONALIDADES
const { validAuth } = require("./middlewares/validAuth");
const { canEdit } = require("./middlewares/canEdit");

//APLICACIÓN DE MIDDLEWARES GENERALES
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload());

//APLICACIÓN DE CONTROLADORES PARA ENDPOINTS

//CONTROLADORES DE PRODUCTO
//CREAR PRODUCTO
app.post("/product", validAuth, newProduct);
//EDITAR PRODUCTO
app.put("/product/:id", validAuth, canEdit, editProduct);
//BORRAR PRODUCTO
app.delete('/product/:id', validAuth, canEdit, deleteProduct)
//AÑADIR FOTO DE PRODUCTO
app.post("/product/:id/images", validAuth, addProductPhoto);

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
