const { getConnection } = require("../../db");
const { sendMail } = require("../../helpers");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function createUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    //obtener datos de request
    const { username, email, pwd } = req.body;

    //comprobar datos request existen
    if (!username || !email || !pwd)
      throw new Error("Los campos username, email y password son obligatorios");

    //comprobar si usuario ya existe
    let user;
      [user] = await connection.query(
        `
                SELECT *
                FROM users
                WHERE email=?
            `,
        [email]
      );

    if (user.length > 0) {
      throw new Error("Ya existe un usuario con ese email");
    }

    //codificamos password
    let pwdDb = await bcrypt.hash(pwd, 10);

    //crear codigo de registro para activacion
    const activationCode = crypto.randomBytes(20).toString("hex").slice(0, 20);

    //enviamos email de confirmacion
    const validationLink = `${process.env.DOMINIO}/activation/${activationCode}`;
    await sendMail({
      to: email,
      subject: "Registro Vintech Place",
      message: `Gracias por registrate en Vintech Place
                Activa tu cuenta haciendo click en el siguiente enlace 
                ${validationLink}`,
    });

    //introducir datos en db
      await connection.query(
        `
            INSERT INTO users(username, email, pwd, activation_code, status)
            VALUES(?, ?, ?, ?, 'inactive')
            `,
        [username, email, pwdDb, activationCode]
      );

    res.send({
      status: "OK",
      message: "Usuario creado correctamente. Se ha enviado un mail de confirmación",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { createUser };
