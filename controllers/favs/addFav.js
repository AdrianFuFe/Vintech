const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function addFav(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    if ((await entryExists("products", id)) === false)
      throw new Error(`El producto con id ${id} no existe`);

    const [alreadyExists] = await connection.query(
      `
      SELECT *
      FROM fav_list
      WHERE id_user = ? AND id_product = ?`,
      [req.auth.id, id]
    );
    if (alreadyExists.length > 0)
      throw new Error("Ya tienes este producto en tus favoritos");

    const [result] = await connection.query(
      `
        INSERT INTO fav_list(id_user, id_product)
        VALUES(?, ?)`,
      [req.auth.id, id]
    );

    res.send({
      status: "OK",
      message: "Producto añadido a favoritos correctamente",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { addFav };
