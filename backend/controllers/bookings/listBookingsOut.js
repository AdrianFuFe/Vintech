const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function listBookingsOut (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        let result;

        //comprobamos si existe el usuario 
        result = await entryExists("users",req.auth.id);
        if(result == false) throw new Error (`El usuario con ID ${req.auth.id} no existe`);

        //buscar en la BBDD las reservas con id_vendedor igual a la id de params
        [result] = await connection.query(`
        SELECT *
        FROM bookings
        WHERE id_user_B=?
        `,[req.auth.id]);
        //si no existe devolvemos un error
        if(result == false) throw new Error (`El usuario con ID ${req.auth.id} no ha realizado ninguna reserva`);

        //sacamos datos de usuarios comprador y vendedor y el producto
        const moreInfo = await connection.query(
            `
            SELECT 
                U.id AS id_seller,
                U.username AS username_seller,
                U.fname AS fname_seller,
                U.lname AS lname_seller,
                US.id AS id_buyer,
                US.username AS username_buyer,
                US.fname AS fname_buyer,
                US.lname AS lname_buyer,
                P.id AS id_product,
                P.title AS title_product,
                P.price AS price_product
            FROM bookings B
            LEFT JOIN users U ON B.id_user_A = U.id
            LEFT JOIN users US ON B.id_user_B = US.id
            LEFT JOIN products P ON B.id_product = P.id
            WHERE id_user_B=?
            `,[req.auth.id]
        );

        res.send({
            status:"OK",
            bookings:result,
            bkInfo:moreInfo,
        })
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { listBookingsOut };