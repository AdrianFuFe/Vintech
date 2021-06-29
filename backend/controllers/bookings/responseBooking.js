const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");
const { getDbInfo } = require("../../helpers");

async function responseBooking(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    let { id, idBooking, response } = req.params;
    let booking;

    //buscar en la BBDD la reserva con id_producto e id_vendedor igual a los que pasamos por params
    booking = await getDbInfo("bookings", idBooking);
    if (booking == false)
      throw new Error(`No existe la reserva con ID ${idBooking}`);

    // console.log(booking.status);

    //comprobamos si que el usuario es el vendedor
    if (booking.id_user_A !== Number(id))
      throw new Error(
        `Solo el vendedor con ID ${booking.id_user_A} puede responder a esta reserva`
      );

    //comprobamos si existe el producto
    let product = await getDbInfo("products", booking.id_product);
    if (product == false)
      throw new Error(`El producto con ID ${product.id} no existe`);
    //comprobamos que el producto no este ya reservado
    if (response === "accept" && product.status === "reserved")
      throw new Error(`El producto con ID ${product.id} ya esta reservado`);

    //obtenemos la fecha y hora que propone el vendedor
    let { meetDate, ubication } = req.body;
    let text;

    //si acceptamos la reserva
    if (response === "accept") {
      if (!meetDate || !ubication)
        throw new Error(`Debes establecer una fecha y un lugar`);

      //actualizamos la BBDD con la fecha y lugar propuestos por el vendedor y el estado de la reserva
      await connection.query(
        `
            UPDATE bookings
            SET meeting_date=?, ubication=?, status="accepted"
            WHERE id=?
            `,
        [meetDate, ubication, idBooking]
      );

      //formateo de la fecha propuesta
      const formatDate = new Date(meetDate);
      const options = {
        hourCycle: "h24",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };

      //actualizar estado del objeto
      await connection.query(
        `
            UPDATE products
            SET status="reserved"
            WHERE id=?
            `,
        [product.id]
      );

      //mensaje personalizado
      text =
        `Reserva aceptada,` +
        ` el vendedor propone realizar la venta` +
        ` el ${formatDate.toLocaleDateString("es-ES", options)}` +
        ` en ${ubication}`;

      //si cancelamos la reserva
    } else if (response === "reject") {
      //actualizamos la BBDD con la fecha y lugar propuestos por el vendedor y el estado de la reserva
      await connection.query(
        `
                UPDATE bookings
                SET status = "rejected"
                WHERE id=?
                `,
        [idBooking]
      );

      //mensaje personalizado
      text = "Reserva rechazada";

      //si hay algun error en la respuesta
    } else {
      throw new Error(`Se ha producido un error en la respuesta de la reserva`);
    }

    res.send({
      status: "OK",
      message: text,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { responseBooking };
