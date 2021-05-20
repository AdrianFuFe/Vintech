const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function listVotes(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    if ((await entryExists("users", id)) === false)
      throw new Error(`El usuario con id ${id} no existe`);

    const [result] = await connection.query(
      `
    SELECT *
    FROM feedbacks
    WHERE id_user_B = ?
    ORDER BY creation_date DESC`,
      [id]
    );

    if (result.length < 1) throw new Error("No hay ningún feedback");
    res.send({
      status: "OK",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listVotes };
