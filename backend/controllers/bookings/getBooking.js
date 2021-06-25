const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function getBooking(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    let { idBooking } = req.params;
    let result;

    //comprobamos si existe el usuario
    result = await entryExists("users", req.auth.id);
    if (result == false)
      throw new Error(`El usuario con ID ${req.auth.id} no existe`);

    //buscar en la BBDD la reserva por su id que pasamos por params
    [result] = await connection.query(
      `
        SELECT *
        FROM bookings B
        WHERE id=? AND (id_user_A=? OR id_user_B=?)
        `,
      [idBooking, req.auth.id, req.auth.id]
    );

    if (result.length < 1)
      throw new Error(
        `La reserva con ID ${idBooking} no existe o no participas en ella`
      );
    /*  
        OPCION DE ERROR PERSONALIZADO SI NO FILTRAMOS LA CONSULTA POR USUARIOS       
        if(result.id_user_A != req.auth.id && result.id_user_B != req.auth.id)
        throw new Error (`No puedes ver reservas en las que no participas`); 
        */

    //sacamos datos de usuarios comprador y vendedor y el producto
    const [moreInfo] = await connection.query(
      `
            SELECT 
                U.id AS id_seller,
                U.username AS username_seller,
                U.fname AS fname_seller,
                U.lname AS lname_seller,
                US.id AS id_buyer,
                US.username AS username_buyer,
                US.fname AS fname_buyer,
                US.lname AS lname_buyer,
                P.id AS id_product,
                P.title AS title_product,
                P.price AS price_product
            FROM bookings B
            LEFT JOIN users U ON B.id_user_A = U.id
            LEFT JOIN users US ON B.id_user_B = US.id
            LEFT JOIN products P ON B.id_product = P.id
            WHERE B.id=?
            `,
      [idBooking]
    );

    const [imgs] = await connection.query(
      `
            SELECT PI.img AS img_product
            FROM bookings B
            LEFT JOIN product_imgs PI ON B.id_product = PI.id_product
            WHERE B.id=?
            `,
      [idBooking]
    );

    if (
      result[0].status === "sent" &&
      result[0].id_user_B !== Number(req.auth.id)
    ) {
      await connection.query(
        `
                UPDATE bookings
                SET status= 'read'
                WHERE id=?
                `,
        [idBooking]
      );
    }

    res.send({
      status: "OK",
      booking: result[0],
      moreInfo: moreInfo[0],
      imgs: imgs[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getBooking };
