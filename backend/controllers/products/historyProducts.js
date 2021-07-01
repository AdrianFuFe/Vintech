const { getConnection } = require("../../db");

async function historyProducts(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const [result_sell] = await connection.query(
      `
            SELECT category, description, id_seller, modification_date, price, status, title, ubication, id AS id_product
            FROM products
            WHERE id_seller = ? AND status = 'selled'
            GROUP BY products.id
            ORDER BY id DESC
            `,
      [req.auth.id]
    );

    if (result_sell.length > 0) {
      const ids = result_sell.map((item) => item.id_product);

      const [imgs] = await connection.query(`
        SELECT img, id_product
        FROM product_imgs
        WHERE id_product IN (${ids.join(",")})
        ORDER BY id_product DESC`);

      const resultImgs = result_sell.map((item) => {
        item.img = imgs.filter((img) => img.id_product === item.id_product)[0];
        return item;
      });
    }

    const [result_buy] = await connection.query(
      `
    SELECT * FROM products
    RIGHT JOIN (SELECT * FROM bookings WHERE status = 'accepted' AND id_user_B = ?) AS B
    ON B.id_product = products.id
    ORDER BY modification_date DESC`,
      [req.auth.id]
    );

    if (result_buy.length > 0) {
      const ids = result_buy.map((item) => item.id_product);
      console.log(result_buy);

      const [imgs] = await connection.query(`
        SELECT img, id_product
        FROM product_imgs
        WHERE id_product IN (${ids.join(",")})
        ORDER BY id_product DESC`);

      const resultImgs = result_buy.map((item) => {
        item.img = imgs.filter((img) => img.id_product === item.id_product)[0];
        return item;
      });
    }

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
