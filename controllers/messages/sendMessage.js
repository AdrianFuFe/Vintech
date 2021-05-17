const { getConnection } = require("../../db");

async function sendMessage(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { text } = req.body;
    const { id } = req.params;

    if (!text) throw new Error("El campo texto no puede estar vacío");

    const [idUserB] = await connection.query(
      `
    SELECT P.id_seller
    FROM products P
    WHERE id=?`,
      [id]
    );

    const [result] = await connection.query(
      `
    INSERT INTO messages(text, status, id_user_A, id_user_B, id_product)
    VALUES(?,?,?,?,?)`,
      [text, "sent", req.auth.id, idUserB[0].id_seller, id]
    );

    res.send({
      status: "OK",
      message: "El mensaje ha sido enviado con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { sendMessage };
