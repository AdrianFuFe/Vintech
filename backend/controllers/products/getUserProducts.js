const { getConnection } = require("../../db");

async function getUserProducts(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    // P.id, P.title, P.price, P.description, P.ubication, P.modification_date, P.category, P.status
    const [products] = await connection.query(
      `
    SELECT *
    FROM products
    WHERE id_seller = ?`,
      [id]
    );

    if (products.length >= 1) {
      const ids = products.map((item) => item.id);

      const [imgs] = await connection.query(`
      SELECT img, id_product
      FROM product_imgs
      WHERE id_product IN (${ids.join(",")})`);

      const resultImgs = products.map((item) => {
        item.img = imgs.filter((img) => img.id_product === item.id)[0];
        return item;
      });
    } else {
      throw new Error("el usuario no tiene productos");
    }

    res.send({
      status: "OK",
      message: `Aquí está la información de los productos del usuario con id ${id}`,
      data: products,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getUserProducts };
