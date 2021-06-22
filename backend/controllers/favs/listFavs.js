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

    if (result.length < 1)
      throw new Error(`No hay ningún producto en favoritos`);

      const[products] = await connection.query(
        `
        SELECT P.*
        FROM fav_list FL
        LEFT JOIN products P 
          ON FL.id_product = P.id
        WHERE id_user = ?
        `,
        [req.auth.id]
      );

    res.send({
      status: "OK",
      message: `A continuación se muestran los productos favoritos del usuario con id ${req.auth.id}`,
      data: result,
      products: products,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listFavs };
