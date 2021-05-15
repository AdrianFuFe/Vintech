
const {getConnection} = require("../../db");

async function activateUser(req,res,next){
    let connection;
    try{
        connection = await getConnection();

        const {activationCode} = req.params;

        //comprobar que exista usuario con ese codigo
        let user;
        try{
            [user] = await connection.query(`
            SELECT *
            FROM users
            WHERE activationCode = ?
            `,[activationCode]);
        }catch(error){
            throw new Error ("No se pudo comprobar")
        }
        //si no existe devuelve un error
        if(user.length < 1){
            throw new Error ("No hay ningun usuario con ese codigo de activacion")
        }
        
        //si existe cambiar status a activo
        try{
            await connection.query(`
                UPDATE users
                SET status = "active", activationCode=NULL
                WHERE activationCode = ?
            `,[activationCode]);
        }catch(error){
            throw new Error ("No se pudo activar el usuario")
        }

        res.send({
            status:"ok",
            message:"El usuario se ha activado correctamente"
        });



    }catch(error){
        next(error)
    }finally{
        if(connection) connection.release()
    }
}

module.exports = {activateUser};