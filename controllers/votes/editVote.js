const { getConnection } = require("../../db");

async function editVote(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const { stars, comment } = req.body;
    const possibilities = [0, 1, 2, 3, 4, 5];

    if (!stars) throw new Error("La petición debe incluír una puntuación");
    if (!possibilities.includes(Number(stars)))
      throw new Error("Sólo se puede votar un núero entero del 0 al 5");

    await connection.query(
      `
    UPDATE feedbacks
    SET stars = ?, comment = ?
    WHERE id = ?`,
      [stars, comment, id]
    );

    res.send({
      status: "OK",
      message: "El voto ha sido modificado con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editVote };
