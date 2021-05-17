const { getConnection } = require("../../db");

async function listProducts(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { search } = req.query;
    let result;

    if (search) {
      [result] = await connection.query(
        `
      SELECT *
      FROM products
      WHERE products.id_seller LIKE CONCAT("%", ? , "%") OR products.title LIKE CONCAT("%", ? , "%") OR products.description LIKE CONCAT("%", ? , "%") OR products.ubication LIKE CONCAT("%", ? , "%") OR products.category LIKE CONCAT("%", ? , "%")
      GROUP BY products.id
      ORDER BY modification_date DESC`,
        [search, search, search, search, search]
      );
    } else {
      [result] = await connection.query(`
            SELECT *
            FROM products
            GROUP BY products.id
            ORDER BY modification_date DESC
            `);
    }

    if (result.length < 1) {
      res.send({
        status: "OK",
        message: `La búsqueda del término ${search} no arroja resultados`,
      });
    } else {
      const ids = result.map((item) => item.id);

      const [imgs] = await connection.query(`
        SELECT img, id_product
        FROM product_imgs
        WHERE id_product IN (${ids.join(",")})`);

      const resultImgs = result.map((item) => {
        item.img = imgs.filter((img) => img.id_product === item.id)[0];
        return item;
      });

      res.send({
        status: "OK",
        message: `Estos son los resultados`,
        data: resultImgs,
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listProducts };
