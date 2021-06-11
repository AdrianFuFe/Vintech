const { getConnection } = require("../db");

async function canEditVote(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
      SELECT id_user_A
      FROM feedbacks
      WHERE id=?
    `,
      [id]
    );

    if (result.length < 1) throw new Error("La entrada no existe");

    if (req.auth.id !== result[0].id_user_A)
      throw new Error(
        "No puedes realizar esta acción porque el voto no lo has emitido tú"
      );

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { canEditVote };
