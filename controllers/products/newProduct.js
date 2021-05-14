const { getConnection } = require("../../db");

async function newProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { title, price, description, ubication } = req.body;
    const [result] = await connection.query(
      `
        INSERT INTO products(title, price, description, ubication, modification_date)
        VALUES(?, ?, ?, ?, ?)`,
      [title, price, description, ubication, new Date()]
    );

    res.send({
      status: "pending",
      message: "Nueva entrada en proceso de programación",
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { newProduct };
