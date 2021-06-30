require("dotenv").config();
const { getConnection } = require("../../db");
const crypto = require("crypto");
const { sendMail } = require("../../helpers");

async function recoverPwd(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { email } = req.body;

    const [user] = await connection.query(
      `
            SELECT *
            FROM users
            WHERE email=?
            `,
      [email]
    );

    if (user.length < 1)
      throw new Error("No se ha encontrado ningun usuario con ese email");

    //generamos un codigo de recuperacion
    const code = crypto.randomBytes(20).toString("hex").slice(0, 20);
    //introducimos el codigo en la bbdd
    await connection.query(
      `
            UPDATE users
            SET activation_code=?
            WHERE email=?
            `,
      [code, email]
    );

    //enviar correo de recuperacion
    //creamos un link de recuperacion
    const recoverLink = `${process.env.DOMINIO_FRONT}/reset-password/${code}`;
    await sendMail({
      to: email,
      subject: "Recuperación de contraseña",
      message: `Hola, somos el equipo de Vintech Place.
      Has solicitado recuperar tu contraseña, para ello haz click en el siguiente enlace: ${recoverLink}`,
    });

    res.send({
      status: "OK",
      message: "Correo de recuperación de contraseña enviado con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { recoverPwd };
