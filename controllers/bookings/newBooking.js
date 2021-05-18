const { getConnection } = require("../../db");
const { entryExistsPrueba } = require("../../helpers");

async function newBooking (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        /*         
        *       //comprobar producto
        *       let product;
        *       [product] = await connection.query(
        *            `
        *            SELECT *
        *            FROM products
        *            WHERE id=?
        *            `,
        *            [id_product]
        *        );
        *        if(product.length < 1) throw new Error ("No existe ningun producto con ese ID")
        */

        //comprobar si el producto existe
        //si existe devolvemos su info
        const { id_product } = req.params;
        const product = await entryExistsPrueba("products", id_product);
        //si no existe devolvemos un error
        if(product == false) throw new Error ("No existe ningun producto con ese ID");

        //comprobar que el producto este activo para su compra
        if(product.status != "active") throw new Error ("No es posible comprar este producto");
        
        
        //comprobar que el comprador no es el vendedor
        if(req.auth.id === product.id_seller) throw new Error ("No puedes comprar tus propios productos")
        

        //comprobar que no existe ya una reserva del mismo producto por el mismo comprador
        let productBooked;
                [productBooked] = await connection.query(
                    `
                    SELECT *
                    FROM bookings
                    WHERE id_product=? AND id_user_B=?
                    `,
                    [id_product,req.auth.id]
                );
                if(productBooked.length > 0) throw new Error ("Ya has realizado una reserva de ese producto")



        //si existe el producto y comprador y vendedor son diferentes usuarios
        //creamoso entrada en la bbdd de reservas    
        const [booking] = await connection.query(
            `
            INSERT INTO bookings
            (status, id_user_A, id_user_B, id_product)
            VALUES
            (?,?,?,?)
            `,
            [
                "sent",
                product.id_seller,
                req.auth.id,
                req.params.id_product,
            ]
            );
            

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