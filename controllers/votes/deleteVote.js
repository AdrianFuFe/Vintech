const { getConnection } = require("../../db");

async function deleteVote(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;


    await connection.query(
      `
    DELETE FROM feedbacks
    WHERE id = ?`,
      [id]
    );

    res.send({
      status: "OK",
      message: "El voto ha sido eliminado con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteVote };
