const { getConnection } = require("../../db");

async function deleteProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    //MEJORABLE: NO COMPROBAMOS QUE EXISTE EL PRODUCTO ANTES DE BORRARLO

    const [result] = await connection.query(
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
