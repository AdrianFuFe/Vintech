const {getConnection} = require("../../db");
const bcrypt = require("bcrypt");

async function resetPwd(req,res,next){
    let connection;
    try{
        connection = await getConnection();
    
        const {code} = req.params;
        const {pwd, confirmPwd} = req.body;

        let existingUser;
        try{
            [existingUser] = await connection.query (`
            SELECT *
            FROM users
            WHERE activationCode=?
            `,[code]);

        }catch(error){
            throw new Error ("No se pudo encontrar el usuario en la bbdd")
        }

        if(existingUser.length < 1) throw new Error ("No existe el usuarios con ese codigo de reseteo en la bbdd")

        res.send('funciono');
    }catch(error){
        next(error);
    }finally{
        if(connection)connection.release();
    }
}

module.exports = {resetPwd};