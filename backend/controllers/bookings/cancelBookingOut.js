const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function cancelBookingOut (req,res,next){
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

        //buscar en la BBDD la reserva con id_producto e id_comprador igual a los que pasamos por params
        [result] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_B=? AND id_product=?
        `,[id,idProduct]);
        if(result.length < 1) throw new Error (`No existe la reserva del usuario comprador con ID ${id} para el producto con ID ${idProduct}`);
        
        let idBk = result[0].id;

        //borrar reserva de la BBDD
        await connection.query(`
        DELETE
        FROM bookings
        WHERE id=?
        `,[idBk]); 


        res.send({
            status:"OK",
            message: `La reserva con ID ${idBk} del producto ${idProduct} ha sido eliminada`,
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { cancelBookingOut };