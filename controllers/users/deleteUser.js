const { getConnection } = require("../../db");

async function deleteUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    await connection.query(
      `
            DELETE
            FROM users
            WHERE id=?
            `,
      [id]
    );

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
