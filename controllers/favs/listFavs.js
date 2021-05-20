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

    res.send({
      status: "OK",
      message: `A continuación se muestran los productos favoritos del usuario con id ${req.auth.id}`,
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listFavs };
