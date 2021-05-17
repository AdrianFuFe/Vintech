const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");

async function changePwd(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { oldPwd, newPwd, newPwdConfirm } = req.body;
    const { id } = req.params;

    //comparamos la nueva pwd con la confirmacion
    if (newPwd !== newPwdConfirm)
      throw new Error("Las nuevas contraseñas no coinciden");

    //comparamos con la bbdd la pwd codificada
    const [currentPwd] = await connection.query(
      `
            SELECT pwd
            FROM users
            WHERE id=?
            `,
      [id]
    );

    //obtenemos la pwd codificada de la bbdd
    const pwdCoded = currentPwd[0].pwd;

    //comparamos la contraseña con la de la bbdd
    try {
      const isValid = await bcrypt.compare(oldPwd, pwdCoded);
      if (isValid === false)
        throw new Error(
          "La contraseña introducida no coincide con la actual contraseña"
        );
    } catch (error) {
      next(error);
    }

    //codificamos la pwd antigua para compararla con la bbdd
    let pwdDb;
    try {
      pwdDb = await bcrypt.hash(newPwd, 10);
    } catch (error) {
      throw new Error("No se ha podido codificar la contraseña");
    }

    //introducimos la pwd codificada en la bbdd
    await connection.query(
      `
                UPDATE users
                SET pwd=?
                WHERE id=?
            `,
      [pwdDb, id]
    );

    res.send({
      status: "OK",
      message: "Contraseña modificada con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { changePwd };
