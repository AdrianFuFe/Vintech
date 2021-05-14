const { getConnection } = require("../../db");

async function editProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    const { title, price, description, ubication } = req.body;

    //MEJORABLE: SI NO INCLUÍMOS EN EL BODY ALGÚN DATO, AL ACTUALIZAR QUEDA NULL

    if (!title || !price)
      throw new Error("Los campos título y precio son obligatorios");

    const [result] = await connection.query(
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
