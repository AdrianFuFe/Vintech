const { getConnection } = require("../db");

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

    //COMPROBAR QUE EL USUARIO EXISTA EN LA BASE DE DATOS

    req.auth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { validAuth };
