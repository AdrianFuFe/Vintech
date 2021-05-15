const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function editProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    const { title, price, description, ubication } = req.body;

    if (!title || !price)
      throw new Error("Los campos título y precio son obligatorios");

    if ((await entryExists("products", id)) === false)
      throw new Error(`El producto con id ${id} no existe`);

    await connection.query(
      `
        UPDATE products
        SET title=?, price=?, description=?, ubication=?, modification_date=?
        WHERE id=?`,
      [title, price, description, ubication, new Date(), id]
    );

    res.send({
      status: "OK",
      message: `La entrada con id ${id} ha sido actualizada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editProduct };
