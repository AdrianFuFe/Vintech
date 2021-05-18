const { getConnection } = require("../../db");

async function listBookingsOut (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        //comprobar que existe token usuario aunque para estar ahi ya deberia estar comprobado

        //buscar na BBDD as reservas con id_venderdor igual a la id de token
        let bookingsOut;
        [bookingsOut] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_B=?
        `,[req.auth.id]);

        res.send({
            status:"OK",
            bookings:[bookingsOut],
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { listBookingsOut };