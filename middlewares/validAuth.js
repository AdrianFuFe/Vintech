const { getConnection } = require("../db");
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
    try{
      tokenInfo = jsonwebtoken.verify(authorization, process.env.SECRET)
    }catch(error){
      throw new Error ("El token no es válido")
    }
    //COMPROBAR QUE EL USUARIO EXISTA EN LA BASE DE DATOS
    //comprobamos que el usuario exista en la bbdd
    let user
    try{
        [user]=await connection.query(`
        SELECT *
        FROM users
        WHERE id=?
        `,[id]);
    }catch(error){
        throw new Error ("No se ha podido consultar el usuario en la base de datos")
    }
    if (user.length < 1) throw new Error ("El usuario del token indicado no existe en la base de datos")

    req.auth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { validAuth };
