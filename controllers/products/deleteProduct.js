const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function deleteProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    if ((await entryExists("products", id)) === false)
      throw new Error(`El producto con id ${id} no existe`);

    await connection.query(
      `
      DELETE FROM products
      WHERE id=?`,
      [id]
    );

    res.send({
      status: "OK",
      message: `El producto con id ${id} ha sido eliminado con éxito`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteProduct };
