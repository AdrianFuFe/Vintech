const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function listMessages(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id, userId } = req.params;

    if ((await entryExists("products", id)) === false)
      throw new Error(`El producto con id ${id} no existe`);
    if ((await entryExists("users", userId)) === false)
      throw new Error(`El usuario con id ${userId} no existe`);

    const [result] = await connection.query(
      `
    SELECT 
      M.id, 
      M.text, 
      M.status, 
      M.date, 
      M.id_user_A, 
      M.id_user_B,
      M.id_product, 
      U.img AS user_img, 
      U.username AS user_username
    FROM messages M
    LEFT JOIN users U ON M.id_user_A = U.id
    WHERE M.id_product = ? AND (M.id_user_A = ? OR M.id_user_B = ?) AND (M.id_user_A = ? OR M.id_user_B = ?)
    ORDER BY date DESC
    `,
      [id, req.auth.id, req.auth.id, userId, userId]
    );

    if (result.length < 1) throw new Error(`No hay mensajes recibidos`);

    await connection.query(
      `
        UPDATE messages
        SET status='read'
        WHERE messages.id_product =? AND messages.id_user_B = ?
    `,
      [id, req.auth.id]
    );

    res.send({
      status: "OK",
      message: `A continuación se muestra la conversación con el usuario ${userId} sobre el producto ${id}`,
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listMessages };
