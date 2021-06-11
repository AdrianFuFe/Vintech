const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

async function logUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    //obtenemos datos de la peticion
    const { email, pwd } = req.body;
    //comprobamos que no falten datos
    if (!email || !pwd) {
      throw new Error(
        "Para acceder son necesarios los datos email y contraseña"
      );
    }

    let user;
    //obtener datos de usuario

    [user] = await connection.query(
      `
            SELECT *
            FROM users
            WHERE email=?
            `,
      [email]
    );

    //si no hay usuarios con ese email nos devuelve un error
    if (user.length < 1) throw new Error("No existe un usuario con ese email");

    //comprobamos que el usuario activase su cuenta
    if (user[0].status !== "active")
      throw new Error("Antes de entrar debes activar tu cuenta");

    const pwdDb = user[0].pwd;
    //comparamos la contraseña
    const isValid = await bcrypt.compare(pwd, pwdDb);
    if (!isValid) throw new Error("La contraseña no coincide ");

    //creamos token
    const tokenInfo = {
      id: user[0].id,
    };
    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET);

    res.send({
      status: "OK",
      token: token,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { logUser };
