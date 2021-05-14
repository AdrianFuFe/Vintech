const { getConnection } = require("../../db");

async function newProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { title, price, description, ubication, id_category } = req.body;
    const [result] = await connection.query(
      `
        INSERT INTO products(id_seller, title, price, description, ubication, modification_date, id_category, status)
        VALUES(?,?,?,?,?,?,?,?)`,
      [
        1,
        title,
        price,
        description,
        ubication,
        new Date(),
        id_category,
        "active",
      ]
    );

    res.send({
      status: "ok",
      message: "Nueva entrada pending",
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { newProduct };
