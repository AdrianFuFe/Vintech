const { getConnection } = require("../../db");

async function historyProducts(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const [result_sell] = await connection.query(
      `
            SELECT *
            FROM products
            WHERE id_seller = ? AND status = 'selled'
            GROUP BY products.id
            ORDER BY modification_date DESC
            `,
      [req.auth.id]
    );

    const [result_buy] = await connection.query(
      `
    SELECT * FROM products
    RIGHT JOIN (SELECT * FROM bookings WHERE status = 'accepted' AND id_user_B = ?) AS B
    ON B.id_product = products.id`,
      [req.auth.id]
    );

    res.send({
      status: "OK",
      message: `Estos son los resultados`,
      selled: result_sell,
      buyed: result_buy,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { historyProducts };
