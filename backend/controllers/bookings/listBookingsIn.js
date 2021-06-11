const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function listBookingsIn (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        let result;

        //comprobamos si existe el usuario 
        result = await entryExists("users",req.auth.id);
        if(result == false) throw new Error (`El usuario con ID ${req.auth.id} no existe`);

        //buscar en la BBDD las reservas con id_venderdor igual a la id de params
        [result] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_A=?
        `,[req.auth.id]);
        //si no existe devolvemos un error
        if(result == false) throw new Error (`El usuario con ID ${req.auth.id} no ha recibido ninguna reserva`);
        
        res.send({
            status:"OK",
            bookings:[result],
        });

    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { listBookingsIn };