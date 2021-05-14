const { getConnection } = require("../../db");

async function newProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { title, price, description, ubication, category } = req.body;

    if (!title || !price)
      throw new Error("Los campos título y precio son obligatorios");

    const [result] = await connection.query(
      `
        INSERT INTO products(id_seller, title, price, description, ubication, category, status)
        VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [req.auth.id, title, price, description, ubication, category, "active"]
    );

    res.send({
      status: "OK",
      message: "Nueva entrada creada con éxito",
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { newProduct };
