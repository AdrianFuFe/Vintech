const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function listBookingsOut (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        let { id } = req.params;
        let result;

        //comprobamos si existe el usuario 
        result = await entryExists("users",id);
        if(result == false) throw new Error (`El usuario con ID ${id} no existe`);

        //buscar en la BBDD las reservas con id_vendedor igual a la id de params
        [result] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_B=?
        `,[id]);
        //si no existe devolvemos un error
        if(result == false) throw new Error (`El usuario con ID ${id} no ha realizado ninguna reserva`);

        res.send({
            status:"OK",
            bookings:[result],
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { listBookingsOut };