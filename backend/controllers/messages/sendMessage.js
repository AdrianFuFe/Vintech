const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function sendMessage(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { text } = req.body;
    const { id } = req.params;

    if (!text) throw new Error("El campo texto no puede estar vacío");

    if ((await entryExists("users", id)) === false)
      throw new Error(`El usuario con id ${id} no existe`);

    if (Number(id) === req.auth.id)
      throw new Error("No puedes escribirte un mensaje a ti mismo");

    const [result] = await connection.query(
      `
    INSERT INTO messages(text, status, id_user_A, id_user_B)
    VALUES(?,?,?,?)`,
      [text, "sent", req.auth.id, id]
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
