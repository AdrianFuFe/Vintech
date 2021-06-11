const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function deleteFav(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    if ((await entryExists("products", id)) === false)
      throw new Error(`El producto con id ${id} no existe`);

    const [isMine] = await connection.query(
      `
    SELECT *
    FROM fav_list
    WHERE id_user = ? AND id_product = ?`,
      [req.auth.id, id]
    );

    if (isMine < 1)
      throw new Error(`No tienes el producto con id ${id} en tus favoritos`);

    const [result] = await connection.query(
      `
      DELETE
      FROM fav_list
      WHERE id_user = ? AND id_product = ?`,
      [req.auth.id, id]
    );

    res.send({
      status: "OK",
      message: "Producto eliminado de favoritos correctamente",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteFav };
