const { getConnection } = require("../../db");

async function listConversations(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

      //ESTA QUERY AGRUPA MAL
    const [results] = await connection.query(
      `
      SELECT * FROM messages
      WHERE date IN (SELECT MAX(date) FROM messages WHERE id_user_A=? OR id_user_B=? GROUP BY id_product, id_user_A OR id_user_B) ORDER BY date DESC
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
