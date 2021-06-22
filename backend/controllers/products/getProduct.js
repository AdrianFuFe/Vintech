const { getConnection } = require("../../db");

async function getProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT 
          P.title, 
          P.price, 
          P.description, 
          P.ubication, 
          P.modification_date, 
          P.category, 
          P.status, 
          U.id AS user_id, 
          U.img AS user_img, 
          U.username AS user_username, 
          U.fname AS user_username, 
          U.lname AS user_lastname, 
          U.bio AS user_bio, 
          U.last_ubication AS user_last_ubication
        FROM products P
        LEFT JOIN users U ON P.id_seller = U.id
        WHERE P.id =?
        `,
      [id]
    );

    if (result.length < 1) throw new Error(`La entrada no existe`);

    const [imgs] = await connection.query(
      `
    SELECT img
    FROM product_imgs
    WHERE id_product =?`,
      [id]
    );

    const [feedback] = await connection.query(
      `
    SELECT AVG(stars) AS rating
    FROM feedbacks
    WHERE id_user_B = ?`,
      [result[0].user_id]
    );

    res.send({
      status: "OK",
      message: `Estos son los datos del producto con id ${id}`,
      data: result,
      imgs: imgs,
      feedback: feedback,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getProduct };
