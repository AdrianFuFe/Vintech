const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function rejectBooking (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        let { id,idProduct } = req.params;
        let result;

        //comprobamos si existe el usuario 
        result = await entryExists("users",id);
        if(result == false) throw new Error (`El usuario con ID ${id} no existe`);

        //comprobamos si existe el producto
        result = await entryExists("products",idProduct);
        if(result == false) throw new Error (`El producto con ID ${idProduct} no existe`);

        //buscar en la BBDD la reserva con id_producto e id_vendedor igual a los que pasamos por params
        [result] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_A=? AND id_product=?
        `,[id,idProduct]);
        if(result.length < 1) throw new Error (`No existe la reserva para el usuario vendedor con ID ${id} para el producto con ID ${idProduct}`);
        console.log(result[0]);


        //actualizamos la BBDD con la fecha y lugar propuestos por el vendedor y el estado de la reserva
        result[0] = await connection.query(`
            UPDATE bookings
            SET status= 'rejected'
            WHERE id_user_A=? AND id_product=?
            `,[id, idProduct]
        );

        console.log(result[0]);

        res.send({
            status:"OK",
            message: `Reserva rechazada`,
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { rejectBooking };