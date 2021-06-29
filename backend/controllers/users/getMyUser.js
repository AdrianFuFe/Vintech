const { getConnection } = require("../../db");

async function getMyUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    //obtenemos datos de user
    const [user] = await connection.query(
      `
      SELECT U.* 
      FROM users U
      WHERE U.id=?
      `,
      [id]
    );

    if (user.length < 1)
      throw new Error(`El usuario con id ${id} no existe en la base de datos`);

    res.send({
      status: "OK",
      message: `Aquí está la información del usuario con id ${id} y sus productos a la venta`,
      data: user,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getMyUser };
