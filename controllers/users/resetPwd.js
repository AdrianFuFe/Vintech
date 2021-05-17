const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");

async function resetPwd(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { code } = req.params;
    const { pwd, confirmPwd } = req.body;

    //comprobamos que existe un usuario con ese codigo de reseteo
    const [existingUser] = await connection.query(
      `
            SELECT *
            FROM users
            WHERE activationCode=?
            `,
      [code]
    );

    if (existingUser.length < 1)
      throw new Error("No existe ningún usuario con ese código de reseteo");

    if (pwd !== confirmPwd) throw new Error("Las contraseñas no coinciden");

    //codificamos la nueva pwd
    let pwdDb;
    try {
      pwdDb = await bcrypt.hash(pwd, 10);
    } catch (error) {
      throw new Error("La contraseña no se pudo codificar");
    }

    //actualizamos pwd en la bbdd
    await connection.query(
      `
            UPDATE users
            SET pwd=?, activationCode=NULL
            WHERE activationCode=?
            `,
      [pwdDb, code]
    );

    res.send({
      stats: "OK",
      message: "La contraseña ha sido actualizada con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { resetPwd };
