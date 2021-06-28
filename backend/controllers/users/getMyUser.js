const { getConnection } = require("../../db");

async function getMyUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    //obtenemos datos de user
    const [user] = await connection.query(
      `
      SELECT *
      FROM users U
      WHERE U.id=?
      `,
      [id]
    );

    if (user.length < 1)
      throw new Error(`El usuario con id ${id} no existe en la base de datos`);

    //obtenemos productos de user
    const [products] = await connection.query(
      `
    SELECT P.id, P.title, P.price, P.description, P.ubication, P.modification_date, P.category, P.status
    FROM products P
    WHERE id_seller = ?
    `,
      [id]
    );

    res.send({
      status: "OK",
      message: `Aquí está la información del usuario con id ${id} y sus productos a la venta`,
      data: user,
      products: products,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getMyUser };
