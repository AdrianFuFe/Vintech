const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");

async function deleteUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const { pwd, confirmPwd } = req.body;

    if (!pwd || !confirmPwd)
      throw new Error("Debes introducir las contraseñas");

    if (pwd !== confirmPwd)
      throw new Error("La contraseña y la confirmación no coinciden");

    //obtener datos de usuario
    let user;
    [user] = await connection.query(
      `
          SELECT *
          FROM users
          WHERE id=?
        `,
      [id]
    );

    //si no hay usuarios con ese email nos devuelve un error
    if (user.length < 1) throw new Error("El usuario no existe");

    const pwdDb = await user[0].pwd;
    //comparamos la contraseña
    const isValid = await bcrypt.compare(pwd, pwdDb);
    if (!isValid) throw new Error("La contraseña no coincide ");
    //si la contraseña es correcta eliminamos el usuario
    if (isValid) {
      await connection.query(
        `
        DELETE
        FROM users
        WHERE id=?
        `,
        [id]
      );
    }

    res.send({
      status: "OK",
      message: "El usuario ha sido eliminado correctamente",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteUser };
