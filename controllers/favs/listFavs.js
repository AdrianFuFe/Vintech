const { getConnection } = require("../../db");
const { entryExists } = require("../../helpers");

async function listFavs (req,res,next){
    let connection;
    try {
        connection = await getConnection();

        const { id } = req.auth;
        if ((await entryExists("users", id)) === false)
        throw new Error(`El usuario con id ${id} no existe`);

        const [result] = await connection.query(`
        SELECT *
        FROM fav_list FL
        LEFT JOIN products P ON FL.id_product = P.id
        WHERE id_user=?
        `,[id]);

        console.log(result);

        res.send({
            status: "OK",
            message:"Esta es tu lista te favoritos",
            favs:`${result}`,
        });
    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
}

module.exports = { listFavs };