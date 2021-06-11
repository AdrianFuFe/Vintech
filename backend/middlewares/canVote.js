const { getConnection } = require("../db");

async function canVote(req, res, next) {
  let connection;
  const possibilities = [0, 1, 2, 3, 4, 5];
  try {
    connection = await getConnection();
    const { id } = req.params;

    //COMPROBAMOS LA SI LA FECHA DE ENTREGA DE LA RESERVA ES ANTERIOR A LA ACTUAL

    const [alreadyExists] = await connection.query(
      `
    SELECT *
    FROM feedbacks
    WHERE id_user_A = ? AND id_user_B = ?`,
      [req.auth.id, id]
    );
    if (alreadyExists.length > 0) throw new Error("Ya has votado a este usuario");

    if (req.auth.id === Number(id))
      throw new Error("No te puedes votar a ti mismo");
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { canVote };
