const { getConnection } = require("../db");

async function canEdit(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
      SELECT id_seller
      FROM products
      WHERE id=?
    `,
      [id]
    );

    if (result.length < 1) throw new Error("La entrada no existe");

    if (req.auth.id !== result[0].id_seller)
      throw new Error(
        "No puedes realizar esta acción porque el producto no te pertenece"
      );

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { canEdit };
