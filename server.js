require("dotenv").config();
const express = require("express");

const port = process.env.PORT;
const app = express();

//REQUERIMOS CONTROLLERS
//CONTROLADORES DE PRODUCTO
const { newProduct } = require("./controllers/products/newProduct");

//REQUERIMOS MIDDLEWARES

app.post("/product", newProduct);

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
