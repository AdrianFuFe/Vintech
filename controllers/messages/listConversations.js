const { getConnection } = require("../../db");

async function listConversations(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

      //QUERY DE LOSAS, REPASAR
    const [results] = await connection.query(
      `
      SELECT a. id, a.text, a.date, a.id_user_A, a.id_user_B, a.id_product
      FROM messages a
      LEFT JOIN messages b ON (a.id_user_A = b.id_user_B AND a.date < b.date)
      WHERE b.id IS NULL
      AND (a.id_user_A = 1 or a.id_user_B = 1);
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
