const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function sendMessage(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { text } = req.body;
    const { id, userId } = req.params;

    console.log(text);
    console.log(id);
    console.log(userId);

    if (!text) throw new Error("El campo texto no puede estar vacío");

    if ((await entryExists("products", id)) === false)
      throw new Error(`El producto con id ${id} no existe`);
    if ((await entryExists("users", userId)) === false)
      throw new Error(`El usuario con id ${userId} no existe`);

    //COMPROBAR SI EL USERID ES EL VENDEDOR DE ID

    const [idUserB] = await connection.query(
      `
    SELECT P.id_seller
    FROM products P
    WHERE id=?`,
      [id]
    );

    //Si el vendedor del producto soy yo mismo, envío el mensaje a mi interlocutor y no a mi mismo
    if (idUserB[0].id_seller === req.auth.id)
      idUserB[0].id_seller = Number(userId);

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
