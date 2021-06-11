const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");
const { getDbInfo } = require("../../helpers");

async function acceptBooking (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        let { id,idProduct } = req.params;
        let result;

        //comprobamos si existe el usuario 
        result = await entryExists("users",id);
        if(result == false) throw new Error (`El usuario con ID ${id} no existe`);

        //comprobamos si existe el producto
        result = await getDbInfo("products",idProduct);
        if(result == false) throw new Error (`El producto con ID ${idProduct} no existe`);
        //comprobamos que el producto no este ya reservado
        if (result.status != "active") throw new Error (`El producto con ID ${idProduct} ya esta reservado`);
        
        //buscar en la BBDD la reserva con id_producto e id_vendedor igual a los que pasamos por params
        [result] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_A=? AND id_product=?
        `,[id,idProduct]);
        if(result.length < 1) throw new Error (`No existe la reserva para el usuario vendedor con ID ${id} para el producto con ID ${idProduct}`);
        

        //obtenemos la fecha y hora que propone el vendedor
        let {meetDate, ubication, status} = req.body;
        //actualizamos la BBDD con la fecha y lugar propuestos por el vendedor y el estado de la reserva
        await connection.query(`
            UPDATE bookings
            SET meeting_date=?, ubication=?, status=?
            WHERE id_user_A=? AND id_product=?
            `,[meetDate, ubication, status, id, idProduct]
        );

        //formateo de la fecha propuesta
        const formatDate = new Date(meetDate);
        const options = {
            hourCycle:"h24",
            weekday:"long", 
            year:"numeric",
            month:"long",
            day:"2-digit"  ,         
            hour:"2-digit",
            minute:"2-digit"            
        };

        //actualizar estado del objeto
        await connection.query(`
            UPDATE products
            SET status="reserved"
            WHERE id=?
            `,[idProduct]);


        res.send({
            status:"OK",
            message: `Reserva aceptada correctamente,` + 
                ` el vendedor propone realizar la venta` + 
                ` el ${formatDate.toLocaleDateString('es-ES',options)}` +
                ` en ${ubication}`,
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { acceptBooking };