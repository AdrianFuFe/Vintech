const { getConnection } = require("../../db");

async function listConversations(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    const [results] = await connection.query(
      `
      SELECT c.* FROM (SELECT M.id, M.text, M.date, M.id_user_A, M.id_user_B, M.id_product
      FROM messages M
      LEFT JOIN messages b ON (M.id_user_A = b.id_user_B AND M.date < b.date)
      WHERE b.id IS NULL
      AND (M.id_user_A = ? or M.id_user_B = ?)) c
      LEFT JOIN users U ON c.id_user_A = U.id;
      `,
      [id, id]
    );

    if (results.length < 1) throw new Error(`No hay ninguna conversación`);
    res.send({
      status: "OK",
      message: "Éstas son tus conversaciones",
      data: results,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listConversations };
