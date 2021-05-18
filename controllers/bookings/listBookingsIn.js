const { getConnection } = require("../../db");

async function listBookingsIn (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        //comprobar que existe token usuario aunque para estar ahi ya deberia estar comprobado

        //buscar na BBDD as reservas con id_venderdor igual a la id de token
        let bookingsIn;
        [bookingsIn] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_A=?
        `,[req.auth.id]);
        
        console.log(bookingsIn);

        res.send({
            status:"OK",
            bookings:[bookingsIn],
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { listBookingsIn };