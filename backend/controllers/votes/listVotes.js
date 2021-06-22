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

    const [buyer] = await connection.query(
      `
      SELECT 
        F.id_user_A, 
        U.id AS id_buyer, 
        U.username AS username_buyer, 
        U.fname AS fname_buyer, 
        U.lname AS lname_buyer
      FROM feedbacks F
      LEFT JOIN users U ON F.id_user_A = U.id
      WHERE id_user_B = ?
      `,
      [id]
    )

    if (result.length < 1) throw new Error("No hay ningún feedback");
    res.send({
      status: "OK",
      data: result,
      buyer: buyer,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listVotes };
