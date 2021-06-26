const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function listMessages(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id, userId } = req.params;

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
      U.img AS user_img, 
      U.username AS user_username
    FROM messages M
    LEFT JOIN users U ON M.id_user_A = U.id
    WHERE (M.id_user_A = ? OR M.id_user_B = ?) AND (M.id_user_A = ? OR M.id_user_B = ?)
    ORDER BY date ASC
    `,
      [id, id, userId, userId]
    );

    if (result.length < 1) throw new Error(`No hay mensajes recibidos`);

    await connection.query(
      `
        UPDATE messages
        SET status='read'
        WHERE messages.id_user_B = ?
    `,
      [id]
    );

    res.send({
      status: "OK",
      message: `A continuación se muestra la conversación con el usuario ${userId}`,
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listMessages };
