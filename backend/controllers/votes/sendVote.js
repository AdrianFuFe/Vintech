const { getConnection } = require("../../db");

async function sendVote(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { stars, comment } = req.body;
    const { id } = req.params;
    const possibilities = [0, 1, 2, 3, 4, 5];

    if (!stars) throw new Error("La petición debe incluír una puntuación");
    if (!possibilities.includes(Number(stars)))
      throw new Error("Sólo se puede votar un núero entero del 0 al 5");

    await connection.query(
      `
    INSERT INTO feedbacks (stars, comment, id_user_A, id_user_B)
    VALUES (?, ?, ?, ?)`,
      [stars, comment, req.auth.id, id]
    );
    res.send({
      status: "OK",
      message: "Tu voto ha sido enviado con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { sendVote };
