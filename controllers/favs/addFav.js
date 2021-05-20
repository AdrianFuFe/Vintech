const { getConnection } = require("../../db");
const { getDbInfo } = require("../../helpers");

async function addFav (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        //comprobar si el producto existe
        //si existe devolvemos su info
        const { idProduct } = req.params;
        let result = await getDbInfo("products", idProduct);
        //si no existe devolvemos un error
        if(result == false) throw new Error ("No existe ningun producto con ese ID");


        //comprobar que el producto no es del vendedor
        if(req.auth.id === result.id_seller) throw new Error ("No puedes comprar tus propios productos")
        
        //comprobar si el producto esta ya en favoritos
        const [favExist] = await connection.query(
        `
        SELECT *
        FROM fav_list
        WHERE id_user=? AND id_product=?
        `,[req.auth.id,idProduct]
        );

        if(favExist.length > 0) throw new Error ("Este producto ya esta en tu lista de favoritos")


        //creamos entrada de fav en la BBDD
        await connection.query(`
        INSERT INTO fav_list
        (id_user,id_product)
        VALUES (?,?)
        `,[req.auth.id,idProduct]);

        res.send({
            status: "OK",
            message:`Se ha añadido el producto con ID ${idProduct} a tu lista de favoritos`,
        });
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { addFav };