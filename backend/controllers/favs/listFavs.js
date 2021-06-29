const { getConnection } = require("../../db");

async function listFavs(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT *
        FROM fav_list
        WHERE id_user = ?
    `,
      [req.auth.id]
    );
    if (result.length < 1) {
      throw new Error(`No hay ningún producto en favoritos`);
    }

    const [products] = await connection.query(
      `
      SELECT P.*
      FROM fav_list FL
      LEFT JOIN products P 
        ON FL.id_product = P.id
      WHERE id_user = ?
      `,
      [req.auth.id]
    );
    if (products.length < 1) {
      throw new Error(`No hay ningún producto en favoritos`);
    }

    const ids = products.map((item) => item.id);

    const [imgs] = await connection.query(`
      SELECT img, id_product
      FROM product_imgs
      WHERE id_product IN (${ids.join(",")})`);

    const resultImgs = products.map((item) => {
      item.img = imgs.filter((img) => img.id_product === item.id)[0];
      return item;
    });

    res.send({
      status: "OK",
      message: `A continuación se muestran los productos favoritos del usuario con id ${req.auth.id}`,
      data: result,
      products: products,
      productsImg: resultImgs,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listFavs };
