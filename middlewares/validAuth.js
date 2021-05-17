const { getConnection } = require("../db");
const { entryExists } = require("../helpers");
const jsonwebtoken = require("jsonwebtoken");

async function validAuth(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { authorization } = req.headers;

    if (!authorization) throw new Error("La petición debe incluír un token");

    //estas dos líneas de abajo cambian con la existencia de token
    let tokenInfo = {};
    tokenInfo.id = authorization;
    //COMPROBAR QUE EL TOKEN ES VÁLIDO Y DECODIFICARLO
    try {
      tokenInfo = jsonwebtoken.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw new Error("El token no es válido");
    }
    
    //COMPROBAR QUE EL USUARIO EXISTA EN LA BASE DE DATOS
    //comprobamos que el usuario exista en la bbdd
    if ((await entryExists("users", tokenInfo.id)) === false)
      throw new Error(`El usuario del token no existe en la base de datos`);

    req.auth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { validAuth };
