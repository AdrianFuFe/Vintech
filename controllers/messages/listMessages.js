const { getConnection } = require("../../db");

async function listMessages(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
    SELECT M.id, M.text, M.status, M.date, M.id_user_A, M.id_product, U.img AS user_img, U.username AS user_username
    FROM messages M
    LEFT JOIN users U ON M.id_user_B = U.id
    WHERE M.id_product = ? AND M.id_user_A = ? OR M.id_user_B = ?
    ORDER BY date DESC
    `,
      [id, req.auth.id, req.auth.id]
    );

    console.log(req.auth.id);

    await connection.query(
      `
        UPDATE messages
        SET status='read'
        WHERE messages.id_product =? AND messages.id_user_B = ?
    `,
      [id, req.auth.id]
    );

    if (result.length < 1) throw new Error(`No hay mensajes recibidos`);

    res.send({
      status: "OK",
      message: "listMessages en proceso",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listMessages };
