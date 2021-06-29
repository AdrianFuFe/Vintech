const { getConnection } = require("../../db");

async function getUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    //obtenemos datos de user
    const [user] = await connection.query(
      `
                SELECT U.id, U.img, U.username, U.fname, U.lname, U.bio, U.last_ubication, U.creation_date
                FROM users U
                WHERE U.id=?
            `,
      [id]
    );

    if (user.length < 1)
      throw new Error(`El usuario con id ${id} no existe en la base de datos`);

    //obtenemos productos de user
    const [products] = await connection.query(
      `
    SELECT P.id, P.title, P.price, P.description, P.ubication, P.modification_date, P.category, P.status
    FROM products P
    WHERE id_seller = ?`,
      [id]
    );

    const ids = products.map((item) => item.id);

    const [imgs] = await connection.query(`
      SELECT img, id_product
      FROM product_imgs
      WHERE id_product IN (${ids.join(",")})`);

    const resultImgs = products.map((item) => {
      item.img = imgs.filter((img) => img.id_product === item.id)[0];
      return item;
    });

    res.send({
      status: "OK",
      message: `Aquí está la información del usuario con id ${id} y sus productos a la venta`,
      data: user,
      products: products,
      productsImg: resultImgs,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getUser };
