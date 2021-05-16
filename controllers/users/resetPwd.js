const {getConnection} = require("../../db");
const bcrypt = require("bcrypt");

async function resetPwd(req,res,next){
    let connection;
    try{
        connection = await getConnection();
    
        const {code} = req.params;
        const {pwd, confirmPwd} = req.body;

        //comprobamos que existe un usuario con ese codigo de reseteo
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

        if(pwd !== confirmPwd) throw new Error ("Las contraseñas no coinciden");

        //codificamos la nueva pwd
        let pwdDb;
        try{
            pwdDb = await bcrypt.hash(pwd, 10);
        }catch(error){
            throw new Error ("La contraseña no se pudo codificar")
        }

        //actualizamos pwd en la bbdd
        try{
            await connection.query(`
            UPDATE users
            SET pwd=?, activationCode=NULL
            WHERE activationCode=?
            `,[pwdDb,code]);
        }catch(error){
            throw new Error("No se ha podido actualizar la contraseña")
        }
        
        res.send("La contraseña se ha actualizado con exito");
    }catch(error){
        next(error);
    }finally{
        if(connection)connection.release();
    }
}

module.exports = {resetPwd};