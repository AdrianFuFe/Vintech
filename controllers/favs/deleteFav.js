const { getConnection } = require("../../db");
const { getDbInfo } = require("../../helpers");

async function deleteFav (req,res,next){
    let connection;
    try {
        connection = await getConnection();


        const { idProduct } = req.params;
        //comprobar si el producto existe
        //si existe devolvemos su info
        let result = await getDbInfo("products", idProduct);
        //si no existe devolvemos un error
        if(result == false) throw new Error ("No existe ningun producto con ese ID");
        

        //comprobar si el producto esta ya en favoritos
        const [favExist] = await connection.query(`
            SELECT *
            FROM fav_list
            WHERE id_user=? AND id_product=?
            `,[req.auth.id,idProduct]
        );
        
        if(favExist.length > 0) {
            //eliminamos entrada de fav en la BBDD
            await connection.query(`
            DELETE 
            FROM fav_list
            WHERE id_user=? AND id_product=?
            `,[req.auth.id,idProduct]);
        }else{
            throw new Error ("Este producto no esta en tu lista de favoritos");
        }

        res.send({
            status: "OK",
            message:`Se ha eliminado el producto con ID ${idProduct} de tu lista de favoritos`,
        });
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { deleteFav };