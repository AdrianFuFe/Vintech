const { getConnection } = require("../../db");
const { getDbInfo } = require("../../helpers");

async function newBooking (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        //comprobar si el producto existe
        //si existe devolvemos su info
        const { idProduct } = req.params;
        const result = await getDbInfo("products", idProduct);
        //si no existe devolvemos un error
        if(result == false) throw new Error ("No existe ningun producto con ese ID");

        //comprobar que el producto este activo para su compra
        if(result.status != "active") throw new Error ("No es posible reservar este producto");
        
        //comprobar que el comprador no es el vendedor
        if(req.auth.id === result.id_seller) throw new Error ("No puedes comprar tus propios productos")
        
        //comprobar que no existe ya una reserva del mismo producto por el mismo comprador
        const [productBooked] = await connection.query(`
            SELECT *
            FROM bookings
            WHERE id_product=? AND id_user_B=?
            `,[idProduct,req.auth.id]);
        if(productBooked.length > 0) throw new Error ("Ya has realizado una reserva de ese producto")


        //si existe el producto y comprador-vendedor son diferentes usuarios
        //creamos entrada en la bbdd de reservas    
        const [booking] = await connection.query(
            `
            INSERT INTO bookings (status, id_user_A, id_user_B, id_product)
            VALUES (?,?,?,?)
            `,["sent", result.id_seller, req.auth.id, req.params.idProduct]);

        res.send({
            status: "OK",
            message:"Reserva realizada",
            id: booking.insertId,
        });
        
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { newBooking };