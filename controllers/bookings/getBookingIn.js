const { getConnection } = require("../../db");

async function getBookingIn (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        //comprobar que existe token usuario aunque para estar ahi ya deberia estar comprobado

        //buscar na BBDD a reserva con id_producto e id_vendedor igual aos que pasamos por params
        let { id,idProduct } = req.params;
        let bookIn;
        [bookOut] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_A=? AND id_product=?
        `,[id,idProduct]);

        res.send({
            status:"OK",
            booking:[bookIn],
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { getBookingIn };