const { getConnection } = require("../../db");

async function activateUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { activationCode } = req.params;

    //comprobar que exista usuario con ese codigo
    let user;
    [user] = await connection.query(
      `
            SELECT *
            FROM users
            WHERE activationCode = ?
            `,
      [activationCode]
    );

    //si no existe devuelve un error
    if (user.length < 1) {
      throw new Error("No existe ningún usuario con ese código de activación");
    }

    //si existe cambiar status a activo
    await connection.query(
      `
                UPDATE users
                SET status = "active", activationCode=NULL
                WHERE activationCode = ?
            `,
      [activationCode]
    );

    res.send({
      status: "OK",
      message: "El usuario se ha activado correctamente",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { activateUser };
