const { getConnection } = require("../../db");

async function getBookingOut (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        //comprobar que existe token usuario aunque para estar ahi ya deberia estar comprobado

        //buscar na BBDD a reserva con id_producto e id_comprador igual aos que pasamos por params
        let { id,idProduct } = req.params;
        let bookOut;
        [bookOut] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_B=? AND id_product=?
        `,[id,idProduct]);

        res.send({
            status:"OK",
            booking:[bookOut],
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { getBookingOut };