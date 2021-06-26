const { getConnection } = require("../../db");

async function listConversations(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const [results] = await connection.query(
      `
      SELECT m.*
      FROM
        messages m INNER JOIN (
          SELECT
            LEAST(id_user_A, id_user_B) AS user_1,
            GREATEST(id_user_A, id_user_B) AS user_2,
            MAX(id) AS last_id,
            MAX(date) AS last_timestamp
          FROM
            messages
          WHERE ? IN (id_user_A, id_user_B)
          GROUP BY
            LEAST(id_user_A, id_user_B),
            GREATEST(id_user_A, id_user_B)
        ) s ON LEAST(id_user_A, id_user_B)=user_1
               AND GREATEST(id_user_A, id_user_B)=user_2
               AND m.id = s.last_id
       `,
      [req.auth.id]
    );
    console.log(results);
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
