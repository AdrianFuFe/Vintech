const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function cancelBooking (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        let { id,idBooking } = req.params;
        let result;

        //comprobamos si existe el usuario 
        result = await entryExists("users",id);
        if(result == false) throw new Error (`El usuario con ID ${id} no existe`);

        //comprobamos si existe el producto
        result = await entryExists("bookings",idBooking);
        if(result == false) throw new Error (`La reserva con ID ${idBooking} no existe`);

        //buscar la reserva en la BBDD
        [result] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id=?
        `,[idProduct]);
        if(result.length < 1) throw new Error (`No existe la reserva con ID ${idBooking} del usuario con ID ${id}`);
        
        let idBk = result[0].id;

        //cambiar estado de la reserva
        await connection.query(`
        UPDATE bookings
        SET status='cancelled'
        FROM bookings
        WHERE id=?
        `,[idBk]); 


        res.send({
            status:"OK",
            message: `La reserva con ID ${idBk} ha sido cancelada`,
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { cancelBooking };