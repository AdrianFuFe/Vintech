const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function getBooking (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        let { idBooking } = req.params;
        let result;

        //comprobamos si existe el usuario 
        result = await entryExists("users",req.auth.id);
        if(result == false) throw new Error (`El usuario con ID ${req.auth.id} no existe`);

        //comprobamos si existe el producto
        result = await entryExists("products",idBooking);
        if(result == false) throw new Error (`El producto con ID ${idBooking} no existe`);


        //buscar en la BBDD la reserva por su id que la pasamos por params
        [result] = await connection.query(`
        SELECT *
        FROM bookings B
        WHERE id=? AND (id_user_A=? OR id_user_B=?)
        `,[idBooking, req.auth.id, req.auth.id]);

        if(result.length < 1) throw new Error (`La reserva con ID ${idBooking} no existe o no participas en ella`);
    
        /*  OPCION DE ERROR PERSONALIZADO SI NO FILTRAMOS LA CONSULTA POR USUARIOS       
        if(result.id_user_A != req.auth.id && result.id_user_B != req.auth.id)
        throw new Error (`No puedes ver reservas en las que no participas`); 
        */

        res.send({
            status:"OK",
            booking:[result],
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { getBooking };

